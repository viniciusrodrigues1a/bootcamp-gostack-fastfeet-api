import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const recipients = await Recipient.findAll();

    if (recipients.length === 0) {
      return res.status(400).json({ error: 'There are no recipients' });
    }

    return res.json(recipients);
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findByPk(id);

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
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      cep_code: Yup.string().required()
    });

    if (!(await schema.isValid(req.body))) {
      return res.json({ error: 'Validation failed' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json(recipient);
  }

  async update(req, res) {
    const recipient = await Recipient.findByPk(req.userId);

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
        id: req.userId,
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
}

export default new RecipientController();
