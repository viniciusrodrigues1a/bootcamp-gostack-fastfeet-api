import * as Yup from 'yup';
import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

const sequelizeModelOptions = {
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
};

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1 } = req.query;

    const total = await DeliveryProblem.count();

    const deliveryProblems = await DeliveryProblem.findAll({
      ...sequelizeModelOptions,
      limit: 5,
      offset: (page - 1) * 5
    });

    return res.json({ payload: deliveryProblems, total });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(
      id,
      sequelizeModelOptions
    );

    if (!deliveryProblem) {
      return res.status(404).json({ error: 'Delivery problem not found' });
    }

    return res.json(deliveryProblem);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      delivery_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveryProblem = await DeliveryProblem.create(req.body);

    return res.json(deliveryProblem);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
      delivery_id: Yup.number().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const deliveryProblem = await DeliveryProblem.update(req.body);

    return res.json(deliveryProblem);
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliveryProblem = await DeliveryProblem.findByPk(id);

    if (!deliveryProblem) {
      return res.status(404).json({ error: 'Delivery problem not found' });
    }

    await deliveryProblem.destroy();

    return res.json({
      message: `Delivery problem with id ${id} successfully removed`
    });
  }
}

export default new DeliveryProblemController();
