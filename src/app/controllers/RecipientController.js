import { Op } from 'sequelize';
import * as Yup from 'yup';
import Recipient from '../models/Recipient';

const sequelizeModelOptions = {
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
};

class RecipientController {
  async index(req, res) {
    const { search } = req.query;

    let recipients;

    if (search) {
      recipients = await Recipient.findAll({
        ...sequelizeModelOptions,
        where: { name: { [Op.iRegexp]: search } }
      });
    } else {
      recipients = await Recipient.findAll(sequelizeModelOptions);
    }

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id, sequelizeModelOptions);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient ID invalid' });
    }

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object({
      name: Yup.string().required(),
      street: Yup.string().required(),
      house_number: Yup.string().required(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep_code: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient ID invalid' });
    }

    const {
      name,
      street,
      house_number,
      complement,
      state,
      city,
      cep_code
    } = await recipient.update(req.body);

    return res.json({
      recipient: {
        id,
        name,
        street,
        house_number,
        complement,
        state,
        city,
        cep_code
      }
    });
  }

  async destroy(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient ID invalid' });
    }

    await Recipient.destroy({ where: { id } });

    return res.json({
      message: `Recipient with id ${id} successfully removed`
    });
  }
}

export default new RecipientController();
