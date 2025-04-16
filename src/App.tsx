import './App.css'
import LoginPage from './components/Login/LoginPage'
import PeopleListPage from './components/People/Page'
import { Toaster } from './components/ui/sonner'

function App() {

  return (
    <>
      <LoginPage />
      {/* <PeopleListPage /> */}
      <Toaster />
    </>
  )
}

export default App
