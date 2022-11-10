import React from 'react'
import { createBrowserRouter, RouterProvider, createRoutesFromElements, Route } from 'react-router-dom'
import Dashboard from './routes/Dashboard'
import Detail from './routes/Detail'

export type Todos = {
  id?: number
  title?: string
  created_at?: string
  route?: string
  priority?: string
  edit?: boolean
}

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path='/' element={<Dashboard />} />
      <Route path='/details/:id' element={<Detail />} key={window.location.href} />
    </>
  )
)

const App: React.FunctionComponent = () => {
  return (
    <main className='max-w-[1000px] mx-auto flex flex-col pb-16 overflow-y-auto'>
      <RouterProvider router={router} />
    </main>
  )
}

export default App
