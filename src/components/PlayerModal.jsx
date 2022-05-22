import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPlayerById,
  updatePlayer,
  selectPlayer,
  createPlayer,
} from '../appState/players';

export default function PlayerModal() {
  const [action, setAction] = useState('update');
  const dispatch = useDispatch();
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
    if (action === 'create') {
      data.winnings = Number(data.winnings);
      dispatch(createPlayer(data));
      return;
    }
    if (action === 'update') {
      dispatch(updatePlayer(data));
      return;
    }
  }

  function onClickCreate() {
    setAction('create');
    dispatch(selectPlayer(''));
  }

  function onClickUpdate() {
    setAction('update');
  }

  return (
    <div>
      <h2>Player form</h2>
      <form action="" onSubmit={onSubmit}>
        <div>
          <label htmlFor="">Name: </label>
          <input type="text" name="name" required defaultValue={player.name} />
        </div>
        {action === 'create' && (
          <div>
            <div>
              <label htmlFor="">Winnings: </label>
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
            <div>
              <label htmlFor="">Country: </label>
              <input type="text" name="country" defaultValue={player.country} />
            </div>
            <div>
              <label htmlFor="">imageUrl: </label>
              <input
                type="text"
                name="imageUrl"
                defaultValue={player.imageUrl}
              />
            </div>
          </div>
        )}
        <button className="save">Submit</button>
      </form>
      <div>
        <button className="create" onClick={onClickCreate}>
          Create
        </button>
        <button className="create" onClick={onClickUpdate}>
          Update
        </button>
      </div>
    </div>
  );
}
