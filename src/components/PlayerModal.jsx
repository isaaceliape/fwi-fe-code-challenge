import { useSelector, useDispatch } from 'react-redux';
import styles from './PlayerModal.module.scss';

import {
  playerForm,
  createPlayer,
  updatePlayer,
  getPlayerById,
  resetFormMessage,
} from '../appState/players';

export default function PlayerModal() {
  const dispatch = useDispatch();

  const stateMessage = useSelector((state) => state.players.formMessage);
  const loading = useSelector((state) => state.players.loading);
  const showForm = useSelector((state) => state.players.showPlayerForm);
  const formAction = useSelector((state) => state.players.formAction);
  const defaultPlayer = {
    id: '',
    name: '',
    country: '',
    winnings: '',
    imageUrl: '',
  };

  const player = {
    ...defaultPlayer,
    ...useSelector((state) =>
      getPlayerById(state, state.players.selectedPlayer)
    ),
  };

  function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target));
    if (formAction === 'create') {
      data.winnings = Number(data.winnings);
      dispatch(createPlayer(data));
      return;
    }
    if (formAction === 'update') {
      dispatch(updatePlayer(data));
      return;
    }
  }

  function onClickClose() {
    console.log('onClickClose');
    dispatch(playerForm(false));
    dispatch(resetFormMessage());
  }

  return (
    <div className={styles.container}>
      {showForm && (
        <div className={styles.overlay}>
          <div className={styles.content}>
            <button className={styles.closeButton} onClick={onClickClose} />
            <h3 className={styles.title}>Player form</h3>
            <form action="" onSubmit={onSubmit}>
              <div className={styles.field}>
                <label htmlFor="name" className={styles.label}>
                  Name:{' '}
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  defaultValue={player.name}
                />
              </div>
              {formAction === 'create' && (
                <div>
                  <div className={styles.field}>
                    <label htmlFor="winnings" className={styles.label}>
                      Winnings:{' '}
                    </label>
                    <input
                      type="number"
                      name="winnings"
                      min="0"
                      required
                      inputMode="numeric"
                      pattern="\d*"
                      defaultValue={player.winnings}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="country" className={styles.label}>
                      Country:{' '}
                    </label>
                    <input
                      type="text"
                      name="country"
                      defaultValue={player.country}
                    />
                  </div>
                  <div className={styles.field}>
                    <label htmlFor="imageUrl" className={styles.label}>
                      imageUrl:{' '}
                    </label>
                    <input
                      type="text"
                      name="imageUrl"
                      defaultValue={player.imageUrl}
                    />
                  </div>
                </div>
              )}
              <div className={styles.wrapSubmitButton}>
                <div
                  className={`${styles.formMessage} ${
                    styles[stateMessage.type] ?? ''
                  }`}
                >
                  {stateMessage.message}
                </div>
                <button
                  disabled={loading ? 'disabled' : false}
                  className={styles.submitButton}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
