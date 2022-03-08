import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { RiDeleteBin6Line } from 'react-icons/ri';
import './Table.css';
import { deleteWallet, fieldAct, stateEdit } from '../actions';

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
      return Number(exchange.ask);
    }

    convertedValue = (infos) => {
      const { value } = infos;
      const valueExchange = ((this.exchange(infos)) * parseFloat(value));
      return valueExchange;
    }

    deleteExpense = (infos) => {
      const { savedInfos, dispatch } = this.props;
      const newStateData = savedInfos.filter((wallet) => wallet !== infos);
      dispatch(deleteWallet(newStateData));
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

    editExpenses = (infos) => {
      const { dispatch } = this.props;
      dispatch(stateEdit(true, infos));
      // const newInfos = savedInfos.filter((sameId) => sameId.id === infos.id);
      // dispatch(editWallet(newInfos));
    }

    render() {
      const { savedInfos } = this.props;
      this.getExpenses();
      return (
        <tbody>
          {
            savedInfos && savedInfos.map((infos) => (
              <tr className="dados" key={ infos.id }>
                <td>{infos.description}</td>
                <td>{infos.tag}</td>
                <td>{infos.method}</td>
                <td>{`${parseFloat(infos.value).toFixed(2)}`}</td>
                <td>{this.currencyName(infos)}</td>
                <td>{`${this.exchange(infos).toFixed(2)}`}</td>
                <td>{`${this.convertedValue(infos).toFixed(2)}`}</td>
                <td>Real</td>
                <td>
                  <button
                    data-testid="edit-btn"
                    type="button"
                    onClick={ () => this.editExpenses(infos) }
                  >
                    Editar
                  </button>
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
