const connectDB = require('./config/database');
const http = require('http');
const app = require('./App');
const config = require('./config/index');
const server = http.createServer(app);
const startServer = async() => {
    try {
        await connectDB();
        server.listen(config.port, () => {
            console.log(`Server is running on ${config.mode} mode at port ${config.port}`);
        });
    } catch (error) {
        console.error(`Error starting server: ${error.message}`);
    }
}
 startServer();