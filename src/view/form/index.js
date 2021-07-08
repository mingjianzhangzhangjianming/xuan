import { lazy } from 'react'

export const BasicForm = lazy(() => import('@/view/form/basic'))
export const AdvancForm = lazy(() => import('@/view/form/advanced'))
export const StepForm = lazy(() => import('@/view/form/step'))
