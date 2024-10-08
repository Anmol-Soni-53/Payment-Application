import {BrowserRouter, Route, Routes} from "react-router-dom"
import Dashboard from "./pages/Dashboard"
import Signup from "./pages/Signup"
import Signin from "./pages/Signin"
import Send from "./pages/Send"
function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/dashboard" element={<Dashboard/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin/>} />
          <Route path="/send" element={<Send/>} />
        </Routes>
      </BrowserRouter>
      
    </>
  )
}

export default App
