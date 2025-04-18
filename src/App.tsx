import './App.css'
import DashboardPage from './components/Dashboard/DashboardPage'
// import LoginPage from './components/Login/LoginPage'
// import PeopleListPage from './components/People/Page'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      {/* <LoginPage />
      <PeopleListPage /> */}
      <DashboardPage />
      <Toaster />
    </>
  )
}

export default App
