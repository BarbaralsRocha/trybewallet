// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currency: [],
  expenses: [],
  expenseWallet: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'INFO_DATA': {
    return {
      ...state,
      currency: Object.keys(action.expenses),
    };
  }
  case 'SAVE_WALLET':
    return { ...state,
      expenses: [...state.expenses, action.expenses],
    };
  case 'DELETE_WALLET':
    return { ...state,
      expenses: action.expenses,
    };
  case 'FIELD':
    return {
      ...state,
      expenseWallet: { ...action.valueExpenses },
    };
  default:
    return { ...state, ...action };
  }
};

export default wallet;
