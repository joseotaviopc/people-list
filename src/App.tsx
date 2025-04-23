import './App.css'
// import InputDesign from './components/InputDesignPage/InputDesign'
// import InputDesign from './components/InputDesign'
// import FormStep02 from './components/FormStep02'
// import DashboardPage from './components/Dashboard/DashboardPage'
// import FirstFormPage from './components/FirstFormPage/FirstFormPage'
// import LoginPage from './components/Login/LoginPage'
// import PeopleListPage from './components/People/Page'
import FormStep01VerificationCode from './components/FormStep01VerificationCode/index'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      {/* <DashboardPage />
      <LoginPage />
      <PeopleListPage />
      <FirstFormPage />
      */}
      <FormStep01VerificationCode />
      {/* <FormStep02 />  */}
      {/* 
      <InputDesign />
      */}
      <Toaster toastOptions={{ classNames: {error: "!text-destructive"}}}/>
    </>
  )
}

export default App
