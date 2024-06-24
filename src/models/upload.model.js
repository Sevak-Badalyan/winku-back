import { Model } from 'objection';
// import knex from 'knex';
import knexConfigs from '../../knex.configs';

// const pg = knex(knexConfigs);
// import { ErrorsUtil, CryptoUtil } from '../utils';
// import knexConfigs from '../../knex.configs';

class uploadModel extends Model {
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

   


    $beforeInsert(){
        const date = new Date();
        this.created_at = date
    }
    $beforeUpdate(){
        const date = new Date();
        this.updated_at = date
    }

    static async updateImagePath(id, type, imagePath) {
      const updateData = {};
      updateData[type === 'profile' ? 'profileImg' : 'coverImg'] = imagePath;
      return await this.query().patchAndFetchById(id, updateData);
  }


//   static async updateImagePathPost(user_id, type, imagePath) {
//     // const updateData = {};
//     // updateData[type === 'posts'] = imagePath;
//     // return await this.query().patchAndFetchById(user_id, updateData);
//     const updateData = {};
//     updateData[type] = imagePath; // Dynamically set the key based on the 'type'
//     return await this.query().patchAndFetchById(user_id, updateData);
// }

}
export default uploadModel;