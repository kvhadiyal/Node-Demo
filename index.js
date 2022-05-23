// This will be our application entry. We'll setup our server here.
require('dotenv').config();
const http = require('http');
const app = require('./config/app'); // The express app we just created

const port = +(process.env.PORT) || 8000;
app.set('port', port);
const server = http.createServer(app);
server.listen(port, () => {
  console.log(`Express server listening on port ${port}`);
});