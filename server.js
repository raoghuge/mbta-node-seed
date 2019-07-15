const mainApp = require('./app');
const config = require('./config');
let _env = config.NODE_ENV;
const port = config.PORT || 3000;

mainApp.express.listen(port, () => {
    console.log(`[${_env}] Express app started on port ${port}`)
});