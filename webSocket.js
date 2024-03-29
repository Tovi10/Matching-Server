const socketIo = require('socket.io');
let io = socketIo();

const setSocket = () => {
    io.on('connection', (socket) => {
        console.log('user connected');
        socket.on('enterCampaign', (data) => {
            const { room } = data;
            socket.join(room);
            console.log('join to room ', room);
            const myRoom = io.sockets.adapter.rooms[room] || { length: 0 };
            const numClients = myRoom.length;
            console.log("num of views on this campaign " + numClients);
            socket.emit('gotEntered', { msg: 'Enter to campaign ' + room });
        });

        socket.on('newDonation', (data) => {
            const { room ,donation} = data;
            io.to(room).emit('newDonation', { msg: 'New donation',donation });
        });

        socket.on('leaveCampaign', (data) => {
            console.log('leave campaign ' + data.room);
            socket.leave(data.room);
            socket.emit('leaveCampaign', { msg: 'leave campaign ' + data.room });
        })

    });
}

module.exports = {
    socketServer: (app) => {
        io = socketIo(app);
        setSocket();
    }
};