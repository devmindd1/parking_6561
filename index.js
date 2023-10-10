require('dotenv').config();
const path = require('path');
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
const {apiResponse, adminResponse, indexResponse} = require('./core/Response');
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

app.engine('ejs', ejs_locals_engine);
app.set("views", path.join(__dirname, "views"));
app.set('view engine', 'ejs');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(cookieParser());
app.use(fileUpload({ createParentPath: true }));
app.use(express.static(`${__dirname}/${defaultStaticPath}`));

app.use((req, res, next) => {
    app.res = res;
    next();
});

app.get('/favicon.ico', (req, res) => res.status(204));

app.use('/api/v1', [apiResponse(), apiRoutes]);

app.use('/admin',  [adminResponse(), adminRoutes]);

app.use('/', [indexResponse(), indexRoutes]);

io.on('connection', socket => new Socket(socket));

(() => {
    const port = 9026;
    // server.listen(port, '192.168.77.129', () => console.log('server in ' + port));
    server.listen(port, () => console.log('server in ' + port));

    process.on('uncaughtException', (err) => {
        console.log(err);

        app.res.send('ok');
    })
})();
