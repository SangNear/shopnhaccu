const express = require("express")
const { default: mongoose } = require("mongoose")
const app = express()
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("DB Connection Successfully!");
    })
    .catch((error) => {
        console.log(error);
    })

app.listen(5000, () => {
    console.log("Server is running on http://localhost:5000");

})