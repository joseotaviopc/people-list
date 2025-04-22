import './App.css'
// import DashboardPage from './components/Dashboard/DashboardPage'
// import FirstFormPage from './components/FirstFormPage/FirstFormPage'
// import LoginPage from './components/Login/LoginPage'
// import PeopleListPage from './components/People/Page'
import { Toaster } from './components/ui/sonner'
import VerificationCodeInput from './components/VerificationCodePage/VerificationCodeInput'

function App() {

  return (
    <>
      {/* <DashboardPage />
      <LoginPage />
      <PeopleListPage />
      <FirstFormPage /> */}
      <VerificationCodeInput />
      <Toaster />
    </>
  )
}

export default App
