require('dotenv').config();
const path = require('path');
const cors = require('cors');
const Socket = require('./core/Socket');
const socketIo = require('socket.io');
const express = require('express');
const bodyParser = require('body-parser');
const apiRoutes = require('./route/api');
const adminRoutes = require('./route/admin');
const indexRoutes = require('./route/index');
const ejs_locals_engine = require('ejs-locals');
const fileUpload = require('express-fileupload');
const cookieParser = require('cookie-parser');
const {apiResponse, adminResponse} = require('./core/Response');
const {defaultStaticPath} = require('./config/defaults');

const app = express();
const server = require('http').createServer(app);

const io = socketIo(server, {
    cors: {
        withCredentials: true,
        origin: 'http://music',
        methods: ["GET", "POST"]
    }
});

// app.use(cors({
//     credentials: true,
//     // origin: 'http://ec2-100-26-17-9.compute-1.amazonaws.com:8080',
//     origin: 'http://music/',
// }));

app.engine('ejs', ejs_locals_engine);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(`${__dirname}/${defaultStaticPath}`));

app.use('/api', [
    apiResponse(),
    apiRoutes
]);

app.use('/admin',  [
    adminResponse(),
    adminRoutes
]);

app.use('/', [
    apiResponse(),
    indexRoutes
]);

(() => {
    try {
        const port = 9026;

        io.on('connection', socket => new Socket(socket));

        server.listen(port, () => console.log('server in ' + port))
    }catch (e) {
        console.log(e);
    }
})();
