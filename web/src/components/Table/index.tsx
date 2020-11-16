import React, { PropsWithChildren, ReactElement } from 'react';
import { BiEdit } from 'react-icons/bi';
import { useTable, useSortBy, TableOptions, usePagination } from 'react-table';

import { Table as CustomTable } from './styles';

export interface ITableProps<T extends object = {}> extends TableOptions<T> {
  name: string;
  onEditButtonClick(barcode: string): void;
}

export default function Table<T extends object>(
  props: PropsWithChildren<ITableProps<T>>,
): ReactElement {
  const hooks = [useSortBy, usePagination];
  const { onEditButtonClick, columns } = props;
  const instance = useTable<T>({ ...props, columns }, ...hooks);

  const {
    getTableProps,
    headerGroups,
    getTableBodyProps,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
  } = instance;

  const { pageIndex } = state;

  return (
    <>
      <CustomTable {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => {
                column.id === 'barcodeColumn' && column.toggleHidden(true);
                return (
                  <th {...column.getHeaderProps()}>
                    {column.render('Header')}
                  </th>
                );
              })}
            </tr>
          ))}
        </thead>

        <tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map(cell =>
                  cell.column.Header === 'Nome do produto' ? (
                    <td {...cell.getCellProps()}>
                      <BiEdit
                        onClick={() => {
                          onEditButtonClick(row.values.barcodeColumn);
                        }}
                      />
                      {cell.render('Cell')}
                    </td>
                  ) : (
                    <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                  ),
                )}
              </tr>
            );
          })}
        </tbody>
      </CustomTable>
      <div className="pagination">
        <button
          type="button"
          onClick={() => gotoPage(0)}
          disabled={!canPreviousPage}
        >
          {'<<'}
        </button>{' '}
        <button
          type="button"
          onClick={() => previousPage()}
          disabled={!canPreviousPage}
        >
          {'<'}
        </button>{' '}
        <button
          type="button"
          onClick={() => nextPage()}
          disabled={!canNextPage}
        >
          {'>'}
        </button>{' '}
        <button
          type="button"
          onClick={() => gotoPage(pageCount - 1)}
          disabled={!canNextPage}
        >
          {'>>'}
        </button>{' '}
        <span>
          Página{' '}
          <strong>
            {pageIndex + 1} de {pageOptions.length}
          </strong>{' '}
        </span>
      </div>
    </>
  );
}
