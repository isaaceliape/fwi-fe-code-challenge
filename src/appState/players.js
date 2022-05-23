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
  showPlayerForm: false,
  loading: false,
  formAction: 'create',
  messageModal: {
    type: '',
    title: '',
    message: '',
  },
  formMessage: {
    type: '',
    message: '',
  },
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
    playerForm: {
      reducer: (state, action) => {
        state.showPlayerForm = action.payload;
      },
    },
    loading: {
      reducer: (state, action) => {
        state.loading = action.payload;
      },
    },
    formAction: {
      reducer: (state, action) => {
        state.formAction = action.payload;
      },
    },
    formMessage: {
      reducer: (state, action) => {
        state.formMessage = action.payload;
      },
    },
    resetFormMessage: {
      reducer: (state) => {
        state.formMessage = PLAYERS_INITIAL_STATE.formMessage;
      },
    },
    messageModal: {
      reducer: (state, action) => {
        state.messageModal = action.playload;
      },
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAllPlayers.fulfilled, (state, action) => {
        adapter.setAll(state, action.payload.items);
        state.loading = false;
      })
      .addCase(updatePlayer.fulfilled, (state, action) => {
        adapter.setOne(state, action.payload);
        console.log(action);
        state.formMessage = {
          type: 'success',
          message: 'Player updated with success.',
        };
        state.loading = false;
      })
      .addCase(createPlayer.fulfilled, (state, action) => {
        adapter.addOne(state, action.payload);
        state.formMessage = {
          type: 'success',
          message: 'Player created with success.',
        };
        state.loading = false;
      })
      .addCase(deletePlayer.fulfilled, (state, action) => {
        adapter.removeOne(state, action.payload);
        state.formMessage = {
          type: 'success',
          message: 'Player deleted with success.',
        };
        state.loading = false;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        }
      )
      .addMatcher(
        (action) => action.type.endsWith('/Rejected'),
        (state) => {
          state.formMessage = {
            type: 'error',
            message: 'Somethig went wrong, please try again.',
          };
          state.loading = false;
        }
      ),
});

export const {
  formMessage,
  loading,
  formAction,
  playerForm,
  selectPlayer,
  messageModal,
  resetFormMessage,
} = actions;

export default reducer;
