import { Model } from 'objection';

import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';

class RepliesModel extends Model {
    static get idColumn() { return 'replies_id'; }

    static get tableName() { return 'replies'; }

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


    static async getReplies() {
        const data = await RepliesModel.query().select('*').orderBy('replies_id')
        console.log(`userData ${data}`);
    
        return data;
    }

   
    static async addReplies(data) {
        try {
          const insertedReply = await RepliesModel.query().insert(data);
    
          const ReplyWithUser = await RepliesModel.query()
            .select(
              'replies.*', 
              'users.profileImg', 
              'users.name'
            )
            .join('users', 'replies.user_id', 'users.id')
            .where('replies.replies_id', insertedReply.replies_id) 
            .first(); 
    
          return ReplyWithUser;
        } catch (error) {
          console.error('Error adding Reply with user data:', error);
          throw error;
        }
      }

}
export default RepliesModel;