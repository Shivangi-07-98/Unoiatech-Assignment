import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import SearchIcon from '@mui/icons-material/Search';
import TextField from '@mui/material/TextField';
import { AppBar, Box, Card, CardContent, InputAdornment, Toolbar, Typography } from '@mui/material';
import InstagramIcon from '@mui/icons-material/Instagram';

const paginationModel = { page: 0, pageSize: 5 };

const CompanyTable = () => {
  const [rows, setRows] = React.useState([]);
  const [selectedRows, setSelectedRows] = React.useState([]);
  const [search, setSearch] = React.useState('');

  const navigate = useNavigate();

  React.useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/companies');
      const data = response.data.map((company) => ({
        id: company._id,
        name: company.name,
        logoUrl: company.logoUrl,
        description: company.description,
        address: company.address,
        phoneNumber: company.phoneNumber,
        email: company.email,
        facebookUrl: company.facebookUrl,
        twitterUrl: company.twitterUrl,
        linkedinUrl: company.linkedinUrl,
        screenshot: company.screenshot,
        instagramUrl: company.instagramUrl,
      }));
      setRows(data);
    } catch (error) {
      console.error('Failed to fetch companies:', error);
    }
  };

  const handleDelete = async () => {
    try {
      const response = await axios.delete('http://localhost:5000/api/companies', {
        data: { ids: selectedRows },
      });
      if (response.status !== 200) {
        throw new Error('Failed to delete rows');
      }
      const remainingRows = rows.filter(row => !selectedRows.includes(row.id));
      setRows(remainingRows);
      setSelectedRows([]);
    } catch (error) {
      console.error('Error deleting rows:', error);
    }
  };

  const handleExport = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/companies/export');
      const csvData = response.data;
      const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.setAttribute('download', 'companies.csv');
      link.click();
    } catch (error) {
      console.error('Error exporting data:', error);
    }
  };


  const columns = [
    {
      field: 'name',
      headerName: 'COMPANY',
      width: 200,
      renderCell: (params) => (
        <div
          style={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
          onClick={() => navigate('/company-details', { state: { get_ids: params.row } })}
        >
          <img
            src={params.row.logoUrl || 'default-logo-url.png'}
            alt={params.value || 'No logo'}
            style={{ width: 24, height: 24, marginRight: 8 }}
          />
          <span style={{ color: 'blue' }}>
            {params.value || 'N/A'}
          </span>
        </div>
      ),
    },
    {
      field: 'socialProfiles',
      headerName: 'SOCIAL PROFILES',
      width: 160,
      renderCell: (params) => (
        <>
          {params.row.facebookUrl && (
            <IconButton size="small" href={params.row.facebookUrl} target="_blank">
              <FacebookIcon />
            </IconButton>
          )}
          {params.row.twitterUrl && (
            <IconButton size="small" href={params.row.twitterUrl} target="_blank">
              <TwitterIcon />
            </IconButton>
          )}
          {params.row.linkedinUrl && (
            <IconButton size="small" href={params.row.linkedinUrl} target="_blank">
              <LinkedInIcon />
            </IconButton>
          )}
           {params.row.instagramUrl && (
            <IconButton size="small" href={params.row.instagramUrl} target="_blank">
              <InstagramIcon />
            </IconButton>
          )}
        </>
      ),
    },
    {
      field: 'description',
      headerName: 'DESCRIPTION',
      width: 400,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'address',
      headerName: 'ADDRESS',
      width: 180,
      renderCell: (params) => params.value || 'N/A',
    },
    {
      field: 'phoneNumber',
      headerName: 'PHONE NO.',
      width: 180,
      renderCell: (params) => (
        <>
          {params.value || 'N/A'}
          <IconButton size="small" onClick={() => navigator.clipboard.writeText(params.value || '')}>
            <ContentCopyIcon />
          </IconButton>
        </>
      ),
    },
    {
      field: 'email',
      headerName: 'EMAIL',
      width: 200,
      renderCell: (params) => (
        <>
          <IconButton size="small">
            <EmailIcon />
          </IconButton>
          <a href={`mailto:${params.value || 'example@example.com'}`} style={{ marginLeft: 8 }}>
            {params.value || 'N/A'}
          </a>
        </>
      ),
    },
  ];

  const handleSearchChange = (e) => {
    console.log(e.target.value)
    setSearch(e.target.value)
  }

  const handlePostFetch = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/scrape', {
        url: search,
      });
      fetchCompanies()
      console.log('API Response:', response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: 'white', marginBottom: '10px' }} elevation={1}>
        <Toolbar>
          <TextField
            variant="outlined"
            sx={{ marginRight: '5px' }}
            placeholder="Enter domain name"
            size="small"
            name='search'
            value={search}
            onChange={handleSearchChange}
            style={{ width: 250 }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
          />
          <Button variant="contained" color="primary" onClick={handlePostFetch}>
            Fetch & Save Details
          </Button>
        </Toolbar>
      </AppBar>
      <Card>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography sx={{ marginRight: '10px' }}>
            </Typography>
            <Box>
              <div>
                <Button variant="outlined" sx={{ marginRight: "10px" }} onClick={handleExport}>
                  Export as CSV
                </Button>
                {selectedRows.length === 1 && (
                  <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete Selected
                  </Button>
                )}
                {selectedRows.length > 1 && (
                  <Button variant="contained" color="error" onClick={handleDelete}>
                    Delete All Selected
                  </Button>
                )}
              </div>
            </Box>
          </Box>
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{ pagination: { paginationModel } }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
            onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
            selectionModel={selectedRows}
            sx={{ border: 0 }}
          />
        </CardContent>
      </Card>
      <Box sx={{ padding: '20px' }}></Box>
    </Box>
  );
};

export default CompanyTable;
