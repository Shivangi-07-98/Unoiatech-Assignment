import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UrlForm from './components/UrlForm/UrlForm';
import DisplayData from './components/DisplayData/DisplayData';
import CompanyList from './components/CompanyList/CompanyList';  
import CompanyDetails from './components/CompanyDetails/CompanyDetails';  
import PageNotFound from './components/PageNotFound/PageNotFound';

const Routing = () => {
  return (
    <Router>
      <Routes>
        <Route path="/url-form" element={<UrlForm />} />
        <Route path="/display-data" element={<DisplayData />} />
        <Route path="/company-list" element={<CompanyList />} />  
        <Route path="/company-details" element={<CompanyDetails />} /> 
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </Router>
  );
};

export default Routing;
