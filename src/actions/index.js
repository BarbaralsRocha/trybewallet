const URL = 'https://economia.awesomeapi.com.br/json/all';
export const loginForms = (state) => ({ type: 'LOGIN_FORMS', state });
export const exchangeAction = (currencies) => ({ type: 'EXCHANGE', currencies });
export const infoData = (expenses) => ({ type: 'SAVE_WALLET', expenses });
export const deleteWallet = (expenses) => ({ type: 'DELETE_WALLET', expenses });
export const stateEdit = (bool, infos) => ({ type: 'EDIT_EXPENSE', bool, infos });
export const editWallet = (expenses) => ({ type: 'CHANGE_WALLET', expenses });

export const newRequisitionCoins = (expenses) => (dispatch) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      dispatch(infoData({ ...expenses, exchangeRates: data }));
    });
};

export const moedaAPI = () => (dispatch) => {
  fetch(URL)
    .then((response) => response.json())
    .then((data) => {
      delete data.USDT;
      dispatch(exchangeAction(data));
    });
};

export const fieldAct = (valueExpenses) => ({ type: 'FIELD', valueExpenses });

export const currencyExchange = (currency) => ({ type: 'CURRENCY', currency });
