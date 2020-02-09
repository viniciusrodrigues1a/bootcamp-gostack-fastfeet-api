import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';

class DeliverymanController {
  async index(req, res) {
    const deliverymen = await Deliveryman.findAll({
      attributes: ['id', 'name', 'email']
    });

    if (deliverymen.length === 0) {
      return res.status(400).json({ error: 'There are no deliverymen' });
    }

    return res.json(deliverymen);
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { name, email } = deliveryman;

    return res.json({
      id,
      name,
      email
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { email } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: { email }
    });

    if (deliveryman) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    const { id, name } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { name, email } = await deliveryman.update(req.body);

    return res.json({
      id,
      name,
      email
    });
  }

  async destroy(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    await deliveryman.destroy();

    return res.json({
      message: `Deliveryman with id ${id} successfully removed`
    });
  }
}

export default new DeliverymanController();
