import './App.css'
// import InputDesign from './components/InputDesign'
// import InputDesign from './components/InputDesignPage/InputDesign'
// import MainForm from './components/MainFormPage/MainForm'
// import DashboardPage from './components/Dashboard/DashboardPage'
// import FirstFormPage from './components/FirstFormPage/FirstFormPage'
// import LoginPage from './components/Login/LoginPage'
// import PeopleListPage from './components/People/Page'
import { Toaster } from './components/ui/sonner'
import FormStep01VerificationCode from './components/FormStep01VerificationCode/index'

function App() {

  return (
    <>
      {/* <DashboardPage />
      <LoginPage />
      <PeopleListPage />
      <FirstFormPage />
      */}
      <FormStep01VerificationCode />
      {/* <MainForm /> 
      <InputDesign />
      */}
      <Toaster toastOptions={{ classNames: {error: "!text-destructive"}}}/>
    </>
  )
}

export default App
