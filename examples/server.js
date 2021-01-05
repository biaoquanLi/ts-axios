const express = require('express')
const bodyParser = require('body-parser')
const webpack = require('webpack')
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const router = express.Router()
const webpackConfig = require('./webpack.config')

const app = express()
const compiler = webpack(webpackConfig)

app.use(webpackDevMiddleware(compiler, {
    publicPath: '/__build__',
    stats: {
        colors: true,
        chunks: false
    }
}))

simple()
base()
error()
registerExtend()
interceptor()


app.use(router)
app.use(webpackHotMiddleware(compiler))

app.use(express.static(__dirname))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const port = process.env.PORT || 8081
module.exports = app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}, Ctrl+C to stop`)
})

function simple() {
    router.get('/simple/get', (req, res) => {
        res.json({
            msg: 'hello world'
        })
    })
}

function base() {
    router.get('/base/get', function (req, res) {
        res.json(req.query)
    })

    router.post('/base/post', function (req, res) {
        console.log(111, req.body)
        res.json(req.body)
    })

    router.post('/base/buffer', function (req, res) {
        let msg = []
        req.on('data', (chunk) => {
            if (chunk) {
                msg.push(chunk)
            }
        })
        req.on('end', () => {
            let buf = Buffer.concat(msg)
            res.json(buf.toJSON())
        })
    })
}
function error() {
    router.get('/error/get', function (req, res) {
        if (Math.random() > 0.5) {
            res.json({
                msg: `hello world`
            })
        } else {
            res.status(500)
            res.end()
        }
    })

    router.get('/error/timeout', function (req, res) {
        setTimeout(() => {
            res.json({
                msg: `hello world`
            })
        }, 3000)
    })
}
function registerExtend() {
    router.get('/extend/get', (req, res) => {
        res.json({
            msg: 'hello world'
        })
    })
    router.post('/extend/post', (req, res) => {
        res.json(req.body)
    })
    router.options('/extend/options', (req, res) => {
        res.end()
    })
    router.delete('/extend/delete', (req, res) => {
        res.end()
    })
    router.head('/extend/head', (req, res) => {
        res.end()
    })
    router.options('/extend/options', (req, res) => {
        res.end()
    })
    router.put('/extend/put', (req, res) => {
        res.json(req.body)
    })
    router.patch('/extend/patch', (req, res) => {
        res.json(req.body)
    })
    router.get('/extend/user', (req, res) => {
        res.json({
            code: 200,
            result: { name: '小明', age: 30 },
            message: '获取成功'
        })
    })
}
function interceptor() {
    router.get('/interceptor/get', (req, res) => {
        res.end()
    })
}