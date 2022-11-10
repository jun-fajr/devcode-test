/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, Transition } from '@headlessui/react'
import React from 'react'
import { Info } from './Icon'

type ModalProps = {
  isOpen: boolean
  setIsOpen: any
}

const Toast: React.FunctionComponent<ModalProps> = ({ setIsOpen, isOpen }) => {
  const closeModal = () => {
    setIsOpen(false)
  }

  return (
    <Transition appear show={isOpen} as={React.Fragment}>
      <Dialog data-cy='modal-information' as='div' className='relative z-10' onClose={closeModal}>
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
                <div className='flex items-center py-[1.25rem] px-[1.875rem] gap-x-[0.625rem]'>
                  <Info />
                  <div className='text-center'>Item berhasil dihapus</div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export default Toast
