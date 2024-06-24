import { AddTableModel } from "../models";

export default class AddTableService {
    static async getActiveColumns(table_name, isActiveStatus){
        return await AddTableModel.getActiveColumns(table_name, isActiveStatus);
    }
    static async getNotNullColumns(table_name){
        return await AddTableModel.getNotNullColumns(table_name);
    }
    static async getIncrementColumns(table_name){
        return await AddTableModel.getIncrementColumns(table_name);
    }
    static async addTable(tableName) {
        return await AddTableModel.createTable(tableName);
    }
    static async deleteTable(info) {
        return await AddTableModel.deleteTable(info);
    }
    static async getTable(table_name, isActive) {
        return await AddTableModel.getTable(table_name, isActive)
    }
    static async addColumn(table_name, column_type, column_name, type, notNull) {
        return await AddTableModel.addColumnToTable(table_name, column_type, column_name, type, notNull);
    }
    static async getAllTableName() {
        return await AddTableModel.getAllTableNamesInMyDb();
    }
    static async addValue(table_name, info) {
        return await AddTableModel.addValue(table_name, info);
    }
    static async updateTable(table_name, info) {
        return await AddTableModel.updateTable(table_name, info);
    }
} 