const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/eventdb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const eventSchema = new mongoose.Schema({
  userId: String,
  title: String,
  date: String,
  location: String,
  description: String,
});

const Event = mongoose.model('Event', eventSchema);

app.get('/api/events', async (req, res) => {
  const { userId } = req.query;
  const events = await Event.find({ userId });
  res.json(events);
});

app.post('/api/events', async (req, res) => {
  const { userId, events } = req.body;
  await Event.deleteMany({ userId });
  await Event.insertMany(events);
  res.status(201).json({ message: 'Events saved successfully!' });
});

app.listen(5000, () => {
  console.log('Server running on http://localhost:5000');
});