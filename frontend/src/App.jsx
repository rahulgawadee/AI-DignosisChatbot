import { BrowserRouter as Router, Route, Routes } from "react-router-dom"
import DiagnosisForm from "./components/dash"
import Homepage from "./components/Homepage/homepage"
function App() {
  
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/diagnosis" element={<DiagnosisForm />} />
      </Routes>
    </Router>
  )
}

export default App
