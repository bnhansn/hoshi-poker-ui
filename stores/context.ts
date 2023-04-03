import { createContext, useContext } from 'react'
import { RootStore } from '@/stores/root'

export const StoreContext = createContext<RootStore>(new RootStore())

export const useStore = () => useContext(StoreContext)
