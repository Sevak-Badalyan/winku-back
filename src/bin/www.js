
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
import { MessagesModel } from '../models';

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
let i=0;
  io.on("connection", (socket) => {
    console.log(`User Connected: ${socket.id}, ${i++}`);
  
    socket.on("join_room", (data) => {
      socket.join(data);
      console.log(`User with ID: ${socket.id} joined room: ${data}`);
    });
  
    // socket.on("send_message", (data) => {
    //   console.log("data",data);

    //   socket.to(data.room).emit("receive_message", data);
    // });
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




















// // Standard modules
// import http from 'http';
// import 'dotenv/config';
// import 'regenerator-runtime';

// // const { Server } = require('socket.io');

// // Modules from this project
// import { LoggerUtil } from '../utils';
// import App from '../app';

// // Constants
// import config from '../config/variables.config';
// import { name } from '../../package.json';

// const { PORT } = config;

// const init = async () => {
//   const server = http.createServer(App.app);
//   // await App.init(server); 
//   App.init(server);

//   const _onError = (error) => {
//     LoggerUtil.error(error.message);
//   };
// // ??????????????????????????????????????/   // 
// // const io = new Server(server);                                   //cors?

// //   let socketsConnected = new Set();

// //   io.on('connection', (socket) => {                                            ///sockety ashxatacnelu miacnelu hamar
// //       console.log('Socket connected', socket.id);
// //       socketsConnected.add(socket.id);
// //       io.emit('clients-total',socketsConnected.size);                              //emity harcumneri hamara clientic --> server ev hakaraky // bro
// //       socket.on('message',(data)=> {
// //           console.log('data',data);                                                               
// //           socket.broadcast.emit('chat-message',data);                                   // emit kazmakerpum enq requestnery chat-message i mijocov
// //       });
// //       socket.on('feedback', (data)=> {
// //           socket.broadcast.emit('feedback',data)                                                       //brotcast y uxarkuma bolorin baci iranic
// //       });
// //       socket.on('disconnect', ()=>{
// //           console.log('Socket disconnected',socket.id);
// //           socketsConnected.delete(socket.id);
// //           io.emit('clients-total',socketsConnected.size)
// //       })
// //   });
  
// // ??????????????????????????????????????/  // 
//   const _onListening = () => {
//     const address = server.address();
//     const bind = typeof address === 'string'
//       ? `pipe ${address}`
//       : `${address.port}`;

//     LoggerUtil.info(`\t${name} started:`);
//     LoggerUtil.info(`\tPort: ${bind}`);
//     LoggerUtil.info(`\tStart date: ${(new Date()).toUTCString()} \n`);

//   };

//   server.listen(PORT);
//   server.on('error', _onError);
//   server.on('listening', _onListening);
//   // server.on('socket',)
// };

// export default init().catch(LoggerUtil.error);
