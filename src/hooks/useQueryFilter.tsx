import { useEffect, useState } from 'react'

// DEBOUNCE TIME FOR INPUT
const INPUT_REQUISITION_DEBOUNCE_TIME = 500

// SEARCH STRING PARAM
const SEARCH_STRING = 'query'
// PAGINATION PAGE
const PAGE = 'page'
// PAGINATION SIZE
const SIZE = 'size'
// QUERY ORDER
type TOrderDirections = 'ASC' | 'DESC'
const ORDER = 'direction'
// SORT BT KEY
const SORT_BY = 'sortKey'

const debounceSearch = (fn: (str: string) => void, time: number) => {
  let timeoutId: NodeJS.Timeout | null

  return (str: string) => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }

    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(str)
    }, time)
  }
}

interface useTableFilterParams {
  startOrder?: TOrderDirections
  startSearch?: string
  startSortKey?: string
  startPage?: number
  startSize?: number
  startActive?: boolean
}

const useQueryFilter = (options?: useTableFilterParams) => {
  const [query, setQuery] = useState<string>('')
  const [search, setSearch] = useState<string>(options?.startSearch || '')
  const [sortKey, setSortKey] = useState<string>(options?.startSortKey || '')
  const [active, setActive] = useState<boolean | null>(
    options?.startActive || null
  )
  const [order, setOrder] = useState<TOrderDirections>(
    options?.startOrder || 'ASC'
  )
  const [page, setPage] = useState(options?.startPage || 0)
  const [size, setSize] = useState(options?.startSize || 10)

  useEffect(() => {
    const query = `?${search ? `&${SEARCH_STRING}=${search}` : ''}${
      page ? `&${PAGE}=${page}` : ''
    }${size ? `&${SIZE}=${size}` : ''}${order ? `&${ORDER}=${order}` : ''}${
      sortKey ? `&${SORT_BY}=${String(sortKey)}` : ''
    }${typeof active === 'boolean' ? `&active=${active}` : ''}`

    setQuery(query)
  }, [active, search, size, order, page, sortKey])

  useEffect(() => {
    setPage(0)
  }, [search])

  const handleSearch = debounceSearch((v) => {
    setSearch(v)
  }, INPUT_REQUISITION_DEBOUNCE_TIME)

  return {
    query,
    page,
    setPage,
    setSize,
    setOrder,
    setActive,
    setSortKey,
    setSearch: handleSearch
  }
}

export default useQueryFilter
