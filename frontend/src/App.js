import PropertyForm from "./components/forms/PropertyForm";
import Home from './screens/Home';
import Auth from "./screens/auth";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PropertyDetails from "./screens/PropertyDetails";
import Properties from "./screens/Report/Properties";
import Finances from "./screens/Report/Finances";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="" element={<Home/>}/>
        <Route path="get-access" element={<Auth/>}/>
        <Route path="add-new-property" element={<PropertyForm/>}/>
        <Route path="property/:propertyid" element={<PropertyDetails/>}/>
        <Route path="report/property" element={<Properties/>}/>
        <Route path="report/finance" element={<Finances/>}/>
      </Routes>
    </Router>
  );
}

export default App;
