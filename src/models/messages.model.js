


import { Model } from 'objection';

class MessagesModel extends Model {
    static get idColumn() { return 'messages_id'; }

    static get tableName() { return 'messages'; }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['room', 'author', 'sender_id', 'receiver_id', 'message'],
            properties: {
                messages_id: { type: 'integer' },
                room: { type: 'integer' },
                author: { type: 'string' },
                sender_id: { type: 'integer' },
                receiver_id: { type: 'integer' },
                message: { type: 'string' },
              
            }
        };
    }

  

    $beforeInsert(){
      const date = new Date();
      this.created_at = date
  }
  $beforeUpdate(){
      const date = new Date();
      this.updated_at = date
  }
}

export default MessagesModel;
