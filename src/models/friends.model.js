import { Model } from 'objection';

import { ErrorsUtil, CryptoUtil } from '../utils';
import knexConfigs from '../../knex.configs';
import UsersModel from './users.model';
import FriendsRequestsModel from './friends.requests.model';

class FriendsModel extends Model {
    static get idColumn() { return 'friendships_id'; }

    static get tableName() { return 'friendships'; }

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

   

    static async getFriends(user_id) {
        const data = await FriendsModel.query()
            .select('friendships.friendships_id', 'friendships.user_id', 'friendships.friend_id',
                'users.id', 'users.username', 'users.profileImg', 'users.name', 'users.surname',
                'users.email', 'users.status', 'users.position')
            .join('users', function () {
                this.on('friendships.friend_id', '=', 'users.id')
                    .orOn('friendships.user_id', '=', 'users.id');
            })
            .where('friendships.user_id', user_id)
            .orWhere('friendships.friend_id', user_id)
            .orderBy('friendships.friendships_id');

        const friends = data.filter(friend => friend.id !== user_id);

        return friends;
    }

    

    
    static async getFriendsMessage(id) {                        
        const data = await FriendsModel.query()
            .select(
                'friendships.friendships_id',
                'friendships.user_id',
                'friendships.friend_id',
                'u1.id as friend_user_id',
                'u1.username as friend_username',
                'u1.profileImg as friend_profileImg',
                'u1.name as friend_name',
                'u1.surname as friend_surname',
                'u1.email as friend_email',
                'u1.status as friend_status',
                'u1.position as friend_position',
                'messages.messages_id',
                'messages.sender_id',
                'messages.receiver_id',
                'messages.message',  
                'messages.created_at as message_created_at',
                'messages.updated_at as message_updated_at'
            )
            .join('users as u1', function() {
                this.on('friendships.friend_id', '=', 'u1.id')
                    .orOn('friendships.user_id', '=', 'u1.id');
            })
            .leftJoin('messages', 'friendships.friendships_id', 'messages.room')
            .where(function() {
                this.where('friendships.user_id', id)
                    .orWhere('friendships.friend_id', id);
            })
            .andWhere('u1.id', '!=', id)
            .orderBy('friendships.friendships_id');
    
        const friendsMap = {};
    
        data.forEach(row => {
            const friendshipId = row.friendships_id;
    
            if (!friendsMap[friendshipId]) {
                friendsMap[friendshipId] = {
                    friendships_id: friendshipId,
                    user_id: row.user_id,
                    friend_id: row.friend_id,
                    id: row.friend_user_id, 
                    username: row.friend_username,
                    profileImg: row.friend_profileImg,
                    name: row.friend_name,
                    surname: row.friend_surname,
                    email: row.friend_email,
                    status: row.friend_status,
                    position: row.friend_position,
                    messages: []
                };
            }
    
            if (row.messages_id) {
                friendsMap[friendshipId].messages.push({
                    messages_id: row.messages_id,
                    sender_id: row.sender_id,
                    receiver_id: row.receiver_id,
                    message: row.message, 
                    created_at: row.message_created_at,
                    updated_at: row.message_updated_at
                });
            }
        });
    
        return Object.values(friendsMap);
    }
    
    
    
    
    static async getFriendsMessageById({ friendships_id }) {
        const data = await FriendsModel.query()
            .select(
                'messages.messages_id',
                'messages.sender_id',
                'messages.receiver_id',
                'messages.message',
                'messages.created_at as message_created_at',
                'messages.updated_at as message_updated_at'
            )
            .join('messages', 'friendships.friendships_id', 'messages.room')
            .where('friendships.friendships_id', friendships_id)
            .orderBy('messages.created_at');
    
        const messages = data.map(row => ({
            messages_id: row.messages_id,
            sender_id: row.sender_id,
            receiver_id: row.receiver_id,
            message: row.message,
            created_at: row.message_created_at,
            updated_at: row.message_updated_at
        }));
    
        return messages;
    }
    

    
    static async getPeoples(user_id) {
        const friends = await FriendsModel.query()
            .select('friendships.friend_id', 'friendships.user_id')
            .where('friendships.user_id', user_id)
            .orWhere('friendships.friend_id', user_id);

        const friendIds = new Set();
        friends.forEach(friend => {
            friendIds.add(friend.friend_id);
            friendIds.add(friend.user_id);
        });

        const friendRequests = await FriendsRequestsModel.query()
            .select('sender_id', 'receiver_id')
            .where('statusFr', 'pending')
            .andWhere(builder => {
                builder.where('sender_id', user_id).orWhere('receiver_id', user_id);
            });

        friendRequests.forEach(request => {
            friendIds.add(request.sender_id);
            friendIds.add(request.receiver_id);
        });

        const sentRequests = await FriendsRequestsModel.query()
            .select('sender_id')
            .where('sender_id', user_id);

        sentRequests.forEach(request => {
            friendIds.add(request.sender_id);
        });

        const peoples = await UsersModel.query()
            .select('id', 'username', 'profileImg', 'name', 'surname', 'email', 'status', 'position')
            .whereNot('id', user_id)
            .whereNotIn('id', Array.from(friendIds))
            
        return peoples;
    }


    static async deleteFriends({ user_id, friend_id }) {
        try {
            console.log(user_id, friend_id);
            const deletedRows = await FriendsModel.query()
                .delete()
                .where((builder) => {
                    builder.where('user_id', user_id).andWhere('friend_id', friend_id);
                })
                .orWhere((builder) => {
                    builder.where('user_id', friend_id).andWhere('friend_id', user_id);
                });

            if (deletedRows === 0) {
                return { message: 'No friendship found to delete' };
            }

            return { message: 'Friendship deleted successfully' };
        } catch (error) {
            console.error('Error deleting friendship:', error.message);
            throw error;
        }
    }


}
export default FriendsModel;