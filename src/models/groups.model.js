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

    
    // static async getGroupsMessages({ group_id }) {
    //     const data = await GroupsModel.query()
    //         .select(
    //             'group_messages.message_id',
    //             'group_messages.sender_id',
    //             'group_messages.message',
    //             'group_messages.created_at as message_created_at',
    //             'group_messages.updated_at as message_updated_at'
    //         )
    //         .join('group_members', 'groups.group_id', 'group_members.group_id')
    //         .join('group_messages', 'groups.group_id', 'group_messages.group_id')
    //         .where('groups.group_id', group_id)
    //         .orderBy('group_messages.created_at');

    //     const messages = data.map(row => ({
    //         message_id: row.message_id,
    //         sender_id: row.sender_id,
    //         message: row.message,
    //         created_at: row.message_created_at,
    //         updated_at: row.message_updated_at
    //     }));

    //     return messages;
    // }
  
    static async addGroups(Data) {
        const data = await this.query().insert(Data);
        return data;
    }

}
export default GroupsModel;