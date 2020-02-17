import Deliveryman from '../models/Deliveryman';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

import CanceledDeliveryMail from '../jobs/CanceledDeliveryMail';
import Queue from '../../lib/Queue';

class CancelDeliveryController {
  async destroy(req, res) {
    const { id } = req.params;

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

    if (delivery.canceled_at) {
      return res.status(400).json({ error: 'Delivery already canceled' });
    }

    // await delivery.update({
    //   canceled_at: new Date()
    // });

    const { product, recipient, deliveryman } = delivery;
    const deliveryProblems = await DeliveryProblem.findAll({
      where: { delivery_id: id },
      attributes: ['id', 'description'],
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: [
            'id',
            'recipient_id',
            'deliveryman_id',
            'signature_id',
            'product',
            'start_date',
            'end_date'
          ]
        }
      ]
    });

    await Queue.add(CanceledDeliveryMail.key, {
      product,
      recipient,
      deliveryman,
      deliveryProblems
    });

    return res.json({
      message: `Delivery with id ${id} successfully removed`
    });
  }
}

export default new CancelDeliveryController();
