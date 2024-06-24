// NPM Modules
import { Model } from 'objection';
import bCrypt from "bcryptjs";


class UserModel extends Model {
    static get idColumn() { return 'id'; }

    static get tableName() { return 'users'; }

    $formatJson(json) {
        json = super.$formatJson(json);
        delete json.password;
        return json;
    }

    $beforeInsert() {
        const date = new Date();
        this.created_at = date;
    }

    $beforeUpdate() {
        const date = new Date();
        this.updated_at = date;
    }



    static async findByUsername(username) {
        return await UserModel.query().findOne({ username });
    }


    static async findByEmail(username) {
        return await UserModel.query().findOne({ username });
    }


    static async addUser(username, password, name, surname, email, role){
        return await this.query().insert({username, password: bCrypt.hashSync(password, bCrypt.genSaltSync(5)), name, surname, email, role});
    }
    
}


export default UserModel;