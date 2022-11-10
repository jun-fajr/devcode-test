/* eslint-disable @typescript-eslint/no-unused-expressions */
import { Listbox, Transition } from '@headlessui/react'
import React, { Fragment } from 'react'
import { Link } from 'react-router-dom'
import { Filter, TodoItem } from '../routes/Detail'
import { activityFilters } from '../helpers/activityFilters'
import { Check, ChevronLeft, Edit, Plus, Sort } from './Icon'
import { API_ENDPOINT } from '../Config'

type Props = {
  item: TodoItem
  filter: Filter
  setFilter: React.Dispatch<React.SetStateAction<Filter>>
  isActivity?: boolean
  fetchTodos: () => Promise<void>
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>
}

const Navigation: React.FunctionComponent<Props> = ({
  item,
  filter,
  setFilter,
  isActivity,
  fetchTodos,
  setOpenModal
}) => {
  const [title, setTitle] = React.useState<string>((item.title as string) || 'New Activity')
  const [onEditTitle, setOnEditTitle] = React.useState<boolean>(false)

  const onFocus = () => {
    setOnEditTitle(!onEditTitle)
    setTimeout(() => document.getElementById('item-title')?.focus(), 1)
    return
  }

  const handleEditTitle = async (event?: React.KeyboardEvent) => {
    if (event) event.preventDefault()

    await fetch(`${API_ENDPOINT}/activity-groups/${item.id}`, {
      method: 'PATCH',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: title })
    })

    setOnEditTitle(false)
    await fetchTodos()
    return
  }

  React.useEffect(() => {
    if (isActivity) {
      document.title = (item.title as string) || 'Activity'
    } else {
      document.title = 'Dashboard'
    }
  }, [])

  return (
    <header className='flex items-center justify-between mt-[43px] pb-[55px]'>
      <div className='flex items-center'>
        <Link data-cy='todo-back-button' to='/' className='mr-5'>
          <ChevronLeft />
        </Link>
        {onEditTitle ? (
          <input
            type='text'
            id='item-title'
            className='bg-transparent border-b-2 outline-none font-bold text-4xl ml-4 w-full'
            value={title}
            onChange={event => setTitle(event.target.value)}
            onBlur={handleEditTitle as any}
            onKeyDown={event => {
              event.key === 'Enter' ? handleEditTitle(event) : ''
            }}
          />
        ) : (
          <h1
            onClick={() => onFocus()}
            className='text-4xl text-neutral-800 font-bold ml-4 cursor-pointer'
            data-cy='todo-title'
          >
            {title}
          </h1>
        )}

        <button onClick={() => onFocus()} data-cy='todo-title-edit-button' className='ml-4'>
          <Edit />
        </button>
      </div>
      <div className='flex gap-x-4'>
        {item?.todo_items?.length > 0 && (
          <Listbox value={filter} onChange={event => setFilter(event)}>
            <div className='relative max-w-[205px] mt-1 z-10'>
              <Listbox.Button data-cy='todo-sort-button'>
                <Sort />
              </Listbox.Button>
              <Transition
                as={Fragment}
                leave='transition ease-in duration-100'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
              >
                <Listbox.Options className='absolute w-[15rem] flex flex-col right-0 mt-1 rounded-md bg-white divide-y text-base shadow-lg ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50'>
                  {activityFilters.map(item => {
                    return (
                      <Listbox.Option
                        value={item.label}
                        key={item.label}
                        data-cy='sort-selection'
                        onClick={() => setFilter(item.label)}
                      >
                        {({ selected }) => (
                          <div className='flex justify-between gap-x-4 items-center p-[0.875rem] hover:bg-slate-50 cursor-pointer'>
                            <div className='flex gap-x-4 items-center'>
                              {item.icon} <span className='text-base'>{item.label}</span>
                            </div>
                            {selected && <Check />}
                          </div>
                        )}
                      </Listbox.Option>
                    )
                  })}
                </Listbox.Options>
              </Transition>
            </div>
          </Listbox>
        )}
        <button
          onClick={() => setOpenModal(true)}
          data-cy='todo-add-button'
          className='bg-[#16ABF8] w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer'
        >
          <span className='flex items-center gap-x-1 font-medium text-lg'>
            <Plus /> Tambah
          </span>
        </button>
      </div>
    </header>
  )
}

export default Navigation
