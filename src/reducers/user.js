// Esse reducer será responsável por tratar as informações da pessoa usuária

const INITIAL_STATE = {
  email: '',
  passwordLength: 0,
};

const user = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'LOGIN_FORMS':
    return {
      ...state,
      email: action.state.email,
      passwordLength: action.state.passwordLength.length,
    };
  default:
    return { ...state, ...action.state };
  }
};
export default user;
