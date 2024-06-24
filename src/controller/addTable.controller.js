import { SuccessHandlerUtil } from "../utils";
import { AddTableService } from "../services";


export default class AddTableController {
    static async getActiveColumns(req, res, next){
        try {
            const { table_name } = req.params;
            const { isAvtiveStatus } = req.body;
            const data = await AddTableService.getActiveColumns(table_name, isAvtiveStatus);
            SuccessHandlerUtil.handleList(res, req, data);
        } catch (error) {
            next(error);
        }
    }

    static async getNotNullColumns(req, res, next){
        try {
            const { table_name } = req.params;
            const notNullColumns = await AddTableService.getNotNullColumns(table_name);
            SuccessHandlerUtil.handleList(res, req, notNullColumns);
        } catch (error) {
            next(error);
        }
    }

    static async getIncrementColumns(req, res, next){
        try {
            const { table_name } = req.params;
            const incColumns = await AddTableService.getIncrementColumns(table_name);
            SuccessHandlerUtil.handleList(res, req, incColumns);
        } catch (error) {
            next(error);
        }
    }

    static async addTable(req, res, next) {
        try {
            const { table_name } = req.params;
            const result = await AddTableService.addTable(table_name);
            SuccessHandlerUtil.handleList(res, req, result);

        } catch (error) {
            next(error);
        }
    }

    static async removeTable(req, res, next) {
        try {
            const { table_name } = req.params;
            const result = await AddTableService.deleteTable(table_name);
            SuccessHandlerUtil.handleList(res, req, result);
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getTable(req, res, next) {
        try {
            const { table_name, isActive } = req.params;
            const dataTable = await AddTableService.getTable(table_name, isActive);
            SuccessHandlerUtil.handleGet(res, req, dataTable);
        } catch (error) {
            next(error);
        }
    }
    static async addColumn(req, res, next) {
        try {
            const { table_name, column_type, column_name, type , notNull} = req.body;
            
            const result = await AddTableService.addColumn(table_name, column_type, column_name, type, notNull);
            console.log(result,'bodyyy')
            SuccessHandlerUtil.handleList(res, req, result);
        } catch (error) {
            next(error);
        }
    }

    static async getAllTableName(req, res, next) {
        try {
            const dataTable = await AddTableService.getAllTableName();
            SuccessHandlerUtil.handleGet(res, req, dataTable);
        } catch (error) {
            next(error)
        }
    }

    static async addValue(req, res, next) {
        try {
            const { table_name } = req.params
            const info = req.body;
            const data = await AddTableService.addValue(table_name, info);
            SuccessHandlerUtil.handleList(res, req, data);
        } catch (error) {
            next(error)
        }
    }

    static async updateTable(req, res, next){
        try {
            const { table_name } = req.params;
            const info = req.body;
            const data = await AddTableService.updateTable(table_name, info);
            SuccessHandlerUtil.handleUpdate(res, req, data);
        } catch (error) {
            next(error);
        }
    }


}