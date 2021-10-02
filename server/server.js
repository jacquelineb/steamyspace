const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');

const STEAMCOMMUNITY_URL_BASE = 'https://steamcommunity.com';

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());

app.get('/:type(profiles|id)/:id', async (req, res) => {
  try {
    const response = await axios.get(`${STEAMCOMMUNITY_URL_BASE}${req.url}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(404).json('Profile not found');
  }
});

app.get('/:type(profiles|id)/:id/comments/:pageNum', async (req, res) => {
  const { type, id, pageNum } = req.params;
  try {
    const response = await axios.get(
      `${STEAMCOMMUNITY_URL_BASE}/${type}/${id}/allcomments?ctp=${pageNum}`
    );
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
