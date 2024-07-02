import { Model } from 'objection';
import FriendsModel from './friends.model';
import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';
import { log } from 'winston';

class FriendsRequestsModel extends Model {
    static get idColumn() { return 'request_id'; }

    static get tableName() { return 'friend_requests'; }

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




    static async getFriendsRequests(user_id) {
        const requests = await FriendsRequestsModel.query()
            .select(
                'friend_requests.request_id',
                'friend_requests.sender_id',
                'friend_requests.receiver_id',
                'friend_requests.statusFr',
                'friend_requests.created_at',
                'friend_requests.updated_at',
                'users.profileImg',
                'users.name',
                'users.surname',
                'users.email',
                'users.status',
                'users.position'
            )
            .join('users', 'friend_requests.sender_id', '=', 'users.id')
            .where('friend_requests.receiver_id', user_id)
            .orderBy('friend_requests.request_id');
    
    
        return requests;
    }
    
    static async addFriendsRequests(data) {
        try {
            if (data.sender_id === data.receiver_id) {
                return { error: 'Sender and receiver cannot be the same user' };
            }
    
            const existingRequest = await this.query()
                .where({
                    sender_id: data.sender_id,
                    receiver_id: data.receiver_id
                })
                .orWhere({
                    sender_id: data.receiver_id,
                    receiver_id: data.sender_id
                })
                .first();
    
            if (existingRequest) {
                return { error: 'Friend request already exists between these users' };
            }
    
            const existingFriendship = await FriendsModel.query()
                .where({
                    user_id: data.sender_id,
                    friend_id: data.receiver_id
                })
                .orWhere({
                    user_id: data.receiver_id,
                    friend_id: data.sender_id
                })
                .first();
    
            if (existingFriendship) {
                return { error: 'Users are already friends' };
            }
    
            data.statusFr = 'pending'; 
            const friendRequest = await this.query().insert(data);
               return friendRequest;
        } catch (error) {
            console.error('Error adding friend request:', error.message);
            throw error;
        }
    }



    static async addAnswerFriendsRequests(data) {
        try {
            const existingRequest = await this.query()
                .where({
                    sender_id: data.sender_id,
                    receiver_id: data.receiver_id
                })
                .first();
    
            if (!existingRequest) {
                return { error: 'Friend request does not exist' };
            }
    
            const existingFriendship = await FriendsModel.query()
                .where({
                    user_id: data.receiver_id,
                    friend_id: data.sender_id
                })
                .orWhere({
                    user_id: data.sender_id,
                    friend_id: data.receiver_id
                })
                .first();
    
            if (existingFriendship) {
                return { error: 'Users are already friends' };
            }
    
            if (data.statusFr === 'accepted') {
                await FriendsModel.query().insert({
                    user_id: data.receiver_id,
                    friend_id: data.sender_id
                });
    
                await this.query()
                    .delete()
                    .where({
                        sender_id: data.sender_id,
                        receiver_id: data.receiver_id
                    });
    
                return { message: 'Friend request accepted and friendship created' };
            } else if (data.statusFr === 'rejected') {
                await this.query()
                    .delete()
                    .where({
                        sender_id: data.sender_id,
                        receiver_id: data.receiver_id
                    });
    
                return { message: 'Friend request rejected and deleted' };
            } else {
                const updatedRequest = await this.query()
                    .patch({ statusFr: data.statusFr })
                    .where({
                        sender_id: data.sender_id,
                        receiver_id: data.receiver_id
                    });
    
                return updatedRequest;
            }
        } catch (error) {
            console.error('Error answering friend request:', error.message);
            throw error;
        }
    }
    
}
export default FriendsRequestsModel;