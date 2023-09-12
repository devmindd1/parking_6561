// const socketAuthMiddleware = require('../middlewares/socketAuthMiddleware');
// const messageController = require('../controllers/socketControllers/messageController');
// const negotiationController = require('../controllers/socketControllers/negotiationController');
// const {ApiResponse} = require('./apiResponse');
//
// class Socket{
//     constructor(socket){
//         const user = socketAuthMiddleware(socket.handshake.headers.authorization);
//         if(!user)
//             return socket.disconnect();
//
//         this.addMappingTo(socket);
//     }
//
//     addMappingTo(socket){
//         socket.use((data, next) => {
//             const user = socketAuthMiddleware(socket.handshake.headers.authorization);
//             if(!user)
//                 return socket.disconnect();
//
//             data[1] = {
//                 name: data[0],
//                 body: data[1],
//                 user: user,
//                 socket: socket,
//                 response: new ApiResponse()
//             };
//
//             next();
//         });
//
//         socket.on('upload', negotiationController.upload);
//         socket.on('negotiation-join', negotiationController.join);
//         socket.on('get-messages', messageController.getByNegotiation);
//         socket.on('disconnect', () => socket.disconnect(socket));
//     }
// }
//
// module.exports = Socket;