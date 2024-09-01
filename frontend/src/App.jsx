// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';

import CompanyTable from './components/CompanyTable/CompanyTable';
import CompanyDetails from './components/CompanyDetails/CompanyDetails';
import PageNotFound from './components/PageNotFound/PageNotFound';

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<CompanyTable />} />
          <Route path="/company-table" element={<CompanyTable />} />
          <Route path="/company-details" element={<CompanyDetails />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
