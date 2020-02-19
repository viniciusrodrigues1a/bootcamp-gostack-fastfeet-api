import Mail from '../../lib/Mail';

class CanceledDeliveryMail {
  get key() {
    return 'CanceledDeliveryMail';
  }

  async handle({ data }) {
    const {
      product,
      deliveryman,
      recipient,
      deliveryProblems,
      cancelationDate
    } = data;
    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: 'Encomenda cancelada - FastFeet',
      template: 'canceledDeliveryMail',
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
        },
        deliveryProblems,
        cancelationDate
      }
    });
  }
}

export default new CanceledDeliveryMail();
