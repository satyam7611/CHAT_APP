import SignUp from "./components/SignUp"
import Left from "./Home/Left/Left"
import Logout from "./Home/Left1/Logout"
import Right from "./Home/right/Right"
import Login from "./components/Login"
import { Route,Routes } from "react-router-dom" 
import { useAuth } from "./context/AuthProvider.jsx"
import { Navigate } from "react-router-dom"
import Loading from "./components/Loading.jsx"
import { Toaster } from 'react-hot-toast';

// ... other imports

function App() {
  const {authUser,setAuthUser}=useAuth();
  
  console.log(authUser)
    return (

<>
 <Routes>
  <Route
    path="/"
    element={
      authUser ? (
        <div className="flex h-screen overflow-hidden">
          <Logout setAuthUser={setAuthUser} />
          <Left />
          <Right />
        </div>
      ) : (
        <Navigate to="/login" replace />
      )
    }
  />

  <Route
    path="/login"
    element={authUser ? <Navigate to="/" replace /> : <Login />}
  />

  <Route
    path="/signup"
    element={authUser ? <Navigate to="/" replace /> : <SignUp />}
  />
</Routes>
<Toaster position="top-center" reverseOrder={false} />
</>
   
 
   
  )
}

export default App
