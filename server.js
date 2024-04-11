const dotenv = require("dotenv");

// this line must come before the require('./app') line so the app has access to the variables in the config.env file
dotenv.config({ path: "./config.env" });

const app = require("./app");

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`App running on port ${port}`);
});
