import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import HomeIcon from '@mui/icons-material/Home';
import StarIcon from '@mui/icons-material/Star';
import SettingsIcon from '@mui/icons-material/Settings';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Divider from '@mui/material/Divider';
import Link from 'next/link';


export default function LeftBar() {
  return (
    <>
      <List>
        <ListItem key={'/'} disablePadding>
          <ListItemButton component={Link} href={'/'}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={'Home'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'/'} disablePadding>
          <ListItemButton component={Link} href={'/'}>
            <ListItemIcon>
              <StarIcon />
            </ListItemIcon>
            <ListItemText primary={'Starred'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'/'} disablePadding>
          <ListItemButton component={Link} href={'/'}>
            <ListItemIcon>
              <FileDownloadIcon />
            </ListItemIcon>
            <ListItemText primary={'Download'} />
          </ListItemButton>
        </ListItem>
        <ListItem key={'/'} disablePadding>
          <ListItemButton component={Link} href={'/'}>
            <ListItemIcon>
              <FileUploadIcon />
            </ListItemIcon>
            <ListItemText primary={'Upload'} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ mt: 'auto' }} />
      <List>
        <ListItem key={'Settings'} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={'Settings'} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  )
}
