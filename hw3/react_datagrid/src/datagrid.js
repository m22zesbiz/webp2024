import * as React from 'react';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import TextField from '@mui/material/TextField';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
  {
    field: 'attractionName',
    headerName: '名稱',
    flex: 1,
  },
  {
    field: 'location',
    headerName: '地點',
    flex: 1,
  },
  {
    field: 'price',
    headerName: '票價',
    flex: 1,
  },
];

export default function DataGridFunc() {
  const { useState, useEffect } = React;
  const [rows, setRows] = useState([]); 
  const [searchText, setSearchText] = useState('');
  const [filteredRows, setFilteredRows] = useState(rows);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => {
    setOpen(false);
  };
  useEffect(() => {
    fetch("https://cloud.culture.tw/frontsite/trans/SearchShowAction.do?method=doFindTypeJ&category=6")
      .then(response => response.json())
      .then(data => {
        const newRows = data.map((attraction, index) => ({
          id: index, 
          attractionName: attraction.title,
          location: attraction.showInfo[0]?.location || '未提供',
          price: attraction.showInfo[0]?.price || '未提供'
        }));
        setRows(newRows);
      })
      .then(() => handleClose())
      .catch(error => console.error('Error fetching attractions:', error));
  }, []);
  useEffect(() => {
    setFilteredRows(
      searchText ? rows.filter(row => 
        row.attractionName.toLowerCase().includes(searchText.toLowerCase())
      ) : rows
    );  
  }, [searchText, rows]);
  return (
    <div>
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Box
        component="form"
        sx={{
          '& > :not(style)': { m: 1, width: '25ch' },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="搜尋..." variant="outlined" onInput={(e) => setSearchText(e.target.value)} />
      </Box>
      <Box sx={{ height: '80vh', width: '100%' }}>
        <DataGrid
          rows={filteredRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: {
                pageSize: 10,
              },
            },
          }}
          pageSizeOptions={[10]}
        // checkboxSelection
        // disableRowSelectionOnClick
        />
      </Box>
    </div>
  );
}