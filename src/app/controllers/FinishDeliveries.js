import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class FinishDelivery {
  async update(req, res) {
    const { id } = req.params;
    const { end_date, signature_id } = req.body;

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

    if (delivery.end_date) {
      return res
        .status(401)
        .json({ error: 'This delivery had already been delivered' });
    }

    await delivery.update({ end_date, signature_id });

    return res.json({ delivery });
  }
}

export default new FinishDelivery();
