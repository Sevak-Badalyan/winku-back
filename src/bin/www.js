
// Standard modules
import http from 'http';
import 'dotenv/config';
import 'regenerator-runtime';

const { Server } = require('socket.io');

// Modules from this project
import { LoggerUtil } from '../utils';
import App from '../app';

// Constants
import config from '../config/variables.config';
import { name } from '../../package.json';
import { GroupMessagesModel, MessagesModel } from '../models';

const { PORT } = config;

const init = async () => {
  const server = http.createServer(App.app);
  await App.init(server);

  const io = new Server(server, {
    cors: {
      origin: process.env.CORS,
      methods: ["GET", "POST"],
      allowedHeaders: ["my-custom-header"],
      credentials: true
    },
  });
// let i=0;
  io.on("connection", (socket) => {
    // console.log(`User Connected: ${socket.id}, ${i++}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  

    socket.on("send_message", async (data) => {
      console.log("data", data);

      try {
          const insertedMessage = await MessagesModel.query().insert({
              room: data.room,
              author: data.author,
              sender_id: data.sender_id,
              receiver_id: data.receiver_id,
              message: data.message,
              created_at: new Date(),
              updated_at: new Date()
          });


          console.log("Inserted message:", insertedMessage);

          socket.to(data.room).emit("receive_message", insertedMessage);
     
      } catch (error) {
          console.error('Error inserting message:', error);
      }
  });


  socket.on("send_group_message", async (data) => {  
    console.log("data group mes",data);
    try {
        const insertedGroupMessage = await GroupMessagesModel.query().insert({
            group_id: data.group_id,
            author: data.author,
            name:data.name,
            surname:data.surname,
            profileImg:data.profileImg,
            sender_id: data.sender_id,
            message: data.message,
            created_at: new Date(),
            updated_at: new Date()
        });

        console.log("Inserted group message:", insertedGroupMessage);
        socket.to(data.group_id).emit("receive_group_message", insertedGroupMessage);
    } catch (error) {
        console.error('Error inserting group message:', error);
    }
  });

    socket.on("disconnect", () => {
      console.log("User Disconnected", socket.id);
    });
  });

  
  const _onError = (error) => {
    LoggerUtil.error(error.message);
  };

  const _onListening = () => {
    const address = server.address();
    const bind = typeof address === 'string'
      ? `pipe ${address}`
      : `${address.port}`;

    LoggerUtil.info(`\t${name} started:`);
    LoggerUtil.info(`\tPort: ${bind}`);
    LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`);
  };

  server.listen(PORT);
  server.on('error', _onError);
  server.on('listening', _onListening);
};

export default init().catch(LoggerUtil.error);

















