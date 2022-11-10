import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Trash } from './Icon'
import type { Todos } from '../App'

type Props = {
  todo: Todos | undefined
  setTodo: React.Dispatch<React.SetStateAction<Todos>>
  setOnDelete: React.Dispatch<React.SetStateAction<boolean>>
}

const TodoItem: React.FunctionComponent<Props> = ({ todo, setTodo, setOnDelete }) => {
  const nav = useNavigate()

  if (todo) {
    const handleRoute = (evt: React.MouseEvent) => {
      nav(`details/${todo.id}`)
      evt.stopPropagation()
    }

    const handleDelete = (evt: React.MouseEvent) => {
      setTodo({ title: todo.title, id: todo.id, route: 'activity' })
      setOnDelete(true)
      evt.stopPropagation()
    }

    const convertDate = new Date(todo.created_at as string)
    return (
      <li
        data-cy='activity-item'
        className='p-[1.75rem] flex flex-col h-full w-full rounded-xl bg-white shadow-lg aspect-square cursor-pointer'
        key={todo.id}
        onClick={handleRoute}
      >
        <h4 data-cy='activity-item-title' className='font-bold text-xl'>
          {todo.title}
        </h4>
        <div className='mt-auto flex justify-between'>
          <p
            data-cy='activity-item-date'
            className='text-sm text-[#888888]'
          >{`${convertDate.getDate()} ${convertDate.toLocaleString('default', {
            month: 'long',
            year: 'numeric'
          })}`}</p>
          <button data-cy='activity-item-delete-button' onClick={handleDelete}>
            <Trash />
          </button>
        </div>
      </li>
    )
  }
  return null
}

export default TodoItem
