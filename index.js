const Koa = require('koa')
const fs = require('fs')
const views = require('koa-views')
const path = require('path')
const config = require('./config/default')
const mysql = require('./mysql')
const cors = require('koa2-cors')
const bodyParser = require('koa-bodyparser');
const app = new Koa()
const testHardware1 = require('./test/list1.json')
const testHardware2 = require('./test/list2.json')
app.use(bodyParser());

app.use(
    cors({
        origin: function(ctx) { //设置允许来自指定域名请求
            return '*'
                // if (ctx.url === '/test') {
                //     return '*'; // 允许来自所有域名请求
                // }
                // return 'http://localhost:8080'; //只允许http://localhost:8080这个域名的请求
        },
        maxAge: 5, //指定本次预检请求的有效期，单位为秒。
        credentials: true, //是否允许发送Cookie
        allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], //设置所允许的HTTP请求方法
        allowHeaders: ['Content-Type', 'Authorization', 'Accept'], //设置服务器支持的所有头信息字段
        exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'] //设置获取其他自定义字段
    })
);

/**
 * route函数：根据URL获取data内容
 * @param  {string} url koa2上下文的url，ctx.url
 * @return {string}     获取HTML文件内容
 */
async function route(url, ctx) {
    let view
    const {id = 1789} = ctx.query;
    const useUrl = url.split('?')[0]
    switch (useUrl) {
        case '/food':
            view = mysql.queryfood()
            break
        case '/foodDetail':
            view = mysql.queryfoodDetail(id)
            break
        case '/home':
            view = mysql.queryhome()
            break
        case '/login':
            view = mysql.queryLogin({...ctx.request.body })
            break
        case '/hardware0':
            view = mysql.queryHardwareNew()
            break
        case '/hardware1':
            view = mysql.queryHardwareNew()
            break

        // 硬件模块 01 展示 mock数据逻辑：
        // case '/hardware0':
        //     view = testHardware1
        //     break
        // case '/hardware1':
        //     view = testHardware2
        //     break
        case '/operateComment':
            view = mysql.queryOperateComment({...ctx.request.body })
            break
    }
    let html = view
    return html
}
// 加载模板引擎,__dirname指的是当前文件的位置
app.use(views(path.join(__dirname, './'), {
    // ejs模板引擎(ejs是一种模板语言)
    extension: 'ejs'
}))
app.use(async(ctx) => {
    let url = ctx.request.url
    if (url === '/') {
        let title = '西邮美食数据'
            // 根据路由渲染来渲染内容,ctx.render是koa-views中间件绑定到ctx上下文的一个方法，ctx.render方法第一个参数是模板相对路径，相对于views目录下 ，第二个参数就是传入到模板的数据
        await ctx.render('index', {
            title,
        })
    } else {
        let data = await route(url, ctx) //await mysql.query()
        ctx.body = data
    }
})

app.listen(config.port, () => {
    console.log('http://localhost:8888/')
})