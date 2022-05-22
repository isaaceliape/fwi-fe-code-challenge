import { useSelector, useDispatch } from 'react-redux';
import Flag from 'react-world-flags';

import { getPlayers, selectPlayer, deletePlayer } from '../appState/players';
import Avatar from './Avatar';
import styles from './PlayerTableBody.module.scss';

export default function PlayerTableBody() {
  const players = useSelector(getPlayers);
  const dispatch = useDispatch();

  return (
    <tbody className={styles.tbody}>
      {players.map(({ id, name, winnings, country, imageUrl }) => (
        <tr key={id} className={styles.row}>
          <td className={styles.avatar}>
            <Avatar src={imageUrl} />
          </td>
          <td>{name}</td>
          <td className={styles.winnings}>
            {winnings.toLocaleString('en-US', {
              style: 'currency',
              currency: 'USD',
            })}
          </td>
          <td>
            <div className={styles.country}>
              <Avatar small className={styles.countryAvatar}>
                <Flag code={country} />
              </Avatar>
              {country}
            </div>
          </td>
          <td className={styles.actions}>
            <button
              className={`${styles.actions__baseButton} ${styles.actions__editButton}`}
              onClick={() => dispatch(selectPlayer(id))}
            >
              Edit
            </button>
            <button
              className={`${styles.actions__baseButton} ${styles.actions__editButton}`}
              onClick={() => dispatch(deletePlayer(id))}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  );
}
