import { Route, Routes } from "react-router-dom";

import SignIn from "./pages/SignIn";
import SignUp from "./pages/Signup";
import AdminDetails from "./pages/admin";
import ManageAdmin from "./pages/admin/ManageAdmin";
import ReadOnly from "./pages/ReadOnly";
import StudentDetails from "./pages/students";
import ProtectedAdminRoute from "./components/ProtectedRoutes";


function App() {

  return (
    <>

    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/> 
      <Route path="/admin-dashboard"  element={<ProtectedAdminRoute children={<AdminDetails />} />}/>
      <Route path="/admin-dashobard/:id" element={<ProtectedAdminRoute children={<ManageAdmin/>}/>}/>
      <Route path="/read-only/:id" element={<ReadOnly/>}/>
      <Route path="/student-details" element={<StudentDetails/>}/>
    </Routes>

    
</>  )
}

export default App
