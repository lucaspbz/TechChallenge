import React from 'react';

import { Container } from './styles';

const Product: React.FC = () => {
  return (
    <Container>
      <section>
        <span>Nome do produto</span>
      </section>
      <section>
        <span>Estoque: 54un</span>
        <span>Valor unitário: R$ 923,59</span>
      </section>
    </Container>
  );
};

export default Product;
