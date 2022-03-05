export const loginForms = (state) => ({ type: 'LOGIN_FORMS', state });

export const exchangeAction = (currency) => ({ type: 'EXCHANGE', currency });
const URL = 'https://economia.awesomeapi.com.br/json/all';
export const infoData = (expenses) => ({ type: 'SAVE_WALLET', expenses });
export const deleteWalett = (expenses) => ({ type: 'DELETE_WALLET', expenses });

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
