import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Departments from '../pages/Departments/Departments';
import EditDepartment from '../pages/Departments/EditDepartment';
import AddNewDepartment from '../pages/Departments/AddNewDepartment';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/departments" element={<Departments />} />
        <Route path="/departments/edit/:id" element={<EditDepartment />} />
        <Route path="/departments/add" element={<AddNewDepartment />} />

      </Routes>
    </Router>
  );
}

export default App;
