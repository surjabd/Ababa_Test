import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../config/store';
import { userLogin } from './loginAPI';

export interface loginInfo{
  email:string,
  name:string
}


export interface LoginState {
  username: string;
  password: string;
  loginInfo: loginInfo;
  status: 'idle' | 'loading' | 'failed';
}


const initialState: LoginState = {
  username: '',
  password: '',
  loginInfo: {
    email:'',
    name:''
  },
  status: 'idle',
};


// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched. Thunks are
// typically used to make async requests.
export const loginAsync = createAsyncThunk(
  'login/userLogin',
  async (loginInfo: object) => {
    const response = await userLogin(loginInfo);
    return response;
  }
)




export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.pending, (state) => {
        state.status = 'loading';

      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loginInfo = action.payload;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
}
)
// });




// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state: RootState) => state.counter.value)`
export const selectUserLoginInfo = (state: RootState) => state.login;

// We can also write thunks by hand, which may contain both sync and async logic.
// Here's an example of conditionally dispatching actions based on current state.

export default loginSlice.reducer;
