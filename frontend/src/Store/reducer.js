const USER_INFO = "USER_INFO";

export function userInfo(payload) {
  return {
    type: USER_INFO,
    payload,
  };
}

const userInitialState = {
  user: null,
};

export default function userInfoReducer(state = userInitialState, action) {
  const { payload, type } = action;
  switch (type) {
    case USER_INFO:
      return { ...state, user: payload };

    default:
      return state;
  }
}
