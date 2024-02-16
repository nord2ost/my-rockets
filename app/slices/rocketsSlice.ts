import "regenerator-runtime/runtime";
import axios, { AxiosError } from "axios";
import { put, select, takeLatest } from "redux-saga/effects";
import { createModule } from "saga-slice";
import { Rockets } from "../types/Rockets";

export interface RocketsState {
  data: Rockets[];
  isFetching: boolean;
  error: AxiosError | null;
  currentRocketId: string | null;
  favorites: string[];
}

const initialState: RocketsState = {
  isFetching: false,
  data: [],
  error: null,
  currentRocketId: null,
  favorites: [],
};

const rocketsSlice = createModule({
  // Key name that gets added to combineReducers
  name: "rockets",
  initialState,

  reducers: {
    fetch: (state: RocketsState) => {
      state.isFetching = true;
    },
    fetchSuccess: (state, payload) => {
      state.isFetching = false;
      state.data = payload;
    },
    fetchFail: (state, payload) => {
      state.isFetching = false;
      state.error = payload;
    },
    setCurrentRocket: (state, payload: string): void => {
      state.currentRocketId = payload;
    },
    toggleFavorites: (state, payload) => {
      const index = state.favorites.indexOf(payload);
      if (index === -1) {
        state.favorites.push(payload);
      } else {
        state.favorites.splice(index, 1);
      }
    },
  },
  takers: {
    takeLatest: [
      "fetch",
      "setCurrentRocket",
      "resetCurrentRocket",
      "toggleFavorites",
    ],
  },

  // The sagas option is a function that gets passed the Actions object.
  // Actions are converted into strings which are the value of its
  // corresponding type. You can also use the actions object to dispatch
  // actions from sagas using the `put` effect.
  sagas: (A) => ({
    *[A.fetch]() {
      try {
        const { data } = yield axios.get(
          //TODO: move to Constant
          "https://api.spacexdata.com/v3/rockets"
        );
        yield put(A.fetchSuccess(data));
      } catch (e) {
        yield put(A.fetchFail(e));
      }
    },
  }),
});

// Export actions for convenience when importing from other modules
export const { fetch, setCurrentRocket, resetCurrentRocket, toggleFavorites } =
  rocketsSlice.actions;
export default rocketsSlice;
