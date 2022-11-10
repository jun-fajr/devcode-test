/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { Fragment } from 'react'
import { Dialog, Transition, Listbox } from '@headlessui/react'
import { Check, Close } from './Icon'
import { PriorityOptions } from '../routes/Detail'
import { Todos } from '../App'

type SelectedProps = {
  title?: string
  priority?: string
}

type ModalProps = {
  isOpen: boolean
  setIsOpen: any
  priorities: PriorityOptions[]
  createTodo: (title: string, priority: string) => Promise<void>
  editTodo: (id: string, title: string, priority: string) => Promise<void>
  targetData: Todos
  setTargetData: React.Dispatch<React.SetStateAction<Todos>>
}

const Modal: React.FunctionComponent<ModalProps> = ({
  isOpen,
  setIsOpen,
  priorities,
  createTodo,
  editTodo,
  targetData,
  setTargetData
}) => {
  const [selected, setSelected] = React.useState<SelectedProps>({})

  const closeModal = () => {
    setIsOpen(false)
  }

  const option = () => {
    if (targetData.id) {
      editTodo(String(targetData.id), selected.title as string, selected.priority as string).then(() =>
        setTargetData({})
      )
      closeModal()
    } else {
      createTodo(selected.title as string, selected.priority as string).then(() => setTargetData({}))
      closeModal()
    }
  }

  React.useEffect(() => {
    if (targetData.edit) {
      setSelected({ title: targetData.title, priority: targetData.priority })
      return
    }
    setSelected({ title: '', priority: 'very-high' })
  }, [targetData])

  return (
    <Transition appear show={isOpen} as={React.Fragment} data-cy='modal-add'>
      <Dialog as='div' data-cy='modal-add' className='relative z-10' onClose={closeModal}>
        <Transition.Child
          as={React.Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black bg-opacity-25' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full relative items-center justify-center p-4 text-center'>
            <Transition.Child
              as={React.Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel className='flex flex-col w-[830px] transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <div className='flex items-center justify-between border-b p-6'>
                  <Dialog.Title as='h4' className='text-lg font-bold text-gray-800'>
                    Tambah List Item
                  </Dialog.Title>
                  <span className='cursor-pointer' onClick={closeModal}>
                    <Close />
                  </span>
                </div>

                <div className='pt-[38px] pr-[41px] pb-[38px] pl-[30px] relative flex-auto'>
                  <label className='text-xs font-bold text-neutral-600'>NAMA LIST ITEM</label>
                  <div data-cy='modal-add-name-input' className='mt-[9px] mb-[26px]'>
                    <input
                      type='text'
                      name='title'
                      value={selected.title}
                      placeholder='Tambahkan nama activity'
                      onChange={event => setSelected({ ...selected, title: event.currentTarget.value })}
                      className='border rounded h-[52px] w-full py-[0.375rem] px-[0.75rem]'
                    />
                  </div>

                  <label className='text-xs font-bold text-neutral-600'>PRIORTY</label>
                  <div className='mt-[9px]'>
                    <Listbox
                      value={selected.priority}
                      onChange={event => setSelected({ ...selected, priority: event })}
                    >
                      <div className='relative max-w-[205px] mt-1 z-50'>
                        <Listbox.Button
                          className='flex space-x-5 items-center relative w-full cursor-default rounded-lg bg-white py-2 pl-3 pr-10 text-left border focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white h-[52px] focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm'
                          data-cy='modal-add-priority-dropdown'
                        >
                          <div
                            className={`rounded-full w-[14px] h-[14px] ${
                              selected.priority
                                ? priorities[priorities.findIndex(e => e.item === selected.priority)]?.color
                                : ''
                            }`}
                          ></div>
                          <span className='block truncate'>
                            {selected.priority
                              ? priorities[priorities.findIndex(e => e.item === selected.priority)]?.label
                              : ''}
                          </span>
                        </Listbox.Button>
                        <Transition
                          as={Fragment}
                          leave='transition ease-in duration-100'
                          leaveFrom='opacity-100'
                          leaveTo='opacity-0'
                        >
                          <Listbox.Options className='absolute mt-1 max-h-60 w-full rounded-md bg-white py-1 divide-y text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-50'>
                            {priorities.map(priority => (
                              <Listbox.Option
                                key={priority.item}
                                data-cy='modal-add-priority-item'
                                className={({ active }) =>
                                  `relative cursor-pointer select-none py-2 pl-[17px] pr-4 ${
                                    active ? 'bg-blue-100' : 'text-gray-900'
                                  }`
                                }
                                value={priority.item}
                              >
                                {({ selected: selectedActive }) => (
                                  <>
                                    <div className='flex items-center'>
                                      <span className={`rounded-full w-[14px] h-[14px] ${priority.color}`}></span>
                                      <span
                                        className={`block truncate ml-5 ${
                                          selectedActive ? 'font-medium' : 'font-normal'
                                        }`}
                                      >
                                        {priority?.label}
                                      </span>
                                    </div>
                                    {priority.item === selected.priority && (
                                      <span className='absolute inset-y-0 right-3 flex items-center pl-3'>
                                        <Check />
                                      </span>
                                    )}
                                  </>
                                )}
                              </Listbox.Option>
                            ))}
                          </Listbox.Options>
                        </Transition>
                      </div>
                    </Listbox>
                  </div>
                </div>

                <div className='flex border-t py-[15px] px-[40px]'>
                  <button
                    onClick={() => option()}
                    data-cy='modal-add-save-button'
                    disabled={!selected.title}
                    className='bg-[#7fc9fa] ml-auto w-[159px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer disabled:cursor-not-allowed'
                  >
                    <span className='flex items-center gap-x-1 font-medium text-lg'>Simpan</span>
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Modal
