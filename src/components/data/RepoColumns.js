import ColumnFilter from '../layout/ColumnFilter'

export const REPO_COLUMNS = [
  {
    Header: 'Repo Name',
    accessor: 'name',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'Owner',
    accessor: 'owner.login',
    Filter: ColumnFilter,
    disableFilters: true
  },
  {
    Header: 'Language',
    accessor: 'language',
    Filter: ColumnFilter
  }
]