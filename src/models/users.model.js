import { Model } from 'objection';

import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';

class UsersModel extends Model {
  static get idColumn() { return 'id'; }

  static get tableName() { return 'users'; }

  static get jsonSchema() {
    return {

      type: 'object',
      required: [],
      properties: {
        id: { type: 'integer' },

      }
    }

  }




  $beforeInsert() {
    const date = new Date();
    this.created_at = date
  }
  $beforeUpdate() {
    const date = new Date();
    this.updated_at = date
  }


  static async getUsers() {                                                                 
    const data = await UsersModel.query().select('*').orderBy('id'); 
    
    console.log(`userData ${data}`);

    return data;
  }

 


  static async getUsersById(id) {
    if (!id) {
      throw new Error("User ID is undefined");
    }
    try {
      const data = await this.query().select('').where('id', '=', id).first();
      return data;
    } catch (error) {
      console.error('Error fetching user by id:', error);
      throw error;
    }
  }


static async editUsers({ id, name, surname, position }) {
    try {
        const updatedUser = await UsersModel.query()
            .patch({
                name: name,
                surname:surname,
                position:position
            })
            .where('id', id)
            .returning(['id', 'username', 'name', 'surname', 'email', 'profileImg', 'coverImg', 'status', 'position', 'created_at', 'updated_at'])
.first()
        return updatedUser;
    } catch (error) {
        console.error('Error updating user:', error.message);
        throw error;
    }
}


static async searchUsers({ searchText }) {
  try {
    
    const data = await UsersModel.query().select('*')
    .where(builder => {
      builder
        .whereRaw('LOWER(name) LIKE ?', `%${searchText.toLowerCase()}%`)
        .orWhereRaw('LOWER(surname) LIKE ?', `%${searchText.toLowerCase()}%`)
        .orWhereRaw('LOWER(email) LIKE ?', `%${searchText.toLowerCase()}%`);
    });
    return data;
  } catch (error) {
    console.error('Error searching users:', error);
    throw error;
  }
}

  


}
export default UsersModel;