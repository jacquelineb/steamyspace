import React from 'react';
import styles from '../styles/RecentGamesSection.module.scss';

function RecentGamesSection({ games }) {
  return (
    <div className={styles.recentGames}>
      <h1>Recently played games</h1>
      {!games.length ? (
        <p>No recent game activity</p>
      ) : (
        <div>
          {games.map((game, idx) => (
            <div className={styles.gameCard} key={idx}>
              <div className={styles.gameData}>
                <p className={styles.gameName}>{game.name}</p>
                <p className={styles.totalHoursPlayed}>{game.totalHoursPlayed}</p>
              </div>
              <a href={game.storePage}>
                <img
                  className={styles.gameCover}
                  src={game.coverArt}
                  alt={`Cover art for the game ${game.name}.`}
                />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecentGamesSection;
