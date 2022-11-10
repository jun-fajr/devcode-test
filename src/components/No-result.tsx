/* eslint-disable jsx-a11y/alt-text */
import React from 'react'
import activityEmpty from '../assets/activity-empty-state.svg'
import todoEmpty from '../assets/todo-empty-state.svg'

const NoResult: React.FunctionComponent<{ dashboard?: boolean; tag: string }> = ({ dashboard = false, tag }) => {
  return (
    <div className='pb-[43px] flex mx-auto' data-cy={tag}>
      {dashboard ? <img src={activityEmpty} /> : <img src={todoEmpty} />}
    </div>
  )
}

export default NoResult
