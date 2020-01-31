import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
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
