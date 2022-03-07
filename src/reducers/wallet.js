// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas
const INITIAL_STATE = {
  currencies: [],
  expenses: [],
  expenseWallet: {},
};

const wallet = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case 'EXCHANGE':
    return {
      ...state,
      currencies: action.currencies,
    };
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
  case 'EDIT_EXPENSE':
    return {
      ...state,
      editExpenses: action.bool,
      getInfosEdit: action.infos,
    };
  default:
    return state;
  }
};

export default wallet;
