import { useState, useEffect } from 'react'
import DashboardPage from './pages/dashboard-page'
import MasterLayout from './layouts/master-layout'
import { MasterDataTable } from './components/master-data-table'
import { bankMasterData } from './mock-data/bank-master-data'
import { bankMasterColumns } from './columns/bank-master-cols'
import { clientMasterData } from './mock-data/client-master-data'
import { clientMasterColumns } from './columns/client-master-cols'
import ChangePassword from './components/change-password'
import BankStatement from './components/bank-statement'
import BookStatement from './components/book-statement'
import CreateUser from './components/create-user'
import ReconciledItems from './components/reconciled-items'
import UserManagement from './pages/user-management'
import { AppSidebar } from './components/app-sidebar'
import TopHeader from './components/top-header'
import { SidebarInset, SidebarProvider } from './components/ui/sidebar'
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

    case '#/change-password':
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <TopHeader title="Change Password" breadcrumb={["Home", "Change Password"]} />
            <div className="flex-1 p-6">
              <ChangePassword />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )

    case '#/bank-statement':
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <TopHeader title="Bank Statement" breadcrumb={["Home", "Bank Statement"]} />
            <div className="flex-1 p-6">
              <BankStatement />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )

    case '#/book-statement':
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <TopHeader title="Book Statement" breadcrumb={["Home", "Book Statement"]} />
            <div className="flex-1 p-6">
              <BookStatement />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )

    case '#/create-user':
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <TopHeader title="Create User" breadcrumb={["Home", "Create User"]} />
            <div className="flex-1 p-6">
              <CreateUser />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )

    case '#/reconciled-items':
      return (
        <SidebarProvider>
          <AppSidebar />
          <SidebarInset>
            <TopHeader title="Reconciled Items" breadcrumb={["Home", "Reconciled Items"]} />
            <div className="flex-1 p-6">
              <ReconciledItems bankData={[]} bookData={[]} />
            </div>
          </SidebarInset>
        </SidebarProvider>
      )

    case '#/user-management':
      return <UserManagement />

    default:
      return <DashboardPage />
  }
}

export default App
