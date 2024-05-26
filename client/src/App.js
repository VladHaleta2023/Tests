import { Routes, Route } from 'react-router-dom';
import { Login } from './pages/login.jsx';
import { Tests } from './pages/tests.jsx';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/tests" element={<Tests />}/>
    </Routes>
  );
}

export default App;
