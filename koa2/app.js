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
    maxAge: 10000,// 一天
    overwrite: true, /** (boolean) can overwrite or not (default true) */
    httpOnly: true, /** (boolean) httpOnly or not (default true) */
    signed: true, /** (boolean) signed or not (default true) */
    rolling: false, /** /** 在每次请求时强行设置 cookie，这将重置 cookie 过期时间（默认：false） 【需要修改】 */
    renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
    sameSite: 'Strict' /* 和csrf攻击有关，有2个取值，Strict(严格模式，任何情况下本网站的cookies都不可能作为第三方网站来携带)
    和 Lax(宽松模式，对于同步请求可以携带本网站的cookies,对于异步请求则不可以)，不过很遗憾，目前只有chrome51+支持，相信未来都会被支持。
    1. 异步请求（不会改变当前页面，也不会打开新页面），比如通过 <script>、<link>、<img>、<iframe> 等标签发起的请求，
    还有通过各种发送 HTTP 请求的 DOM API（XHR，fetch，sendBeacon）发起的请求。

    2. 同步请求（可能改变当前页面，也可能打开新页面），比如通过对 <a> 的点击，对 <form> 的提交，还有改变 location.href，
    调用 window.open() 等方式产生的请求。

    上面说的同步和异步并不是正式术语，只是我个人的一种区分方式。*/
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
/**
 * cookies过期检查
 */
app.use(async(ctx, next) => {
    console.log(ctx.session.userinfo)
    if (!ctx.session.userinfo && ctx.request.url.indexOf('user/login') === -1) {
        let body = require('./dao/baseResponse.js')
        body.message = '登录已过期'
        body.total = 0
        body.success = false
        body.data = ''
        ctx.response.body = body
    } else {
        await next();
    }
})
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
app.use(KoaStatic(
    path.join(__dirname, './img/advise')
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