import { clsx } from 'clsx'
import React from 'react'

import 'react-edit-text/dist/index.css'

import { Badge } from './Badge'
import { Edit, Trash } from './Icon'

import { Todos } from '../App'
import { API_ENDPOINT } from '../Config'
import type { TodoItems } from '../routes/Detail'

interface ActivityItem {
  item: TodoItems
  setOnDelete: React.Dispatch<React.SetStateAction<boolean>>
  setTargetData: React.Dispatch<React.SetStateAction<Todos>>
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
  fetchTodos: () => Promise<void>
}

const ActivityItem: React.FunctionComponent<ActivityItem> = ({
  item,
  setOnDelete,
  setTargetData,
  setOpenModal,
  fetchTodos
}) => {
  const [checked, setChecked] = React.useState<boolean>(item.is_active === 1 ? false : true)

  const handleDelete = () => {
    setTargetData({ id: item.id, title: item.title, route: 'list_item' })
    setOnDelete(true)
  }

  const handleEdit = () => {
    setTargetData({ id: item.id, title: item.title, priority: item.priority, edit: true })
    setOpenModal(true)
  }

  const rootBadge = clsx('rounded-full w-3 h-3', {
    [Badge['very-low']]: item.priority === 'very-low',
    [Badge.low]: item.priority === 'low',
    [Badge.normal]: item.priority === 'normal',
    [Badge.high]: item.priority === 'high',
    [Badge['very-high']]: item.priority === 'very-high'
  })

  return (
    <>
      <div className='flex justify-between bg-white rounded-xl shadow p-7'>
        <div className='flex items-center space-x-3'>
          <input
            className='h-6 w-6 flex items-center justify-center mr-5 border border-gray-100'
            type='checkbox'
            defaultChecked={checked}
            value={item.id}
            data-cy='todo-item-checkbox'
            onChange={async event => {
              setChecked(!checked)
              await fetch(`${API_ENDPOINT}/todo-items/${event.target.value}`, {
                method: 'PATCH',
                headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  is_active: item.is_active === 1 ? false : true
                })
              }).then(() => fetchTodos())
            }}
          />
          <span aria-label={item.priority} className={rootBadge}></span>
          <h1 className={clsx(checked && 'line-through', 'text-lg')} data-cy='todo-item-title'>
            {item.title}
          </h1>
          <span onClick={handleEdit}>
            <Edit />
          </span>
        </div>
        <button data-cy='todo-item-delete-button' className='cursor-pointer' onClick={handleDelete}>
          <Trash />
        </button>
      </div>
    </>
  )
}

export default ActivityItem
