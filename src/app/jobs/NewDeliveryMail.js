import Mail from '../../lib/Mail';

class NewDeliveryMail {
  get key() {
    return 'NewDeliveryMail';
  }

  async handle({ data }) {
    const { product, deliveryman, recipient } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Nova encomenda - FastFeet',
      template: 'newDeliveryMail',
      context: {
        product: {
          name: product
        },
        recipient: {
          name: recipient.name,
          street: recipient.street,
          house_number: recipient.house_number,
          complement: recipient.complement,
          state: recipient.state,
          city: recipient.city,
          cep_code: recipient.cep_code
        }
      }
    });
  }
}

export default new NewDeliveryMail();
