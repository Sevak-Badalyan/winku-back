import knex from 'knex';
import knexConfigs from '../knex.configs';
import { LoggerUtil } from '../src/utils';

async function down(pg) {
  return await pg.schema
  // .dropTableIfExists('friend_requests')
  // .dropTableIfExists('friendships')
  .dropTableIfExists('messages')
    .dropTableIfExists('replies')
    .dropTableIfExists('comments')
    .dropTableIfExists('posts')
    .dropTableIfExists('friend_requests')
    .dropTableIfExists('friendships')
    .dropTableIfExists('users')
    
  // .dropTableIfExists('user_post')


}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await down(pg);
    console.log('Successfully dropped all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();