import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loginForms, moedaAPI } from '../actions';
import '../components/Login.css';

class Login extends React.Component {
    state ={
      email: '',
      passwordLength: '',
    }

    handleChange = ({ target: { value, name } }) => {
      this.setState({ [name]: value });
    }

    validateForms = () => {
      const { email, passwordLength } = this.state;
      let disabledButton = true;
      const regex = /\S+@\S+\.\S+/;
      const validateEmail = regex.test(email);
      const MIN_CARACTER = 6;
      if (passwordLength.length >= MIN_CARACTER && validateEmail) {
        disabledButton = false;
        return disabledButton;
      }
      return disabledButton;
    }

    handleClick= () => {
      const { dispatch, history } = this.props;
      dispatch(moedaAPI());
      dispatch(loginForms(this.state));
      history.push('/carteira');
    }

    render() {
      const { email, passwordLength } = this.state;

      return (
        <div className="forms">
          <input
            type="text"
            name="email"
            id="email"
            data-testid="email-input"
            value={ email }
            onChange={ this.handleChange }
            placeholder="Email"
          />

          <input
            data-testid="password-input"
            type="password"
            name="passwordLength"
            value={ passwordLength }
            onChange={ this.handleChange }
            placeholder="Senha"
          />

          <button
            type="button"
            label="Enviar"
            disabled={ this.validateForms() }
            onClick={ this.handleClick }
          >
            Entrar
          </button>
        </div>
      );
    }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect()(Login);
