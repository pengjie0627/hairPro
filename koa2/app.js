const Koa = require('koa');
const app = new Koa();
const bodyParser = require('koa-bodyparser');
const controller = require('./controller');
const koaBody = require('koa-body');
const KoaStatic = require('koa-static')
const path = require('path')
const KoaSession = require('koa-session');

const cors = require('koa-cors');
app.keys = ["hello cc"]; // 这个和下面的signed: true有关，就随便起一个名字吧
const CONFIG = {
    key: 'koa:sess', /** (string) cookie key (default is koa:sess) */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 86400000,
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
};
// 使用session
app.use(KoaSession(CONFIG, app));

// koa-cors中已经处理了对于options的请求
app.use(cors({
    origin: function (ctx) {
        return ctx.header.origin
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 5,
    credentials: true,
    allowMethods: ['POST', 'GET', 'PUT', 'OPTIONS', 'DELETE'],
    allowHeaders: ['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'Cache-Control', 'token'],
}))
// 静态文件服务器,有目录的话，使用koa-static-folder代替koa-static
app.use(KoaStatic(
    path.join(__dirname, './img/userImg')
))
app.use(KoaStatic(
    path.join(__dirname, './img/customerImg')
))
app.use(KoaStatic(
    path.join(__dirname, './img/employImg')
))
app.use(KoaStatic(
    path.join(__dirname, './img/subAdminImg')
))
app.use(KoaStatic(
    path.join(__dirname, './img/otherImg')
))
// 接口上传json数据解析
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 10*1024*1024    // 设置上传文件大小最大限制，默认2M
    }
}));
app.use(bodyParser());
app.use(controller());
let server = app.listen(3006)
console.log('app start ar port 3006...');


// socket-io
let onLineNum = 0
let io = require('socket.io')(server)
// connection固定写法
io.on('connection', (socket) => {
    console.log('新增一个连接')
    onLineNum++
    io.emit('join', {num: onLineNum})
    // disconnect固定写法
    socket.on('disconnect', () => {
        console.log('失去了一个连接')
        onLineNum--
        io.emit('leave', {num: onLineNum})
    })
    socket.on('news', (data) => {
        io.emit('news', {msg: `${data.message}`})
    })
})