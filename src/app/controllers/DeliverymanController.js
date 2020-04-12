import { Op } from 'sequelize';
import * as Yup from 'yup';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

const sequelizeModelOptions = {
  attributes: ['id', 'name', 'email', 'created_at'],
  include: [
    {
      model: File,
      as: 'avatar',
      attributes: ['id', 'name', 'path', 'url_path']
    }
  ]
};

class DeliverymanController {
  async index(req, res) {
    const { search, page = 1 } = req.query;

    const total = await Deliveryman.count();

    let deliverymen;

    if (search) {
      deliverymen = await Deliveryman.findAll({
        ...sequelizeModelOptions,
        where: { name: { [Op.iRegexp]: search } }
      });
    } else {
      deliverymen = await Deliveryman.findAll({
        ...sequelizeModelOptions,
        limit: 10,
        offset: (page - 1) * 10
      });
    }

    return res.json({ payload: deliverymen, total });
  }

  async show(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, sequelizeModelOptions);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    return res.json(deliveryman);
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

    const { id, name, avatar_id } = await Deliveryman.create(req.body);

    return res.json({
      id,
      name,
      email,
      avatar_id
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number().positive()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const deliveryman = await Deliveryman.findByPk(id, sequelizeModelOptions);

    if (!deliveryman) {
      return res.status(404).json({ error: 'Deliveryman not found' });
    }

    const { email } = req.body;

    if (
      email &&
      deliveryman.email !== email &&
      (await Deliveryman.findOne({ where: { email } }))
    ) {
      return res.status(400).json({ error: 'Email already registered' });
    }

    await deliveryman.update(req.body);

    return res.json(deliveryman);
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
