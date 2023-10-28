import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import DashboardIcon from '@mui/icons-material/Dashboard';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Divider from '@mui/material/Divider';

export default function SearchBar() {

  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ backgroundColor: 'background.paper' }}>
        <DashboardIcon sx={{ color: '#444', mr: 2, transform: 'translateY(-2px)' }} />
        <Typography variant="h6" noWrap component="div">
          Semantic Drive
        </Typography>
        <Divider sx={{ height: 28, m: 3 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Drive"
          inputProps={{ 'aria-label': 'search the drive' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
