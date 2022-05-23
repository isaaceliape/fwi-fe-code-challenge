import styles from './Header.module.scss';

import CloudColors from '../assets/cloud-color.svg';
import CloudEffects from '../assets/cloud-effects.svg';
import { useDispatch } from 'react-redux';
import { playerForm, selectPlayer, formAction } from '../appState/players';

export default function Header() {
  const dispatch = useDispatch();

  function onClickCreateNewPlayerButton() {
    dispatch(formAction('create'));
    dispatch(selectPlayer(''));
    dispatch(playerForm(true));
  }
  return (
    <header id="main-header" className={styles.header}>
      <div className={styles.logo}>
        <CloudColors className={styles.cloudColors} />
        <CloudEffects className={styles.cloudEffects} />
      </div>
      <h1 className={styles.title}>FWI Poker Challenge</h1>
      <button
        className={styles.createNewPlayerButton}
        onClick={onClickCreateNewPlayerButton}
      >
        Create new player
      </button>
    </header>
  );
}
