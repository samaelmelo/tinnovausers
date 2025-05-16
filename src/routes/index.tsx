import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Register } from '../pages/Register';
import { List } from '../pages/List';

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/list" element={<List />} />
      </Routes>
    </Router>
  );
};
