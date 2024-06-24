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
    const data = await UsersModel.query().select('*').orderBy('id'); // saxin stanum em
    
    console.log(`userData ${data}`);

    return data;
  }


  // static currentOffset = 0; // Static property to keep track of the current offset
  // static allUsers = []; // Static property to keep track of all users fetched so far

  // static async getUsers() {
  //   const limit = 3; // Number of users to fetch per call
  //   const data = await UsersModel.query()
  //     .select('*')
  //     .orderBy('id')
  //     .limit(limit)
  //     .offset(this.currentOffset); // Use the current offset for pagination
    
  //   console.log(`Fetched users: ${data}`);
    
  //   // Update the list of all users fetched so far
  //   this.allUsers = [...this.allUsers, ...data];
    
  //   // Increment the offset for the next call
  //   this.currentOffset += limit;
    
  //   // Return the cumulative list of users
  //   return this.allUsers;
  // }

  // static async getUsers() {

  //   const limit = 3; 
  //   const data = await UsersModel.query()
  //     .select('*')
  //     .orderBy('id')
  //     .limit(limit)                                               //   limitov 3
  //     .offset(this.currentOffset);
    
  //   console.log(`userData ${data}`);
    
  
  //   this.currentOffset += limit;
    
  //   return data;
  // }
 


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

  
  // static async addUsers(Data) {
  //     const data = await this.query().insert(Data);
  //     return data;
  // }


}
export default UsersModel;