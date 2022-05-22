import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

const adapter = createEntityAdapter();
export const {
  selectById: getPlayerById,
  selectAll: getPlayers,
  selectEntities: getPlayerEntities,
  selectIds: getPlayerIds,
  selectTotal: getTotalPlayers,
} = adapter.getSelectors((state) => state.players);

const headers = new Headers({
  'Content-Type': 'application/json',
});

export const fetchAllPlayers = createAsyncThunk(
  'players/fetchAll',
  async () => {
    const response = await fetch('/api/players', { headers });
    const json = await response.json();

    return json;
  }
);

export const updatePlayer = createAsyncThunk(
  'players/update',
  async (payload, { getState }) => {
    const guid = getState().players.selectedPlayer;
    const response = await fetch(`/api/players/${guid}`, {
      method: 'PATCH',
      headers,
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    return json;
  }
);

export const createPlayer = createAsyncThunk(
  'players/create',
  async (payload) => {
    const response = await fetch(`/api/players/`, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload),
    });
    const json = await response.json();
    return json;
  }
);
export const deletePlayer = createAsyncThunk('players/delete', async (guid) => {
  const response = await fetch(`/api/players/${guid}`, {
    method: 'DELETE',
    headers,
  });
  const json = await response.json();
  return json;
});

export const PLAYERS_INITIAL_STATE = {
  ...adapter.getInitialState(),
  selectedPlayer: '',
};

const { actions, reducer } = createSlice({
  name: 'players',
  initialState: PLAYERS_INITIAL_STATE,
  reducers: {
    selectPlayer: {
      reducer: (state, action) => {
        state.selectedPlayer = action.payload;
      },
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPlayers.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload.items);
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        adapter.setOne(state, action.payload);
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload);
      }),
});

export const { selectPlayer } = actions;

export default reducer;
