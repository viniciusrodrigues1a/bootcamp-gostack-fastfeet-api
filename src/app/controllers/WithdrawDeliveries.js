import { isAfter, parseISO, addHours } from 'date-fns';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class WithdrawController {
  async update(req, res) {
    const { id } = req.params;
    const { start_date } = req.body;

    const delivery = await Delivery.findByPk(id, {
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'start_date',
        'end_date'
      ],
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: [
            'id',
            'name',
            'street',
            'house_number',
            'complement',
            'state',
            'city',
            'cep_code'
          ]
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: ['id', 'name', 'email'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'name', 'path', 'url_path']
            }
          ]
        }
      ]
    });

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    const { deliveryman } = delivery;
    const { withdraws } = deliveryman;

    if (delivery.start_date) {
      return res
        .status(401)
        .json({ error: 'This delivery had already been withdrawn' });
    }

    if (
      !withdraws ||
      (withdraws
        ? isAfter(new Date(), addHours(parseISO(withdraws.withdrawDate), 24))
        : null)
    ) {
      deliveryman.update({
        withdraws: {
          withdrawDate: new Date(),
          withdrawsMadeToday: 1
        }
      });
    } else if (
      withdraws.withdrawsMadeToday >= process.env.WITHDRAW_LIMIT_PER_DAY
    ) {
      return res
        .status(401)
        .json({ error: 'You reached the limit of withdraws allowed per day' });
    } else {
      const { withdrawsMadeToday, withdrawDate } = withdraws;

      deliveryman.update({
        withdraws: {
          withdrawDate,
          withdrawsMadeToday: withdrawsMadeToday + 1
        }
      });
    }

    await delivery.update({ start_date });

    return res.json({ delivery });
  }
}

export default new WithdrawController();
