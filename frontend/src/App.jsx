import './app.css'
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import Landing from "./components/Landing/Landing.jsx"
import BackOffice from "./components/BackOffice/BackOffice.jsx"
import NotFound from "./components/NotFound.jsx"



export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/landing" element={<Landing />} />
        <Route path="/backoffice" element={<BackOffice />} />
        <Route path="/" element={<Navigate to="/backoffice"/>} />
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  )
}