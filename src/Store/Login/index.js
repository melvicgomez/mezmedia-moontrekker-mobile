import { buildSlice } from "@thecodingmachine/redux-toolkit-wrapper";
import UserAuthentication from "./UserAuthentication";
import UserCreatePassword from "./UserCreatePassword";
import UserChangePassword from "./UserChangePassword";

// This state is common to all the "user" module, and can be modified by any "user" reducers
const sliceInitialState = {
  item: {},
};

export default buildSlice(
  "auth",
  [UserAuthentication, UserCreatePassword, UserChangePassword],
  sliceInitialState
).reducer;
