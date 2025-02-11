const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const routes = require('./routes/routes')



const app = express()
const PORT = process.env.PORT || 3000
const db = mongoose.connection;

dotenv.config()

//connect db
const uri = process.env.DB_URL
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };
async function run() {
    try {
      // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
      await mongoose.connect(uri, clientOptions);
      await mongoose.connection.db.admin().command({ ping: 1 });
      console.log("Kết nối thành công MongoDB");
      console.log('DB hiện tại: '+ mongoose.connection.db.databaseName)
    } catch (e) {
        console.log("Kết nối thất bại");
    }
}

run().catch(console.dir);

app.use(express.json());
app.use('/',routes)




app.listen(PORT, () => {console.log("Server started on http://localhost:"+PORT)})

module.exports = app;