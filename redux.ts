import {
  combineReducers,
  compose,
  legacy_createStore as createStore,
} from "redux";

const initialState = {
  user: {
    isLoggingIn: false,
    data: null,
  },
  posts: [],
};

const reducer = combineReducers({
  //   user: (state: any, action: any) => {},
  //   posts: (state: any, action: any) => {},
  user: (state: any, action: any) => {
    switch (action.type) {
      case "LOGIN":
        return {
          isLoggingIn: true,
          data: {
            nickname: "baobabo",
            password: "1234",
          },
        };
      // or
      // return [...state, action.data]
    }
    return state;
  },
  posts: (state: any, action: any) => {
    return state;
  },
});
// reducer는 상태를 바꾸는 규칙
// 액션이 디스패치되면 redcuer에 정의된 룰에 따라 state를 변화

const store = createStore(reducer, initialState);
store.dispatch({
  type: "LOGIN",
  data: { nickname: "BAOJYJ", password: "1234" },
});
store.getState(); // next state value
