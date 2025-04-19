import './App.css'
import DashboardPage from './components/Dashboard/DashboardPage'
// import FirstFormPage from './components/FirstFormPage/FirstFormPage'
// import LoginPage from './components/Login/LoginPage'
// import PeopleListPage from './components/People/Page'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      <DashboardPage />
      {/* <LoginPage />
      <PeopleListPage />
      <FirstFormPage /> */}
      <Toaster />
    </>
  )
}

export default App
