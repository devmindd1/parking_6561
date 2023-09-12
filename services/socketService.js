// const socketAuthMiddleware = require('../middlewares/socketAuthMiddleware');

class SocketService{
    // static sockets = new Map();
    //
    addClient(socket){
        // const userData = socketAuthMiddleware(socket.handshake.headers.authorization);
        // if(!userData)
        //     return socket.disconnect();
        //
        // this.setSocket(userData.id, socket);
        // this.addMappingTo(socket);

        return true;
    }
    //
    // addMappingTo(socket){
    //     // socket.on('disconnect', () => this.disconnect(socket.id));
    // }
    //
    // disconnect(userId){
    //     const userSocket = this.getClientById(userId);
    //     userSocket.disconnect();
    //     this.removeSocketById(userId);
    // }
    //
    // getClientById(id){
    //     return SocketService.sockets.get(id);
    // }
    //
    // removeSocketById(userId){
    //     return SocketService.sockets.delete(userId);
    // }
    //
    // setSocket(userId){
    //     return SocketService.sockets.set(userId, socket);
    // }
    //
    // sendNewRssCountTo(userId, newRssCount){
    //     const userSocket = this.getClientById(userId);
    //     if(userSocket)
    //         userSocket.emit('new-rss', {newRssCount});
    // }
}

module.exports = new SocketService();