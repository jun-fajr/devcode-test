import React from 'react'
import { useParams } from 'react-router-dom'
import 'react-edit-text/dist/index.css'

import { Todos } from '../App'
import ActivityItem from '../components/ActivityItem'
import NoResult from '../components/No-result'
import { API_ENDPOINT } from '../Config'
import DeleteModal from '../components/DeleteModal'
import Modal from '../components/Modal'
import Toast from '../components/Toast'
import Spinner from '../components/Spinner'
import Navigation from '../components/Navigation'
import { priorityBadge } from '../helpers/badge'

export type PriorityOptions = {
  id: number
  item: string
  label: string
  color: string
}

export type TodoItems = {
  id: number
  title: string
  activity_group_id?: number
  is_active: number
  priority?: 'very-low' | 'low' | 'normal' | 'high' | 'very-high' | string
}

export type Filter = 'Terbaru' | 'Terlama' | 'A - Z' | 'Z - A' | 'Belum selesai'

export interface TodoItem extends Todos {
  todo_items: TodoItems[]
}

const Detail = () => {
  const { id } = useParams()
  const [todos, setTodos] = React.useState<TodoItem>()
  const [targetData, setTargetData] = React.useState<Todos>({})
  const [isLoading, setIsLoading] = React.useState<boolean>(false)
  const [openModal, setOpenModal] = React.useState<boolean>(false)
  const [filter, setFilter] = React.useState<Filter>('Terbaru')
  const [onDelete, setOnDelete] = React.useState<boolean>(false)
  const [indicator, setIndicator] = React.useState<boolean>(false)

  const fetchTodos = async () => {
    setIsLoading(true)
    await fetch(`${API_ENDPOINT}/activity-groups/${id}`)
      .then(res => res.json())
      .then(data => setTodos(data))
  }

  const createTodo = async (title: string, priority: string) => {
    await fetch(`${API_ENDPOINT}/todo-items`, {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        activity_group_id: id,
        priority: priority
      })
    })
      .then(response => response.json())
      .then(async () => {
        await fetchTodos()
        setOpenModal(false)
      })
    setTargetData({})
  }

  const deleteTodo = async (id: string) => {
    await fetch(`${API_ENDPOINT}/todo-items/${id}`, { method: 'DELETE' })
    await fetchTodos()
    setIndicator(true)
    setOnDelete(false)
    setTargetData({})
  }

  const editTodo = async (id: string, title: string, priority: string) => {
    await fetch(`${API_ENDPOINT}/todo-items/${id}`, {
      method: 'PATCH',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title: title,
        priority: priority
      })
    })
    await fetchTodos()
    setTargetData({})
  }

  const filteredTodos = React.useMemo(() => {
    let _todos = todos?.todo_items

    if (filter === 'Terbaru') {
      _todos = _todos?.sort((a, b) => b.id - a.id)
    }
    if (filter === 'Terlama') {
      _todos = _todos?.sort((a, b) => a.id - b.id)
    }
    if (filter === 'A - Z') {
      _todos = _todos?.sort((a, b) => a.title.localeCompare(b.title))
    }
    if (filter === 'Z - A') {
      _todos = _todos?.sort((a, b) => b.title.localeCompare(a.title))
    }
    if (filter === 'Belum selesai') {
      _todos = _todos?.sort((a, b) => b.is_active - a.is_active)
    }

    return _todos
  }, [filter, todos])

  const PRIORITY: PriorityOptions[] = [
    { id: 0, item: 'very-low', label: 'Very Low', color: priorityBadge['very-low'] },
    { id: 1, item: 'low', label: 'Low', color: priorityBadge.low },
    { id: 2, item: 'normal', label: 'Normal', color: priorityBadge.normal },
    { id: 3, item: 'high', label: 'High', color: priorityBadge.high },
    { id: 4, item: 'very-high', label: 'Very High', color: priorityBadge['very-high'] }
  ]

  React.useEffect(() => {
    fetchTodos()
  }, [])

  if (!todos?.id && isLoading) {
    return <Spinner />
  }

  if (id && todos) {
    return (
      <React.Fragment>
        <Navigation
          isActivity
          fetchTodos={fetchTodos}
          filter={filter}
          setFilter={setFilter}
          item={todos}
          setOpenModal={setOpenModal}
        />
        {todos?.todo_items?.length == 0 && <NoResult dashboard={false} tag='todo-empty-state' />}
        {todos?.todo_items?.length > 0 && (
          <ul className='flex flex-col gap-y-[10px] pb-[43px]'>
            {filteredTodos?.map(item => {
              return (
                <ActivityItem
                  key={item.id}
                  item={item}
                  setTargetData={setTargetData}
                  setOnDelete={setOnDelete}
                  setOpenModal={setOpenModal}
                  fetchTodos={fetchTodos}
                />
              )
            })}
          </ul>
        )}
        <Modal
          isOpen={openModal}
          setIsOpen={setOpenModal}
          priorities={PRIORITY}
          createTodo={createTodo}
          editTodo={editTodo}
          targetData={targetData}
          setTargetData={setTargetData}
        />
        <DeleteModal activity={targetData} onDelete={deleteTodo} setIsOpen={setOnDelete} isOpen={onDelete} />
        <Toast isOpen={indicator} setIsOpen={setIndicator} />
      </React.Fragment>
    )
  }

  return null
}

export default Detail
