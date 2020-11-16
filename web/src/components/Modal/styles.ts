import styled from 'styled-components';
import Modal from 'react-modal';

export const CustomModal = styled(Modal)`
  background: #c8c9cd;

  position: absolute;
  top: 50%;
  left: 50%;
  right: auto;
  bottom: auto;
  transform: translate(-50%, -50%);
  border-radius: 4px;

  padding: 24px 32px;

  h2 {
    margin-bottom: 24px;
    font-weight: bold;
    color: #46351d;
  }

  button {
    margin: 8px auto;
    background: #1f305f;
    border: none;
    color: #fff;
    padding: 8px 16px;
    border-radius: 4px;
  }
`;
