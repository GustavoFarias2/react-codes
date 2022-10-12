import React from 'react'

import { useQuery } from 'react-query'

import useQueryFilter from './hooks/useQueryFilter'

const useCars = (query: string) =>
  useQuery(['teste', query], () => {
    if (query) {
      return query.split('&')
    }
  })

function App() {
  const { query, setPage, setSearch, page, setOrder } = useQueryFilter()
  const { data } = useCars(query)

  return (
    <div className="flex h-screen w-screen items-center justify-center bg-gray-900 ">
      <div className="mx-auto w-3/12 space-y-5 rounded bg-gray-800 p-6 text-center">
        <input onChange={(e) => setSearch(e.currentTarget.value)} />
        <h1 onClick={() => setPage(page + 1)} className="text-4xl text-white">
          trocar page: {page}
        </h1>
        <h1 onClick={() => setOrder('DESC')} className="text-4xl text-white">
          change order
        </h1>
        {data?.map((d) => (
          <p key={d} className="text-2xl text-blue-300">
            {' '}
            {d}
          </p>
        ))}
      </div>
    </div>
  )
}

export default App
