import { rootReducer } from "saga-slice";
import rocketsSlice from "../slices/rocketsSlice";
import { AnyAction } from "redux";

export const modules = [rocketsSlice];

const finalAppReducer = rootReducer(modules);

export type AppState = ReturnType<typeof finalAppReducer>;
export type RootState = ReturnType<typeof rootReducer>;

const RootReducer = (state: AppState | undefined, action: AnyAction) => {
  return finalAppReducer(state, action);
};

export default RootReducer;
