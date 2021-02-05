import * as React from 'react'
import { render, fireEvent, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom'
import Search from './Search'

afterEach(cleanup)

const setup = () => {
  const searchForm = { name: '', sorting: 'stars' }
  const utils = render(<Search searchForm={searchForm} onChange={(e) => ({
    ...searchForm, [e.target.name]: e.target.value
  })} />)
  const repoNameInput = utils.getByLabelText('name')
  const sortyByInput = utils.getByLabelText('sorting')
  return {
    repoNameInput,
    sortyByInput,
    ...utils
  }
}

test('test input', () => {
  const { repoNameInput, sortyByInput } = setup()
  fireEvent.change(repoNameInput, { target: { name: '' }})
  expect(repoNameInput.value).toBe('')

  fireEvent.change(sortyByInput, { target: { sorting: 'stars' }})
  expect(sortyByInput.value).toBe('stars')
})


it("renders the Search Form", () => {
  const searchForm = { name: '', sorting: 'stars'}
  render(<Search searchForm={searchForm} onChange={(e)=> ({
    ...searchForm, [e.target.name]: e.target.value
  })} />)

})