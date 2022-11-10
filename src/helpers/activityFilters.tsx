import React from 'react'
import { AZ, Newest, Oldest, Unfinished, ZA } from '../components/Icon'
import { Filter } from '../routes/Detail'

type Filters = {
  label: Filter
  icon: React.ReactNode
}[]

export const activityFilters: Filters = [
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
