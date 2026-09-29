const dotenv = require('dotenv');
dotenv.config();

const app = require('./app');
// require DB config early so missing env vars are noticed during startup
const dbConfig = require('./config/database');

const port = process.env.PORT || 3005;

if (!process.env.DB_PASSWORD) {
  console.warn('Warning: DB_PASSWORD is not set. Create a `.env` file from `.env.example` with your credentials. Do NOT commit `.env`.');
}

app.listen(port, () => {
  console.log(`AfyaBora server listening on http://localhost:${port}`);
});
