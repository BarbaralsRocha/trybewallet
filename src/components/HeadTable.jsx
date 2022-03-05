import React from 'react';
import './HeadTable.css';
// Descrição, Tag, Método de pagamento, Valor, Moeda, Câmbio utilizado, Valor convertido, Moeda de conversão e Editar/Excluir
class HeadTable extends React.Component {
  render() {
    const itensHeader = ['Descrição', 'Tag', 'Método de pagamento',
      'Valor', 'Moeda', 'Câmbio utilizado', 'Valor convertido',
      'Moeda de conversão', 'Editar/Excluir'];
    return (
      <thead>
        <tr>
          {
            itensHeader.map((itens, index) => (
              <th key={ index }>{itens}</th>
            ))
          }
        </tr>
      </thead>
    );
  }
}

export default HeadTable;
