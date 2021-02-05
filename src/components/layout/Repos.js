import React, { useMemo } from 'react'
import { useTable, useFilters, usePagination } from 'react-table'
import { REPO_COLUMNS } from '../data/RepoColumns'

const Repos = ({ loading, repos }) => {

  // due to cache issue, momorized is recommended
  const columns = useMemo(() => REPO_COLUMNS, [])
  const data = useMemo(() => repos, [repos])
  const tableInstance = useTable({
    columns: columns,
    data: data
  },
    useFilters,
    usePagination
  )

  const { getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    state,
    prepareRow } = tableInstance

  const { pageIndex } = state // pageIndex starts from 0

  if (loading) {
    return <div>Loading</div>
  } else {
    return (
      <>
        {!data.length ? null : <>
          <table {...getTableProps()}>
            <thead>
              {headerGroups.map(headerGroup => (
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <th {...column.getHeaderProps()}>{column.render('Header')}
                      {column.canFilter ? column.render('Filter') : null}
                    </th>

                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {page.map(row => {
                prepareRow(row)
                return (
                  <tr {...row.getRowProps()}>
                    {row.cells.map(cell => (
                      <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                    )
                    )}
                  </tr>
                )
              })}
            </tbody>
          </table>
          <div id="pagination" className="text-center pt-3 pb-3">
            {pageOptions.length ? <>
              <div>Page {pageIndex + 1}/{pageOptions.length}</div>
              <button onClick={() => previousPage()} disabled={!canPreviousPage}>Previous</button>
              {pageOptions.map(i => <button
                key={i}
                onClick={() => gotoPage(i)}>{i + 1}</button>)}
              <button onClick={() => nextPage()} disabled={!canNextPage}>Next</button>
            </> : <div>No Results</div>}
          </div>
        </>}
      </>
    )
  }

}

export default Repos
