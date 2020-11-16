import React from 'react';
import { IDataType } from '../../pages/Home';
import Table from '../Table';

import { Container } from './styles';

interface ICriticalStockProps {
  onEditButtonClick(barcode: string): void;
  data: IDataType[];
}

const CriticalStock: React.FC<ICriticalStockProps> = ({
  onEditButtonClick,
  data,
}) => {
  return (
    <Container>
      <h3>Produtos com baixo estoque</h3>
      <Table
        columns={[
          {
            Header: 'Nome do produto',
            accessor: 'name', // accessor is the "key" in the data
          },
          {
            Header: 'Estoque',
            accessor: 'quantity',
          },
          {
            Header: 'Valor unitário',
            accessor: 'formattedPrice',
          },
          {
            Header: 'Código de barras',
            accessor: 'barcode',
            id: 'barcodeColumn',
          },
        ]}
        name="Tabela de teste"
        data={data}
        onEditButtonClick={onEditButtonClick}
      />
    </Container>
  );
};

export default CriticalStock;
