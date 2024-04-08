require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const app = express();
const port = process.env.PORT || 5000;

const cors = require("cors");

app.use(cors());
app.use(express.json());

console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.it45qfo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1,
});

// Define the route outside the run function
app.get("/all-qa", async (req, res) => {
  try {
    await client.connect(); // Establish MongoDB connection
    console.log("📍Database connection established");
    const db = client.db("interviewpro-qa");
    const qaCollection = db.collection("interviewQA");
    const allQa = await qaCollection.find({}).toArray();
    res.send({ status: true, message: "success", data: allQa });
  } catch (err) {
    console.error("Error occurred:", err);
    res.status(500).send({ status: false, message: "An error occurred" });
  }
});

// Define a default route
app.get("/", (req, res) => {
  res.send("Welcome to the InterviewPRO QA Server!");
});

// Start the server
app.listen(port, () => {
  console.log(`🚀 InterviewPRO QA Server is listening on port ${port}`);
});
