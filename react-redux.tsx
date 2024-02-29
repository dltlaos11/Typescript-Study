import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut } from "./actions/user";
import { AppDispatch, RootState } from "./redux";

const App = () => {
  const { loading, data } = useSelector((state: RootState) => state.user);
  const dispatch: AppDispatch = useDispatch();

  const onClick = () => {
    dispatch(
      logIn({
        nickname: "baoJyj",
        password: "비밀번호",
      })
    );
  };

  const onLogout = () => {
    dispatch(logOut());
  };

  return (
    <div>
      {loading ? (
        <div>로그인 중</div>
      ) : data ? (
        <div>{data.nickname}</div>
      ) : (
        "로그인 해주세요."
      )}
      {!data ? (
        <button onClick={onClick}>로그인</button>
      ) : (
        <button onClick={onLogout}>로그아웃</button>
      )}
    </div>
  );
};

export default App;
