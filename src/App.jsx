import { useState, useEffect } from 'react'
import DashboardPage from './pages/dashboard-page'
import MasterLayout from './layouts/master-layout'
import { MasterDataTable } from './components/master-data-table'
import { bankMasterData } from './mock-data/bank-master-data'
import { bankMasterColumns } from './columns/bank-master-cols'
import { clientMasterData } from './mock-data/client-master-data'
import { clientMasterColumns } from './columns/client-master-cols'
import './index.css'

function useHashRoute() {
  const [route, setRoute] = useState(window.location.hash || '#/')

  useEffect(() => {
    const onHashChange = () => setRoute(window.location.hash || '#/')
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [])

  return route
}

function App() {
  const route = useHashRoute()

  switch (route) {
    case '#/bank-master':
      return (
        <MasterLayout
          title="Bank Master"
          description="Manage and synchronize your bank account records."
          data={bankMasterData}
          columns={bankMasterColumns}
          searchPlaceholder="Search accounts..."
        >
          {({ results }) => (
            <MasterDataTable columns={bankMasterColumns} data={results} />
          )}
        </MasterLayout>
      )

    case '#/client-master':
      return (
        <MasterLayout
          title="Client Master"
          description="Manage and synchronize your client account records."
          data={clientMasterData}
          columns={clientMasterColumns}
          searchPlaceholder="Search clients..."
        >
          {({ results }) => (
            <MasterDataTable columns={clientMasterColumns} data={results} />
          )}
        </MasterLayout>
      )

    default:
      return <DashboardPage />
  }
}

export default App
