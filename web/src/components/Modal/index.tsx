import React, { useCallback } from 'react';
import { Form } from '@unform/web';

import Input from '../Input';

import { CustomModal } from './styles';
import api from '../../services/api';

interface IModalProps {
  mode?: 'edit' | 'create';
  data?: {
    name: string;
    quantity: number;
    price: number;
    barcode: string;
  };
  isOpen: boolean;
  handleClose(): void;
  updateItems(): void;
}

const Modal: React.FC<IModalProps> = ({
  mode = 'create',
  isOpen,
  handleClose,
  data,
  updateItems,
}) => {
  const handleCreateProduct = useCallback(async product => {
    await api.post('/products', product);
  }, []);

  const handleUpdateProduct = useCallback(
    async product => {
      await api.put(`/products/${data?.barcode}`, product);
    },
    [data?.barcode],
  );

  const handleSubmit = useCallback(
    async product => {
      mode === 'create'
        ? await handleCreateProduct(product)
        : await handleUpdateProduct(product);

      updateItems();
      handleClose();
    },
    [handleClose, handleCreateProduct, handleUpdateProduct, mode, updateItems],
  );

  return (
    <CustomModal
      isOpen={isOpen}
      onRequestClose={handleClose}
      appElement={document.getElementById('root') || undefined}
    >
      <h2>{mode === 'create' ? 'Novo produto' : 'Editar produto'}</h2>
      <Form
        initialData={{
          name: data?.name,
          quantity: data?.quantity,
          price: data?.price,
        }}
        onSubmit={handleSubmit}
      >
        <Input name="name" inputLabel="Produto" autoFocus />
        <Input name="quantity" inputLabel="Estoque" type="number" step={0.01} />
        <Input
          name="price"
          inputLabel="Valor unitário"
          type="number"
          step={0.01}
        />

        <button type="submit">
          {mode === 'create' ? 'Salvar produto' : 'Confirmar alterações'}
        </button>
      </Form>
    </CustomModal>
  );
};

export default Modal;
