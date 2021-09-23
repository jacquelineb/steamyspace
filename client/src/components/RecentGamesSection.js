import React, { useState, useEffect } from 'react';

function RecentGamesSection({ steamUserId }) {
  const [recentGamesData, setRecentGamesData] = useState();
  useEffect(() => {
    console.log('get recent games');
    async function getRecentGamesData() {
      try {
        const response = await fetch(`http://localhost:5000/${steamUserId}/recent_games`);
        setRecentGamesData(await response.json());
      } catch (error) {}
    }

    getRecentGamesData();
  }, [steamUserId]);

  if (recentGamesData === undefined) {
    return null;
  }

  return (
    <div className='recentGames'>
      <p>Recently played games</p>
      {recentGamesData.games.map((game) => (
        <div key={game.appid}>
          <p>{game.name}</p>
          <img
            src={`https://cdn.cloudflare.steamstatic.com/steamcommunity/public/images/apps/${game.appid}/${game.img_logo_url}.jpg`}
            alt={`Cover art for the game ${game.name}.`}
          ></img>
        </div>
      ))}
      <a href={`https://steamcommunity.com/profiles/${steamUserId}/games/`}>
        [View all {recentGamesData.total_count} recently played games]
      </a>
    </div>
  );
}

export default RecentGamesSection;
