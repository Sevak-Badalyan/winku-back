import { Model } from 'objection';

import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';

class CommentsModel extends Model {
    static get idColumn() { return 'comments_id'; }

    static get tableName() { return 'comments'; }

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


    static async getComments() {
        const data = await CommentsModel.query().select('*').orderBy('comments_id')
        console.log(`userData ${data}`);
    
        return data;
    }

    // static async addComments(Data) {
    //     const data = await this.query().insert(Data);
    //     return data;
    // }
    
    static async addComments(data) {              //  "replies": []      avelacnel
        try {
          const insertedComment = await CommentsModel.query().insert(data);
    
          const commentWithUser = await CommentsModel.query()
            .select(
              'comments.*', 
              'users.profileImg', 
              'users.name'
              
            )
            .join('users', 'comments.user_id', 'users.id')
            .where('comments.comments_id', insertedComment.comments_id) 
            .first(); 
    
          return commentWithUser;
        } catch (error) {
          console.error('Error adding comment with user data:', error);
          throw error;
        }
      }
    

}
export default CommentsModel;