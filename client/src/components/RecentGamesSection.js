import React, { useState, useEffect } from 'react';
import styles from '../styles/RecentGamesSection.module.scss';

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
    <div className={styles.recentGames}>
      <h1>Recently played games</h1>
      {recentGamesData.games.map((game) => (
        <div className={styles.gameCard} key={game.appid}>
          <div className={styles.gameData}>
            <p className={styles.gameName}>{game.name}</p>
            <p className={styles.totalHoursPlayed}>
              {(game.playtime_forever / 60).toFixed(1)} total hours played.
            </p>
          </div>
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
