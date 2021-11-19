global.express = require('express');
const bodyParser = require('body-parser');
const config = require('./configs/keys');
const app = express();
const cors = require('cors');
const path = require('path');
const port = process.env.PORT || config.PORT || 4300; // setting port
const env = process.env.NODE_ENV || 'development'; //setting environment


// applied cors on specific origin - environment wise
app.use(cors({
    origin: config.serverConfig.CORS.allowedHosts
}));

app.use(bodyParser.json({ limit: '50mb' })); // to parse body in json
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true })); //  to support URL-encoded bodies and to remove deprecation warnings
app.use('/api/', express.static(path.join(__dirname, 'public'))); // to set public path
app.use(express.static(__dirname + '/static', { dotfiles: 'allow' }))

// version 1
app.use('/api/v1/tasks', require('./v1/routes/tasks'));

// simple health check for load balancer
app.get('/health', (req, res) => {
    res.status(200).send('Success');
})

//catch 404 and forward to error handler
app.use(function (req, res, next) {
    console.log(req.url);
    let err = new Error('Not Found');
    err.status = 500;
    next(err);
});

app.listen(port, () => {
    console.log(`Server is listening on port ${port} with ${env} environment`);
});
