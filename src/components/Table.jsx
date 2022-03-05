import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './Table.css';
import { deleteWalett, fieldAct } from '../actions';
// Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão e Editar/Excluir
class Table extends React.Component {
    currency = (coin) => {
      const exchange = coin.exchangeRates;
      const currencyAb = Object.values(exchange);
      return currencyAb.find((name) => name.code === coin.currency);
    }

    currencyName = (infos) => {
      const nameExchange = this.currency(infos);
      return nameExchange.name.split('/')[0];
    }

    exchange = (infos) => {
      const exchange = this.currency(infos);
      return Number(exchange.ask).toFixed(2);
    }

    convertedValue = (infos) => {
      const { value } = infos;
      const valueExchange = ((this.exchange(infos)) * Number(value)).toFixed(2);
      return valueExchange;
    }

    deleteExpense = (infos) => {
      const { savedInfos, dispatch } = this.props;
      const newStateData = savedInfos.filter((wallet) => wallet !== infos);
      dispatch(deleteWalett(newStateData));
    }

    getExpenses = () => {
      const { savedInfos, dispatch } = this.props;
      const allValues = [];
      savedInfos.map((infos) => {
        allValues.push(this.convertedValue(infos));
        return allValues;
      });
      dispatch(fieldAct(allValues));
      return allValues;
    }

    render() {
      const { savedInfos } = this.props;
      this.getExpenses();
      return (
        <tbody>
          {
            savedInfos.map((infos) => (
              <tr className="dados" key={ infos.id }>
                <td>{infos.description}</td>
                <td>{infos.tag}</td>
                <td>{infos.method}</td>
                <td>{`R$ ${Number(infos.value).toFixed(2)}`}</td>
                <td>{this.currencyName(infos)}</td>
                <td>{`R$ ${this.exchange(infos)}`}</td>
                <td>{`R$ ${this.convertedValue(infos)}`}</td>
                <td>Real Brasileiro</td>
                <td>
                  <button
                    data-testid="delete-btn"
                    type="button"
                    onClick={ () => this.deleteExpense(infos) }
                  >
                    <RiDeleteBin6Line />
                  </button>
                </td>
              </tr>
            ))
          }
        </tbody>
      );
    }
}

const mapStateToProps = (state) => ({
  savedInfos: state.wallet.expenses,
});

Table.propTypes = {
  savedInfos: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatch: PropTypes.func.isRequired,
};
export default connect(mapStateToProps)(Table);
