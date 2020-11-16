import styled from 'styled-components';

export const Table = styled.table`
  background-color: #fff;
  border-radius: 8px;
  width: 100%;

  tr:hover {
    opacity: 0.8;
  }

  tr:nth-child(even) {
    background-color: #999999;
    color: #fff;
  }

  thead th {
    padding: 4px 8px;
    background: #1f305f;
    color: #fff;
  }

  tbody td {
    svg {
      margin-right: 8px;
    }

    svg:hover {
      cursor: pointer;
    }

    padding: 4px 8px;
  }

  tbody tr {
  }
`;
