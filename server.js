// server.js
const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3045;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
const client = new MongoClient("mongodb+srv://thirani969:Apstndp20@scatum.dbbnub6.mongodb.net/", { useNewUrlParser: true, useUnifiedTopology: true });
const newData = {
  url: 'https://example.com',
  status: 200,
  header: 'Content-Type: application/json',
  time: '2023-01-01T12:00:00Z',
  body: '{"message": "Hello, MongoDB!"}'
};
// API Endpoints
app.get('/api', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Postman');
    const collection = database.collection('Record');
    const records = await collection.find({}).toArray();
    res.json(records)
    // insert into mongo db
    // const result = await collection.insertOne(newData);
    // res.json(`Inserted ${result.insertedCount} document with ID: ${result.insertedId}`)
  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

app.post('/api/saveResponse', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('Postman');
    const collection = database.collection('Record');
    const { url, status, header, time, body } = req.body;

    const newResponse = {
      url,
      status,
      header,
      time,
      body
    };
    await collection.insertOne(newResponse);

    res.status(201).json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error('Error saving data:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
