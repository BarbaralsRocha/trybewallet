import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { infoData } from '../actions';
import HeadTable from '../components/HeadTable';
import Table from '../components/Table';
import '../components/Wallet.css';

class Wallet extends React.Component {
    state = {
      id: 0,
      value: 0,
      currency: '',
      method: '',
      tag: '',
      description: '',
    }

    componentDidMount() {
      this.getExpenses();
    }

    handleChange = ({ target: { name, value } }) => {
      this.setState({ [name]: value });
    }

    handleClick=() => {
      const { id, value, description, currency, method, tag } = this.state;
      const { dispatch, currencyExchange } = this.props;
      dispatch(infoData({
        id,
        value,
        description,
        currency,
        method,
        tag,
        exchangeRates: currencyExchange,
      }));

      this.setState({
        id: id + 1,
        value: 0,
        description: '',
        currency: '',
        method: '',
        tag: '',
      });
    }

    getCurrency = () => {
      const { currencyExchange } = this.props;
      console.log(currencyExchange);
      const moedas = Object.keys(currencyExchange).filter((coins) => coins !== 'USDT');
      return moedas;
    }

    getExpenses = () => {
      const { fieldState } = this.props;
      const expensesValues = Object.values(fieldState);
      const sumExpenses = expensesValues
        .reduce((acc, valor) => Number(acc) + Number(valor), 0).toFixed(2);
      this.setState({ sum: sumExpenses });
      return sumExpenses;
    }

    render() {
      const { email } = this.props;
      const { value, description, currency, method, tag, sum } = this.state;
      const metodoPagamento = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
      const despesaDiversas = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
      return (
        <main>
          <header>
            <p data-testid="email-field">{email}</p>
            <p data-testid="total-field">{`Despesa Total: ${sum} `}</p>
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
                required
                data-testid="currency-input"
                onChange={ this.handleChange }
                value={ currency }
              >
                {
                  this.getCurrency().map((option) => (
                    <option
                      data-testid={ option }
                      value={ option }
                      key={ option }
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
              Adicionar Despesas
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
  currencyExchange: state.wallet.currency,
  fieldState: state.wallet.expenseWallet,
});

Wallet.propTypes = {
  email: PropTypes.string.isRequired,
  currencyExchange: PropTypes.objectOf(PropTypes.object).isRequired,
  fieldState: PropTypes.objectOf(PropTypes.string).isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(Wallet);
