import React, { useCallback, useEffect, useState } from 'react';
import CriticalStock from '../../components/CriticalStock';
import Modal from '../../components/Modal';

import Table from '../../components/Table';
import api from '../../services/api';

import { Container } from './styles';

export interface IDataType {
  barcode: string;
  name: string;
  price: number;
  formattedPrice: string;
  quantity: number;
}

const Home: React.FC = () => {
  const [data, setData] = useState<IDataType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [modalMode, setModalMode] = useState<'edit' | 'create'>('create');
  const [selectedProduct, setSelectedProduct] = useState<IDataType>(
    {} as IDataType,
  );

  const fetchData = useCallback(() => {
    api.get<IDataType[]>('/products').then(response => {
      const filteredData = response.data.map(
        ({ name, price, quantity, barcode }) => ({
          name,
          formattedPrice: new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(price),
          quantity,
          barcode,
          price,
        }),
      );
      setData(filteredData);
    });
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleOpenModalCreateMode = useCallback(() => {
    setModalMode('create');
    setShowModal(true);
  }, []);

  const handleOpenModalEditMode = useCallback(() => {
    setModalMode('edit');
    setShowModal(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setSelectedProduct({} as IDataType);
    setShowModal(false);
  }, []);

  const onEditButtonClick = useCallback(
    (barcode: string) => {
      const foundProduct = data.find(product => product.barcode === barcode);
      if (foundProduct) {
        setSelectedProduct(foundProduct);
      }
      handleOpenModalEditMode();
    },
    [data, handleOpenModalEditMode],
  );

  return (
    <Container>
      <Modal
        isOpen={showModal}
        mode={modalMode}
        handleClose={handleCloseModal}
        updateItems={fetchData}
        data={selectedProduct}
      />

      <header>
        <h2>Meus produtos</h2>
      </header>

      <main>
        <button type="button" onClick={handleOpenModalCreateMode}>
          + Novo produto
        </button>

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

        <CriticalStock
          data={data.filter(product => product.quantity < 100)}
          onEditButtonClick={onEditButtonClick}
        />
      </main>
    </Container>
  );
};

export default Home;
