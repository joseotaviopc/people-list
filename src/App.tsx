import './App.css'
// import DashboardPage from './components/Dashboard/DashboardPage'
// import LoginPage from './components/Login/LoginPage'
// import PeopleListPage from './components/People/Page'
// import FirstFormPage from './components/FirstFormPage/FirstFormPage'
// import FormStep01VerificationCode from './components/FormStep01VerificationCode/index'
import FormStep02 from './components/FormStep02'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      {/* <DashboardPage />
      <LoginPage />
      <PeopleListPage />
      <FirstFormPage />
      */}
      {/* <FormStep01VerificationCode /> */}
      <FormStep02 /> 
      {/* 
      */}
      <Toaster toastOptions={{ classNames: {error: "!text-destructive"}}}/>
    </>
  )
}

export default App
