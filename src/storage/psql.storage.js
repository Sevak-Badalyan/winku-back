// Local Modules
import { Model } from 'objection';
import knex from 'knex';
import knexConfigs from '../../knex.configs';
import { LoggerUtil } from '../utils';

class PSQLStorage {
  static async init() {
    try {
      const options = process.env.NODE_ENV === 'production'
        ? knexConfigs.production
        : knexConfigs.development;
      const pg = knex(options);
      await pg.raw('SELECT 1;');
      Model.knex(pg);
      PSQLStorage.knex = pg;
      LoggerUtil.info('PSQL Connected...');
    } catch (error) {
      LoggerUtil.error(`Failed to connect to PSQL: ${error.message}`);
      process.exit(1); // Exit the process if the connection fails
    }
  }
}

export default PSQLStorage;
