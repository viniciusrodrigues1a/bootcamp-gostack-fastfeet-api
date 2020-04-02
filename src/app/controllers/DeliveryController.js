import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import Delivery from '../models/Delivery';
import Recipient from '../models/Recipient';
import File from '../models/File';

import NewDeliveryMail from '../jobs/NewDeliveryMail';
import Queue from '../../lib/Queue';

const sequelizeModelOptions = {
  attributes: [
    'id',
    'recipient_id',
    'deliveryman_id',
    'signature_id',
    'product',
    'start_date',
    'end_date',
    'canceled_at'
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
};

class DeliveryController {
  async index(req, res) {
    const { search } = req.query;

    let deliveries;

    if (search) {
      deliveries = await Delivery.findAll({
        ...sequelizeModelOptions,
        where: { product: { [Op.iRegexp]: search } }
      });
    } else {
      deliveries = await Delivery.findAll(sequelizeModelOptions);
    }

    if (deliveries.length === 0) {
      return res.status(400).json({
        error: 'There are no deliveries'
      });
    }

    return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id, sequelizeModelOptions);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      product: Yup.string().required(),
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const delivery = await Delivery.create(req.body);

    const { product, recipient, deliveryman } = await Delivery.findByPk(
      delivery.id,
      sequelizeModelOptions
    );

    await Queue.add(NewDeliveryMail.key, {
      product,
      recipient,
      deliveryman
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await delivery.update(req.body);

    return res.json(delivery);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findByPk(id);

    if (!delivery) {
      return res.status(404).json({ error: 'Delivery not found' });
    }

    await delivery.destroy();

    return res.json({
      message: `Delivery with id ${id} successfully removed`
    });
  }
}

export default new DeliveryController();
