/**
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import React, {
  useEffect,
  useCallback,
  useRef,
  ReactNode,
  // HTMLProps,
  MutableRefObject,
  CSSProperties,
} from 'react';
import {
  useTable,
  usePagination,
  useSortBy,
  useGlobalFilter,
  useColumnOrder,
  PluginHook,
  TableOptions,
  FilterType,
  IdType,
  Row,
} from 'react-table';
import { matchSorter, rankings } from 'match-sorter';
import { typedMemo, usePrevious } from '@superset-ui/core';
import { isEqual } from 'lodash';
import {
  /* GlobalFilter, */ GlobalFilterProps,
} from './components/GlobalFilter';
import {
  /* SelectPageSize, */ SelectPageSizeProps,
  SizeOption,
} from './components/SelectPageSize';
import SimplePagination from './components/Pagination';
import useSticky from './hooks/useSticky';
import { PAGE_SIZE_OPTIONS } from '../consts';
import { sortAlphanumericCaseInsensitive } from './utils/sortAlphanumericCaseInsensitive';

export interface DataTableProps<D extends object> extends TableOptions<D> {
  tableClassName?: string;
  searchInput?: boolean | GlobalFilterProps<D>['searchInput'];
  selectPageSize?: boolean | SelectPageSizeProps['selectRenderer'];
  pageSizeOptions?: SizeOption[]; // available page size options
  maxPageItemCount?: number;
  hooks?: PluginHook<D>[]; // any additional hooks
  width?: string | number;
  height?: string | number;
  serverPagination?: boolean;
  onServerPaginationChange: (pageNumber: number, pageSize: number) => void;
  serverPaginationData: { pageSize?: number; currentPage?: number };
  pageSize?: number;
  noResults?: string | ((filterString: string) => ReactNode);
  sticky?: boolean;
  rowCount: number;
  wrapperRef?: MutableRefObject<HTMLDivElement>;
  onColumnOrderChange: () => void;
}

// export interface RenderHTMLCellProps extends HTMLProps<HTMLTableCellElement> {
//   cellContent: ReactNode;
// }

// const DATA =
//   'data:image/png;base64,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';
// const DATA2 = 'http://localhost:8088/static/assets/images/license-logo.png';

const sortTypes = {
  alphanumeric: sortAlphanumericCaseInsensitive,
};

// Be sure to pass our updateMyData and the skipReset option
export default typedMemo(function DataTable<D extends object>({
  tableClassName,
  columns,
  data,
  serverPaginationData,
  width: initialWidth = '100%',
  height: initialHeight = 300,
  pageSize: initialPageSize = 0,
  initialState: initialState_ = {},
  pageSizeOptions = PAGE_SIZE_OPTIONS,
  maxPageItemCount = 9,
  sticky: doSticky,
  searchInput = true,
  onServerPaginationChange,
  rowCount,
  // selectPageSize,
  noResults: noResultsText = 'No data found',
  hooks,
  serverPagination,
  wrapperRef: userWrapperRef,
  // onColumnOrderChange,
  ...moreUseTableOptions
}: DataTableProps<D>): JSX.Element {
  const tableHooks: PluginHook<D>[] = [
    useGlobalFilter,
    useSortBy,
    usePagination,
    useColumnOrder,
    doSticky ? useSticky : [],
    hooks || [],
  ].flat();
  const columnNames = Object.keys(data?.[0] || {});
  const previousColumnNames = usePrevious(columnNames);
  const resultsSize = serverPagination ? rowCount : data.length;
  const sortByRef = useRef([]); // cache initial `sortby` so sorting doesn't trigger page reset
  const pageSizeRef = useRef([initialPageSize, resultsSize]);
  const hasPagination = initialPageSize > 0 && resultsSize > 0; // pageSize == 0 means no pagination
  const hasGlobalControl = hasPagination || !!searchInput;
  const initialState = {
    ...initialState_,
    // zero length means all pages, the `usePagination` plugin does not
    // understand pageSize = 0
    sortBy: sortByRef.current,
    pageSize: initialPageSize > 0 ? initialPageSize : resultsSize || 10,
  };
  const defaultWrapperRef = useRef<HTMLDivElement>(null);
  const globalControlRef = useRef<HTMLDivElement>(null);
  const paginationRef = useRef<HTMLDivElement>(null);
  const wrapperRef = userWrapperRef || defaultWrapperRef;
  const paginationData = JSON.stringify(serverPaginationData);

  const defaultGetTableSize = useCallback(() => {
    if (wrapperRef.current) {
      // `initialWidth` and `initialHeight` could be also parameters like `100%`
      // `Number` returns `NaN` on them, then we fallback to computed size
      const width = Number(initialWidth) || wrapperRef.current.clientWidth;
      const height =
        (Number(initialHeight) || wrapperRef.current.clientHeight) -
        (globalControlRef.current?.clientHeight || 0) -
        (paginationRef.current?.clientHeight || 0);
      return { width, height };
    }
    return undefined;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    initialHeight,
    initialWidth,
    wrapperRef,
    hasPagination,
    hasGlobalControl,
    paginationRef,
    resultsSize,
    paginationData,
  ]);

  const defaultGlobalFilter: FilterType<D> = useCallback(
    (rows: Row<D>[], columnIds: IdType<D>[], filterValue: string) => {
      // allow searching by "col1_value col2_value"
      const joinedString = (row: Row<D>) =>
        columnIds.map(x => row.values[x]).join(' ');
      return matchSorter(rows, filterValue, {
        keys: [...columnIds, joinedString],
        threshold: rankings.ACRONYM,
      }) as typeof rows;
    },
    [],
  );

  const {
    // getTableProps,
    // getTableBodyProps,
    // prepareRow,
    // headerGroups,
    // footerGroups,
    page,
    pageCount,
    gotoPage,
    // preGlobalFilteredRows,
    // setGlobalFilter,
    setPageSize: setPageSize_,
    wrapStickyTable,
    // setColumnOrder,
    // allColumns,
    state: { pageIndex, pageSize, globalFilter: filterValue, sticky = {} },
  } = useTable<D>(
    {
      columns,
      data,
      initialState,
      getTableSize: defaultGetTableSize,
      globalFilter: defaultGlobalFilter,
      sortTypes,
      autoResetSortBy: !isEqual(columnNames, previousColumnNames),
      ...moreUseTableOptions,
    },
    ...tableHooks,
  );
  // make setPageSize accept 0
  const setPageSize = (size: number) => {
    if (serverPagination) {
      onServerPaginationChange(0, size);
    }
    // keep the original size if data is empty
    if (size || resultsSize !== 0) {
      setPageSize_(size === 0 ? resultsSize : size);
    }
  };

  const noResults =
    typeof noResultsText === 'function'
      ? noResultsText(filterValue as string)
      : noResultsText;

  const getNoResults = () => <div className="dt-no-results">{noResults}</div>;

  if (!columns || columns.length === 0) {
    return (
      wrapStickyTable ? wrapStickyTable(getNoResults) : getNoResults()
    ) as JSX.Element;
  }

  // const shouldRenderFooter = columns.some(x => !!x.Footer);

  // let columnBeingDragged = -1;

  // const onDragStart = (e: React.DragEvent) => {
  //   const el = e.target as HTMLTableCellElement;
  //   columnBeingDragged = allColumns.findIndex(
  //     col => col.id === el.dataset.columnName,
  //   );
  //   e.dataTransfer.setData('text/plain', `${columnBeingDragged}`);
  // };

  // const onDrop = (e: React.DragEvent) => {
  //   const el = e.target as HTMLTableCellElement;
  //   const newPosition = allColumns.findIndex(
  //     col => col.id === el.dataset.columnName,
  //   );
  //
  //   if (newPosition !== -1) {
  //     const currentCols = allColumns.map(c => c.id);
  //     const colToBeMoved = currentCols.splice(columnBeingDragged, 1);
  //     currentCols.splice(newPosition, 0, colToBeMoved[0]);
  //     setColumnOrder(currentCols);
  //     // toggle value in TableChart to trigger column width recalc
  //     onColumnOrderChange();
  //   }
  //   e.preventDefault();
  // };

  // const renderTable = () => (
  //   <table {...getTableProps({ className: tableClassName })}>
  //     <thead>
  //       {headerGroups.map(headerGroup => {
  //         const { key: headerGroupKey, ...headerGroupProps } =
  //           headerGroup.getHeaderGroupProps();
  //         return (
  //           <tr key={headerGroupKey || headerGroup.id} {...headerGroupProps}>
  //             {headerGroup.headers.map(column =>
  //               column.render('Header', {
  //                 key: column.id,
  //                 ...column.getSortByToggleProps(),
  //                 onDragStart,
  //                 onDrop,
  //               }),
  //             )}
  //           </tr>
  //         );
  //       })}
  //     </thead>
  //     <tbody {...getTableBodyProps()}>
  //       {page && page.length > 0 ? (
  //         page.map(row => {
  //           prepareRow(row);
  //           const { key: rowKey, ...rowProps } = row.getRowProps();
  //           return (
  //             <tr key={rowKey || row.id} {...rowProps}>
  //               {row.cells.map(cell =>
  //                 cell.render('Cell', { key: cell.column.id }),
  //               )}
  //             </tr>
  //           );
  //         })
  //       ) : (
  //         <tr>
  //           <td className="dt-no-results" colSpan={columns.length}>
  //             {noResults}
  //           </td>
  //         </tr>
  //       )}
  //     </tbody>
  //     {shouldRenderFooter && (
  //       <tfoot>
  //         {footerGroups.map(footerGroup => {
  //           const { key: footerGroupKey, ...footerGroupProps } =
  //             footerGroup.getHeaderGroupProps();
  //           return (
  //             <tr key={footerGroupKey || footerGroup.id} {...footerGroupProps}>
  //               {footerGroup.headers.map(column =>
  //                 column.render('Footer', { key: column.id }),
  //               )}
  //             </tr>
  //           );
  //         })}
  //       </tfoot>
  //     )}
  //   </table>
  // );

  // // eslint-disable-next-line react-hooks/rules-of-hooks
  // useEffect(() => {
  //   // eslint-disable-next-line no-console
  //   console.log('React.useEffect: [data, columns]');
  //   // eslint-disable-next-line no-console
  //   console.log(columns);
  //   // eslint-disable-next-line no-console
  //   console.log(data);
  // }, [data, columns]);

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('React.useEffect: [page]');
    // eslint-disable-next-line no-console
    console.log(page);
  }, [page]);

  const renderScreenshot = () => (
    <div className={`screenshot-chart-container ${tableClassName}`}>
      {page.map(v => (
        <div key={v.id} className="screenshot-image-box">
          <img
            src={v.values[0]}
            alt={v.values[0]}
            className="screenshot-image"
          />
        </div>
      ))}
    </div>
  );

  // force update the pageSize when it's been update from the initial state
  if (
    pageSizeRef.current[0] !== initialPageSize ||
    // when initialPageSize stays as zero, but total number of records changed,
    // we'd also need to update page size
    (initialPageSize === 0 && pageSizeRef.current[1] !== resultsSize)
  ) {
    pageSizeRef.current = [initialPageSize, resultsSize];
    setPageSize(initialPageSize);
  }

  const paginationStyle: CSSProperties = sticky.height
    ? {}
    : { visibility: 'hidden' };

  let resultPageCount = pageCount;
  let resultCurrentPageSize = pageSize;
  let resultCurrentPage = pageIndex;
  let resultOnPageChange: (page: number) => void = gotoPage;
  if (serverPagination) {
    const serverPageSize = serverPaginationData?.pageSize ?? initialPageSize;
    resultPageCount = Math.ceil(rowCount / serverPageSize);
    if (!Number.isFinite(resultPageCount)) {
      resultPageCount = 0;
    }
    resultCurrentPageSize = serverPageSize;
    const foundPageSizeIndex = pageSizeOptions.findIndex(
      ([option]) => option >= resultCurrentPageSize,
    );
    if (foundPageSizeIndex === -1) {
      resultCurrentPageSize = 0;
    }
    resultCurrentPage = serverPaginationData?.currentPage ?? 0;
    resultOnPageChange = (pageNumber: number) =>
      onServerPaginationChange(pageNumber, serverPageSize);
  }
  return (
    <div
      ref={wrapperRef}
      style={{ width: initialWidth, height: initialHeight }}
    >
      {/* {hasGlobalControl ? ( */}
      {/*  <div ref={globalControlRef} className="form-inline dt-controls"> */}
      {/*    <div className="row"> */}
      {/*      <div className="col-sm-6"> */}
      {/*        {hasPagination ? ( */}
      {/*          <SelectPageSize */}
      {/*            total={resultsSize} */}
      {/*            current={resultCurrentPageSize} */}
      {/*            options={pageSizeOptions} */}
      {/*            selectRenderer={ */}
      {/*              typeof selectPageSize === 'boolean' */}
      {/*                ? undefined */}
      {/*                : selectPageSize */}
      {/*            } */}
      {/*            onChange={setPageSize} */}
      {/*          /> */}
      {/*        ) : null} */}
      {/*      </div> */}
      {/*      {searchInput ? ( */}
      {/*        <div className="col-sm-6"> */}
      {/*          <GlobalFilter<D> */}
      {/*            searchInput={ */}
      {/*              typeof searchInput === 'boolean' ? undefined : searchInput */}
      {/*            } */}
      {/*            preGlobalFilteredRows={preGlobalFilteredRows} */}
      {/*            setGlobalFilter={setGlobalFilter} */}
      {/*            filterValue={filterValue} */}
      {/*          /> */}
      {/*        </div> */}
      {/*      ) : null} */}
      {/*    </div> */}
      {/*  </div> */}
      {/* ) : null} */}
      {/* {wrapStickyTable ? wrapStickyTable(renderTable) : renderTable()} */}
      {/* {wrapStickyTable ? wrapStickyTable(renderScreenshot) : renderScreenshot()} */}
      {renderScreenshot()}
      {hasPagination && resultPageCount > 1 ? (
        <SimplePagination
          ref={paginationRef}
          style={paginationStyle}
          maxPageItemCount={maxPageItemCount}
          pageCount={resultPageCount}
          currentPage={resultCurrentPage}
          onPageChange={resultOnPageChange}
        />
      ) : null}
    </div>
  );
});
