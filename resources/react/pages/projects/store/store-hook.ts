import {TypedUseSelectorHook, useSelector, useDispatch} from 'react-redux'
import type {AppDispatch, RootState} from './projects-store'

//Hook
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector 