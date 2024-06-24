import { Model } from "objection";
import knex from "knex";
import knexConfigs from "../../knex.configs";
import bCrypt from "bcryptjs";
import { ErrorsUtil, CryptoUtil, LoggerUtil } from "../utils";

const pg = knex(knexConfigs.development);

class AddTableModel extends Model {
  static get idColumn() {
    return "id";
  }

  static get tableName() {
    return `${table_Name}`;
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [],
      properties: {
        id: { type: "integer" },
      },
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

  static async getActiveColumns(table_name, isActiveStatus) {
    const data = await pg(`${table_name}`)
      .select("*")
      .where("isActive", "=", isActiveStatus);
    return data;
  }

  static async getNotNullColumns(table_name) {
    const notNullColumns = await pg(`notNullables`)
      .select("*")
      .where("tableName", "=", table_name);
    return notNullColumns[0].notnullcolumns;
  }

  static async getIncrementColumns(table_name) {
    const incColumns = await pg(`increments`)
      .select("*")
      .where("tableName", "=", table_name);
    console.log(incColumns, "11111111111111111");
    return incColumns[0].incrementcolumns;
  }

  static async deleteTable(tableName) {
    try {
      await pg.schema.dropTableIfExists(tableName);
      await pg("increments").where("tableName", "=", tableName).del("*");
      await pg("notNullables").where("tableName", "=", tableName).del("*");
      return true;
    } catch (error) {
      console.error(`Error deleting table ${tableName}:`, error);
      throw error;
    }
  }

  static async createTable(tableName) {
    try {
      const tableExists = await pg.schema.hasTable(tableName);
      if (!tableExists) {
        await pg.schema.createTable(tableName, (table) => {
          table.increments(`${tableName}_id`).primary();
          table.boolean("isActive").defaultTo(true);
        });
        await pg(`increments`).insert({ tableName });
        await pg(`notNullables`).insert({ tableName });
        return {
          success: true,
          message: `Table ${tableName} created successfully.`,
        };
      } else {
        return {
          success: false,
          message: `Table ${tableName} already exists.`,
        };
      }
    } catch (error) {
      console.error(`Error creating table ${tableName}:`, error);
      return {
        success: false,
        message: `Error creating table ${tableName}: ${error.message}`,
      };
    }
  }

  static async getTable(tableName, isActive) {
    let tableData; // Declare tableData here

    try {
      if (isActive == "false") {
        tableData = await pg(`${tableName}`)
          .where("isActive", "=", false)
          .select("*")
          .orderBy(`${tableName}_id`);
      } else if (isActive == "true") {
        tableData = await pg(`${tableName}`)
          .where("isActive", "=", true)
          .select("*")
          .orderBy(`${tableName}_id`);
      } else {
        tableData = await pg(`${tableName}`)
          .select("*")
          .returning("*")
          .orderBy(`${tableName}_id`);
      }

      console.log(tableData);

      let newObj = {};
      const columnNames = await pg(`${tableName}`).columnInfo();
      const columnName = Object.keys(columnNames);

      columnName.map((col) => {
        newObj[col] = columnNames[col].type;
      });

      // if (tableData.length === 0) {
      //   columnName.unshift(newObj);
      //   return columnName;
      // }

      tableData.unshift(newObj);
      return tableData;
    } catch (error) {
      console.error(`Error retrieving data from ${tableName}:`, error);
      throw error;
    }
  }

  // static async getTable(tableName, isActive) {
  //   try {
  //     const tableData = await pg(`${tableName}`).select("*").returning('*').orderBy(`${tableName}_id`);

  //     let newObj = {};
  //     const columnNames = await pg(`${tableName}`).columnInfo();
  //     const columnName = Object.keys(columnNames);
  //     columnName.map((col) => {
  //       newObj[col] = columnNames[col].type;
  //     })
  //     if (tableData.length === 0) {
  //       columnName.unshift(newObj);
  //       return columnName;
  //     }
  //     tableData.unshift(newObj);
  //     return tableData;
  //   } catch (error) {
  //     console.error(`Error retrieving data from ${tableName}:`, error);
  //     throw error;
  //   }
  // }

  static async getAllTableNamesInMyDb() {
    try {
      const tableNames = await pg.raw(
        "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public' AND table_type = 'BASE TABLE'"
      );
      let newArr = [];
      tableNames.rows.map((row) => {
        if (
          row.table_name !== "increments" &&
          row.table_name !== "notNullables" &&
          row.table_name !== "profiles" &&
          row.table_name !== "users"
        ) {
          newArr.push(row.table_name);
        }
      });
      console.log("New retrieved table names:", newArr);
      return newArr;

      // console.log(tableNames,"ttttttttt");
    } catch (error) {
      console.error("Error retrieving table names:", error);
      throw error;
    }
  }

  static async addColumn(table_name, column_type, column_name, type, notNull) {
    if (type) {
      await pg.schema.table(`${table_name}`, (table) => {
        table.specificType(`${column_name}`, "SERIAL");
      });
      await pg("increments")
        .where("tableName", "=", table_name)
        .update({
          incrementcolumns: pg.raw("array_append(incrementcolumns, ?)", [
            column_name,
          ]),
        });
    } else {
      if (column_type === "timestamp") {
        await pg.schema.table(`${table_name}`, (table) => {
          table[column_type](`${column_name}`).defaultTo(pg.fn.now());
        });
      } else {
        if (notNull) {
          await pg.schema.table(`${table_name}`, (table) => {
            table[column_type](`${column_name}`).notNullable();
          });
          await pg("notNullables")
            .where("tableName", "=", `${table_name}`)
            .update({
              notnullcolumns: pg.raw("array_append(notnullcolumns, ?)", [
                column_name,
              ]),
            });
        } else {
          await pg.schema.table(`${table_name}`, (table) => {
            table[column_type](`${column_name}`);
          });
        }
      }
    }
  }

  static async addColumnToTable(
    table_name,
    column_type,
    column_name,
    type,
    notNull
  ) {
    try {
      const tableExists = await pg.schema.hasTable(table_name);
      if (!tableExists) {
        await pg.schema.createTable(table_name, (table) => {
          table.increments(`${table_name}_id`).primary();
          table.boolean("isActive").defaultTo(true);
        });
        await pg(`increments`).insert({ tableName: table_name });
        await pg(`notNullables`).insert({ tableName: table_name });
        await pg("increments")
          .where("tableName", "=", table_name)
          .update({
            incrementcolumns: pg.raw("array_append(incrementcolumns, ?)", [
              `${table_name}_id`,
            ]),
          });
        await AddTableModel.addColumn(
          table_name,
          column_type,
          column_name,
          type,
          notNull
        );
      } else {
        await AddTableModel.addColumn(
          table_name,
          column_type,
          column_name,
          type,
          notNull
        );
      }
      return true;
    } catch (error) {
      console.error(
        `Error adding column ${column_name} to ${table_name}:,
        error`
      );
      throw error;
    }
  }

  static async addValue(table_name, info) {
    const data = await pg(`${table_name}`).insert(info).returning("*");
    console.log(data);
    return data;
  }

  static async updateTable(table_name, info) {
    console.log(info);
    console.log(info[`${table_name}_id`]);
    const data = await pg(`${table_name}`)
      .where(`${table_name}_id`, "=", info[`${table_name}_id`])
      .update(info);
    return data;
  }
}

export default AddTableModel;
