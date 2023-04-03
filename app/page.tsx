'use client'
import { observer } from 'mobx-react-lite'
import { AppHeader } from './components/AppHeader'
import { TableList } from './components/TableList'

export default observer(function Page() {
  return (
    <>
      <AppHeader />
      <div className="container mx-auto mt-6">
        <TableList />
      </div>
    </>
  )
})
