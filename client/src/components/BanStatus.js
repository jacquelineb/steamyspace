import React from 'react';
import styles from '../styles/BanStatus.module.scss';

function BanStatus({ bans }) {
  return (
    <ul>
      {bans.map((ban, idx) => {
        return (
          <li className={styles.banDescription} key={idx}>
            {ban}
          </li>
        );
      })}
    </ul>
  );
}

export default BanStatus;
