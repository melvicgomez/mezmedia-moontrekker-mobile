import {
  buildAsyncState,
  buildAsyncActions,
  buildAsyncReducers,
} from "@thecodingmachine/redux-toolkit-wrapper";
import { navigateAndSimpleReset } from "@/Navigators/Root";
import DefaultTheme from "@/Store/Theme/DefaultTheme";

export default {
  initialState: buildAsyncState(),
  action: buildAsyncActions("startup/init", async (args, { dispatch }) => {
    await dispatch(DefaultTheme.action({ theme: "default", darkMode: null }));
    // Navigate and reset to the main navigator
    navigateAndSimpleReset("Welcome");
  }),
  reducers: buildAsyncReducers({ itemKey: null }), // We do not want to modify some item by default
};
