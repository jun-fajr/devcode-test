import React from 'react'
import { API_ENDPOINT } from '../Config'

import { Todos } from '../App'
import { Plus } from '../components/Icon'
import TodoItem from '../components/TodoItem'
import Toast from '../components/Toast'
import DeleteModal from '../components/DeleteModal'
import NoResult from '../components/No-result'
import Spinner from '../components/Spinner'

const Dashboard: React.FunctionComponent = () => {
  const [todos, setTodos] = React.useState<Todos[]>([])
  const [todo, setTodo] = React.useState<Todos>({})
  const [isRequested, setIsRequested] = React.useState<boolean>(true)
  const [showInfo, setShowInfo] = React.useState<boolean>(false)
  const [onDelete, setOnDelete] = React.useState<boolean>(false)
  const [indicator, setIndicator] = React.useState<boolean>(false)

  const getActivities = async () => {
    const response = await fetch(`${API_ENDPOINT}/activity-groups?email=jun.fajr@gmail.com`)
    const { data } = await response.json()
    setTodos(data)
    setIsRequested(false)
  }

  const addActivity = async () => {
    await fetch(`${API_ENDPOINT}/activity-groups/`, {
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      method: 'POST',
      body: JSON.stringify({ title: 'New Activity', email: 'jun.fajr@gmail.com' })
    })
    setIndicator(!indicator)
  }

  const deleteActivity = async (id: string) => {
    await fetch(`${API_ENDPOINT}/activity-groups/${id}`, { method: 'DELETE' })
    setIndicator(true)
    setTodos(todos.filter(todo => todo.id !== Number(id)))
    setOnDelete(false)
    setShowInfo(true)
  }

  React.useEffect(() => {
    getActivities()
  }, [indicator])

  if (isRequested) {
    return <Spinner />
  }

  return (
    <div>
      <header className='flex items-center justify-between mt-[43px] pb-[55px]'>
        <h2 data-cy='activity-title' className='text-4xl font-bold'>
          Activity
        </h2>
        <button
          data-cy='activity-add-button'
          onClick={addActivity}
          className='bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer'
        >
          <span className='flex items-center gap-x-1 font-medium text-lg'>
            <Plus /> Tambah
          </span>
        </button>
      </header>
      {todos.length == 0 ? (
        <NoResult dashboard tag='activity-empty-state' />
      ) : (
        <ul className='pb-[43px] grid grid-cols-4 gap-5'>
          {todos.map(item => (
            <TodoItem key={item.id} todo={item} setTodo={setTodo} setOnDelete={setOnDelete} />
          ))}
        </ul>
      )}
      <DeleteModal setIsOpen={setOnDelete} isOpen={onDelete} activity={todo} onDelete={deleteActivity} />
      <Toast isOpen={showInfo} setIsOpen={setShowInfo} />
    </div>
  )
}

export default Dashboard
