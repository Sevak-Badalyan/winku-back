import knex from 'knex';
import knexConfigs from '../knex.configs';
import { LoggerUtil } from '../src/utils'

async function up(pg) {
  return await pg.schema
    .createTable('users', (table) => {
      table.increments('id').primary();
      table.string('username').notNullable();
      table.string('password').notNullable();
      table.string('role').defaultTo('User');
      table.string('name').notNullable();
      table.string('surname').notNullable();
      table.string('email').notNullable();
      table.string('profileImg');
      table.string('coverImg');
      table.string('status');                      //  poxel
      table.string('position').defaultTo("Programmer");

      table.dateTime('created_at');
      table.dateTime('updated_at');
      // username, password, role ,name, surname, email, profileImg, coverImg, status, position
    })


    .createTable('posts', (table) => {
      table.increments("posts_id").primary();
      table.text("postText");
      table.string("postPhoto");
      table.integer('likeCount').defaultTo(0);
      table.integer('commentCount').defaultTo(0);
      table.string('type');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      // table.integer('comments_id').unsigned().references('comments_id').inTable('comments').onDelete('CASCADE');
      table.dateTime('created_at');
      table.dateTime('updated_at');
      //postText, postPhoto,likeCount,commentCount, user_id ,profileImg, name,surname,title,content
    })

    .createTable('comments', (table) => {
      table.increments("comments_id").primary();
      table.text("commentText");
      table.integer('posts_id').unsigned().notNullable().references('posts_id').inTable('posts').onDelete('CASCADE');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.dateTime('created_at');
      table.dateTime('updated_at');
      //comments_id,commentText,posts_id,user_id
    })


    .createTable('replies', (table) => {
      table.increments("replies_id").primary();
      table.text("repliesText");
      table.integer('comments_id').unsigned().notNullable().references('comments_id').inTable('comments').onDelete('CASCADE');
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.dateTime('created_at');
      table.dateTime('updated_at');
      //comments_id,commentText,user_id,comments_is
    })




    // ///friendss>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>


    .createTable('friendships', (table) => {
      table.increments("friendships_id").primary();
      table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('friend_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.dateTime('created_at');
      table.dateTime('updated_at');


      // friendships_id, user_id,friend_id
    })
    .createTable('friend_requests', (table) => {
      table.increments('request_id').primary();
      table.integer('sender_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.enu('statusFr', ['pending', 'accepted', 'rejected']).defaultTo('pending');
      table.dateTime('created_at');
      table.dateTime('updated_at');


      //sender_id,receiver_id,statusFr
    })

    //                   <<<<<<<<<<<<<<            messages           >>>>>>>>>>>>>>

    .createTable('messages', (table) => {
      table.increments('messages_id').primary();
      table.integer('room').unsigned().notNullable().references('friendships_id').inTable('friendships').onDelete('CASCADE');
      table.string("author").notNullable();
      table.integer('sender_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.integer('receiver_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
      table.text("message");
      table.dateTime('created_at');
      table.dateTime('updated_at');
      // messages_id, room, sender_id, receiver_id ,message
    })



    // .createTable('groups', (table) => {
    //   table.increments('group_id').primary();
    //   table.string('group_name').notNullable();
    //   table.integer('created_by').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    //   table.text('description');
    //   table.dateTime('created_at');
    //   table.dateTime('updated_at');
    // })

    // .createTable('group_members', (table) => {
    //   table.increments('member_id').primary();
    //   table.integer('group_id').unsigned().notNullable().references('group_id').inTable('groups').onDelete('CASCADE');
    //   table.integer('user_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    //   // table.enu('role', ['admin', 'member']).defaultTo('member');
    //   table.dateTime('joined_at').defaultTo(knex.fn.now());
    // })

    // .createTable('group_messages', (table) => {
    //   table.increments('message_id').primary();
    //   table.integer('group_id').unsigned().notNullable().references('group_id').inTable('groups').onDelete('CASCADE');
    //   table.integer('sender_id').unsigned().notNullable().references('id').inTable('users').onDelete('CASCADE');
    //   table.text('message_content').notNullable();
    //   table.dateTime('created_at');
    //   table.dateTime('updated_at');
    // })

}

async function init() {
  try {
    const options = process.env.NODE_ENV === 'production'
      ? knexConfigs.production
      : knexConfigs.development;
    const pg = knex(options);
    await up(pg);
    console.log('Successfully created all tables ... ');
    process.kill(process.pid);
  } catch (error) {
    LoggerUtil.error(error.message);
  }
}

init();