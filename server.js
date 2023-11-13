import cors from "cors";
import * as dotenv from "dotenv";
import express from "express";
import { MongoClient } from "mongodb";
import usersRouter from './routes/userRoutes.js';
import emailRouter from './routes/emailRoutes.js';

const app = express();

// Enable Cross-Origin Resource Sharing (CORS)
app.use(cors());

// Parse incoming JSON data
app.use(express.json());

dotenv.config();

app.get("/", function (request, response) {
  response.send('📧 🅱🆄🅻🅺 - 🅴🅼🅰🅸🅻 - 🆃🅾🅾🅻 📧');
});

const MONGO_URL = process.env.MONGO_URL;
const PORT = process.env.PORT || 4000;

// Connect to the MongoDB database
const client = new MongoClient(MONGO_URL); 
await client.connect(); 
console.log("Connected to MongoDB!");

// Set up user and email routes
app.use('/users',usersRouter) ;

app.use('/email',emailRouter) ;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on PORT:${PORT}`);
});

export { client }; 

