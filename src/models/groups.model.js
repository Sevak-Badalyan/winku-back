import { Model } from 'objection';

import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';

class GroupsModel extends Model {
    static get idColumn() { return 'group_id'; }

    static get tableName() { return 'groups'; }

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


    static async getGroups() {                 
        const data = await GroupsModel.query().select('*').orderBy('group_id')
        console.log(`userData ${data}`);
    
        return data;
    }

    
  
    static async addGroups(Data) {
        const data = await this.query().insert(Data);
        return data;
    }

}
export default GroupsModel;