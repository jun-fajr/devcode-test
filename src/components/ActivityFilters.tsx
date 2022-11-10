import React from 'react'
import { Filter } from '../routes/Detail'
import { AZ, Newest, Oldest, Unfinished, ZA } from './Icon'

type Filters = {
  label: Filter
  icon: React.ReactNode
}[]

export const ActivityFilters: Filters = [
  {
    label: 'Terbaru',
    icon: <Newest />
  },
  {
    label: 'Terlama',
    icon: <Oldest />
  },
  {
    label: 'A - Z',
    icon: <AZ />
  },
  {
    label: 'Z - A',
    icon: <ZA />
  },
  {
    label: 'Belum selesai',
    icon: <Unfinished />
  }
]
