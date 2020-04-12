import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

class AvailableDeliveryController {
  async index(req, res) {
    const { id } = req.params;

    const deliveries = await Delivery.findAll({
      where: { deliveryman_id: id },
      attributes: [
        'id',
        'recipient_id',
        'deliveryman_id',
        'signature_id',
        'product',
        'start_date',
        'end_date',
        'created_at'
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

    if (deliveries.length === 0) {
      return res
        .status(400)
        .json({ error: 'There are no deliveries for this deliveryman' });
    }

    return res.json(deliveries);
  }
}

export default new AvailableDeliveryController();
