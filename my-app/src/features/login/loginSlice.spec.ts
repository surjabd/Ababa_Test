import loginReducer, {
  LoginState,
  
} from './loginSlice';

describe('login reducer', () => {
  // const initialState: LoginState = {
  //   username: '',
  //   password: '',
  //   loginInfo: {},
  //   status: 'idle',
 
  // };
  it('should handle initial state', () => {
    expect(loginReducer(undefined, { type: 'unknown' })).toEqual({
      username: '',
      password: '',
      loginInfo: {},
      status: 'idle',
    });
  });

  // it('should handle increment', () => {
  //   const actual = counterReducer(initialState, increment());
  //   expect(actual.value).toEqual(4);
  // });

  // it('should handle decrement', () => {
  //   const actual = counterReducer(initialState, decrement());
  //   expect(actual.value).toEqual(2);
  // });

  // it('should handle incrementByAmount', () => {
  //   const actual = counterReducer(initialState, incrementByAmount(2));
  //   expect(actual.value).toEqual(5);
  // });
});
