import React from 'react'

const Spinner: React.FunctionComponent = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <div className='w-16 h-16 border-b-2 border-[#16ABF8] rounded-full animate-spin'></div>
    </div>
  )
}

export default Spinner
