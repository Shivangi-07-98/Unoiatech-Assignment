// CompanyDetails.js

import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import './CompanyDetails.scss';

const CompanyDetails = () => {
  const location = useLocation();
  const company_id = location.state.get_ids || {};
console.log(company_id);

  return (
    <div className="company-details">
      <div className="main-content">
        <div className="company-info-up">
          <div className="company-info">
            <div className="company-logo">
              <img src={company_id?.logoUrl} alt={company_id?.logoUrl || 'N/A'} />
            </div>

            <div className="company-description">
              <h2>{company_id?.name || 'N/A'}</h2>
              <p><i className="fas fa-info-circle"> Description</i> <br />{company_id?.description || 'N/A'}</p>
            </div>

            <div className="company-contact">
              <p><i className="fas fa-phone"> Phone </i> <br />{company_id?.phone || 'N/A'}</p>
              <p><i className="fas fa-envelope"> Email </i> <br />{company_id?.email || 'N/A'}</p>

            </div>
          </div>
        </div>


        <div className="lower-content">

          <div className="company-extra-details">
            <h3>Company Details</h3>
            <p><i className="fas fa-globe"> Website</i> <br />{company_id?.website || 'N/A'}</p>
            <p><i className="fas fa-info-circle"> Description</i> <br />{company_id?.description || 'N/A'}</p>
            <p><i className="fas fa-envelope"> Email</i> <br />{company_id?.email || 'N/A'}</p>
            <p><i className="fab fa-facebook"> Facebook</i> <br />{company_id?.facebookUrl || 'N/A'}</p>
            <p><i className="fab fa-instagram"> Instagram</i> <br />{company_id?.instagramUrl || 'N/A'}</p>
            <p><i className="fab fa-twitter"> Twitter</i> <br />{company_id?.twitterUrl || 'N/A'}</p>
            <p><i className="fab fa-linkedin"> LinkedIn</i> <br />{company_id?.linkedinUrl || 'N/A'}</p>
            <p><i className="fas fa-map-marker-alt"> Address</i> <br />{company_id?.address || 'N/A'}</p>
          </div>


          <div className="screenshot-placeholder">
            <h3><i className="fas fa-image"></i> Screenshot of Webpage</h3>
            <div className="screenshot-box">
              {company_id.screenshotUrl && <img src={company_id.screenshotUrl} alt="Screenshot" />}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyDetails;
