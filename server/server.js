const express = require('express');
const app = express();
const cors = require('cors');
const SteamAPI = require('steamapi');

require('dotenv').config();
const steam = new SteamAPI(process.env.STEAM_API_KEY);

app.use(cors());
app.use(express.json());

// ROUTES
app.get('/:type(profiles|id)/:id', async (req, res) => {
  try {
    const steamId = await steam.resolve(`https://steamcommunity.com${req.url}`);
    const userSummary = await steam.getUserSummary(steamId);
    console.log(userSummary);
    res.status(200).json(userSummary);
  } catch (error) {
    console.error(error);
    res.status(404).json('Profile not found');
  }
});

app.get('/:id/recent_games', async (req, res) => {
  try {
    const recentGamesResponse = await steam.get(
      `/IPlayerService/GetRecentlyPlayedGames/v1?steamid=${req.params.id}&count=3`
    );

    const recentGamesData = recentGamesResponse.response;
    console.log(recentGamesData);
    res.status(200).json(recentGamesData);
  } catch (error) {
    console.error(error);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
