import { Model } from 'objection';

import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';
import GroupsModel from './groups.model';

class MembersModel extends Model {
    static get idColumn() { return 'member_id'; }

    static get tableName() { return 'group_members'; }

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


    // static async getMembers(group_id) {       //poxel nkar name stanal

    //     const data = await MembersModel.query().select('*').where('group_id',group_id).orderBy('group_id')
        
    //     console.log(`userData ${data}`);
    
    //     return data;
    // }


    static async getMembers(group_id) {
        const data = await MembersModel.query()
            .select('*')
            .where('group_id', group_id)
            .orderBy('group_id')
    
            .select('users.name', 'users.surname', 'users.profileImg')
            .join('users', 'group_members.user_id', 'users.id')
            .where('group_members.group_id', group_id)
            .orderBy('group_members.group_id');
    
        // console.log(`userData ${data}`);
    
        return data;
    }
    


    static async getGroups(id) {
        const data = await GroupsModel.query()
            .join('group_members', 'groups.group_id', 'group_members.group_id')
            .select('groups.*')
            .where('group_members.user_id', id)
            .orderBy('groups.group_id');

        // console.log(`userData ${data}`);
        return data;
    }
    


    static async addMembers(data) {
        try {
            const newMembers = await this.query().insert(data);
            return newMembers;
        } catch (error) {
            console.error('Error adding members:', error);
            throw error;
        }
    }

    
    static async delMembers({ group_id,user_id}) {
        try {
            await GroupsModel.knex().transaction(async trx => {
                await trx('group_members')
                    .where({  group_id: group_id,user_id: user_id })
                    .delete();
            });

            return (`Deleted user_id ${user_id} from group_id ${group_id}`);
        } catch (error) {
            console.error(`Error deleting user_id ${user_id} from group_id ${group_id}:`, error);
            throw error;
        }
    }



   
    // static async getGroupsMessages(group_id) {              //jisht
    //     const data = await MembersModel.knex()
    //         .select('group_messages.*')
    //         .from('group_messages')
    //         .where('group_messages.group_id', group_id)
    //         .orderBy('group_messages.created_at');

    //     // console.log(`groupMessages ${data}`);
    //     return data;
    // }
    static async getGroupsMessages(group_id) {
        const data = await MembersModel.knex()
            .select('group_messages.*', 'users.name', 'users.surname', 'users.profileImg')
            .from('group_messages')
            .where('group_messages.group_id', group_id)
            .join('users', 'group_messages.sender_id', 'users.id')
            .orderBy('group_messages.created_at');
    
        return data;
    }
    

}
export default MembersModel;