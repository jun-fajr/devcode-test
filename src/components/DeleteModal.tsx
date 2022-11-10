/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { ExclamationMark } from './Icon'
import { Todos } from '../App'

type ModalProps = {
  isOpen: boolean
  setIsOpen: any
  activity: Todos
  onDelete: (id: string) => Promise<void>
}

const DeleteModal: React.FunctionComponent<ModalProps> = ({ isOpen, setIsOpen, activity, onDelete }) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog data-cy='modal-delete' as='div' className='relative z-10' onClose={closeModal}>
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
              <Dialog.Panel className='flex flex-col w-full max-w-[32rem] transform rounded-2xl bg-white text-left align-middle shadow-xl transition-all'>
                <div className='flex flex-col items-center justify-center py-[3.125rem] px-[1.875rem] gap-x-[0.625rem] gap-y-[2.25rem]'>
                  <ExclamationMark />
                  <div className='text-center'>
                    <p className='font-medium'>Apakah yakin ingin menghapus {activity.route}</p>
                    <b>&quot;{activity.title}&quot;</b> ?
                  </div>
                  <div className='flex space-x-4 font-bold'>
                    <button
                      data-cy='modal-delete-cancel-button'
                      className='bg-[#F4F4F4] text-[#4a4a4a] w-[150px] h-[54px] rounded-[45px] flex items-center justify-center cursor-pointer'
                      onClick={closeModal}
                    >
                      <span className='flex items-center gap-x-1 font-medium text-lg'>Batal</span>
                    </button>
                    <button
                      data-cy='modal-delete-confirm-button'
                      onClick={() => onDelete(String(activity.id))}
                      className='bg-[#ED4C5C] w-[150px] h-[54px] rounded-[45px] flex items-center text-white justify-center cursor-pointer'
                    >
                      <span className='flex items-center gap-x-1 font-medium text-lg'>Hapus</span>
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default DeleteModal
