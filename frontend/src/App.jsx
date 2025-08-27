import { Route } from "lucide-react"
import DiagnosisForm from "./components/dash"
function App() {
  
  return (
    <>
    <Route path="/" exact component={Homepage} />
    <Route path="/diagnosis" component={DiagnosisForm} />
    </>
  )
}

export default App
