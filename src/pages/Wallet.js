import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { editWallet, moedaAPI, newRequisitionCoins } from '../actions';
import HeadTable from '../components/HeadTable';
import Table from '../components/Table';
import '../components/Wallet.css';

const initialState = {
  value: 0,
  description: '',
  currency: 'USD',
  method: 'Dinheiro',
  tag: 'Alimentação',
};

class Wallet extends React.Component {
    state = {
      id: 0,
      ...initialState,
    }

    componentDidMount() {
      const { dispatch } = this.props;
      dispatch(moedaAPI());
    }

    handleChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
    }

    handleClick=() => {
      const { id, value, description, currency, method, tag } = this.state;
      const { dispatch, isEditExpenses, edit } = this.props;
      const infoWalletExpense = {
        id,
        value,
        description,
        currency,
        method,
        tag,
      };
      if (isEditExpenses) {
        dispatch(editWallet({
          ...infoWalletExpense, id: edit.id, exchangeRates: edit.exchangeRates,
        }));
      } else {
        dispatch(newRequisitionCoins(infoWalletExpense));
        this.setState({
          id: id + 1,
          ...initialState,
        });
      }
    }

    getExpenses = () => {
      const { fieldState } = this.props;
      const expensesValues = Object.values(fieldState);
      const sumExpenses = expensesValues
        .reduce((acc, valor) => Number(acc) + Number(valor), 0).toFixed(2);
      return sumExpenses;
    }

    render() {
      // this.getCurrency();
      const { email, currencyKeys, fieldState, isEditExpenses } = this.props;
      const { value, description, currency, method, tag } = this.state;
      const metodoPagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
      const despesaDiversas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
      return (
        <main>
          <header>
            <p data-testid="email-field">{email}</p>
            {
              fieldState && (
                <p>
                  Despesa Total:
                  {' '}
                  <span data-testid="total-field">{this.getExpenses()}</span>
                </p>
              )
            }
            <p data-testid="header-currency-field">BRL</p>
          </header>
          <form>
            <label htmlFor="value">
              Valor
              <input
                type="number"
                data-testid="value-input"
                name="value"
                value={ value }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="description">
              Descrição
              <input
                type="text"
                data-testid="description-input"
                name="description"
                value={ description }
                onChange={ this.handleChange }
              />
            </label>
            <label htmlFor="currency">
              Moeda
              <select
                name="currency"
                id="currency"
                data-testid="currency-input"
                onChange={ this.handleChange }
                value={ currency }
              >
                {
                  currencyKeys && currencyKeys.map((option) => (
                    <option
                      data-testid={ option }
                      key={ option }
                      value={ option }
                      id={ option }
                    >
                      { option }
                    </option>
                  ))
                }
              </select>
            </label>

            <label htmlFor="method">
              Metodo de pagamento
              <select
                name="method"
                id="method"
                data-testid="method-input"
                onChange={ this.handleChange }
                value={ method }
              >
                {
                  metodoPagamento.map((option, index) => (
                    <option data-testid={ option } key={ index }>{ option }</option>
                  ))
                }
              </select>
            </label>

            <label htmlFor="tag">
              Tag
              <select
                name="tag"
                id="tag"
                data-testid="tag-input"
                onChange={ this.handleChange }
                value={ tag }
              >
                {
                  despesaDiversas.map((option, index) => (
                    <option data-testid={ option } key={ index }>{ option }</option>
                  ))
                }
              </select>
            </label>
            <button
              type="button"
              onClick={ this.handleClick }
              disabled={ !currency }
            >
              {
                isEditExpenses ? 'Editar Despesas' : 'Adicionar Despesas'
              }
            </button>
          </form>
          <table>
            <HeadTable />
            <Table />
          </table>
        </main>
      );
    }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencyExchange: state.wallet.currenciesExchange,
  currencyKeys: state.wallet.currencies,
  fieldState: state.wallet.expenseWallet,
  isEditExpenses: state.wallet.editExpenses,
  edit: state.wallet.getInfosEdit,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  fieldState: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
  isEditExpenses: PropTypes.bool.isRequired,
  edit: PropTypes.objectOf(PropTypes.object).isRequired,
  currencyKeys: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default connect(mapStateToProps)(Wallet);
