import Sequelize, { Model } from 'sequelize';

class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        house_number: Sequelize.STRING,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep_code: Sequelize.STRING
      },
      {
        sequelize
      }
    );

    return this;
  }
}

export default Recipient;
