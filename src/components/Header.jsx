import styles from './Header.module.scss';

import CloudColors from '../assets/cloud-color.svg';
import CloudEffects from '../assets/cloud-effects.svg';
import { useDispatch, useSelector } from 'react-redux';
import {
  playerForm,
  selectPlayer,
  formAction,
  sortBy,
  sortOrder,
} from '../appState/players';

export default function Header() {
  const dispatch = useDispatch();
  const stateSortOrder = useSelector((state) => state.players.sortOrder);

  function onClickCreateNewPlayerButton() {
    dispatch(formAction('create'));
    dispatch(selectPlayer(''));
    dispatch(playerForm(true));
  }

  function onSortOrderButton() {
    dispatch(sortOrder(stateSortOrder));
  }

  function onChangeSort(e) {
    dispatch(sortBy(e.target.value));
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
      <label htmlFor="sortField" className={styles.sortDropdownLabel}>
        Sort by:
      </label>
      <select
        name="sortField"
        className={styles.sortDropdown}
        onChange={onChangeSort}
      >
        <option value="name">Player name</option>
        <option value="winnings">Winnings</option>
        <option value="country">Country</option>
      </select>
      <button className={styles.sortOrderButton} onClick={onSortOrderButton}>
        {stateSortOrder}
      </button>
    </header>
  );
}
