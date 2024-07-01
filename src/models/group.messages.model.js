import { Model } from 'objection';

class GroupMessagesModel extends Model {
    static get idColumn() { return 'message_id'; }

    static get tableName() { return 'group_messages'; }

    static get jsonSchema() {
        return {
            type: 'object',
            required: ['group_id', 'author', 'sender_id', 'message'],
            properties: {
                message_id: { type: 'integer' },
                group_id: { type: 'string' },
                author: { type: 'string' },
                name: { type: 'string' },
                surname: { type: 'string' },
                profileImg: { type: 'string' },
                sender_id: { type: 'integer' },
                message: { type: 'string' },
            }
        };
    }

    $beforeInsert() {
      const date = new Date();
      this.created_at = date;
    }

    $beforeUpdate() {
      const date = new Date();
      this.updated_at = date;
    }
}

export default GroupMessagesModel;
