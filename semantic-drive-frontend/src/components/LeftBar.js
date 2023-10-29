"use client"
import { useContext } from "react";
import { FileIdContext } from "@/components/Contexts";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SettingsIcon from "@mui/icons-material/Settings";
import FileUploadIcon from "@mui/icons-material/FileUpload";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import DeleteIcon from '@mui/icons-material/Delete'
import Divider from "@mui/material/Divider";

export default function LeftBar() {
  let [fileId, _] = useContext(FileIdContext);
  function homeButton() {
    console.log(fileId)
  }
  function downloadButton() {
    console.log(fileId)
  }
  function uploadButton() {
    console.log(fileId)
  }
  function deleteButton() {
    console.log(fileId)
  }
  return (
    <>
      <List>
        <ListItem key={"home"} disablePadding>
          <ListItemButton onClick={homeButton}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary={"Home"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"download"} disablePadding>
          <ListItemButton onClick={downloadButton}>
            <ListItemIcon>
              <FileDownloadIcon />
            </ListItemIcon>
            <ListItemText primary={"Download"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"upload"} disablePadding>
          <ListItemButton onClick={uploadButton}>
            <ListItemIcon>
              <FileUploadIcon />
            </ListItemIcon>
            <ListItemText primary={"Upload"} />
          </ListItemButton>
        </ListItem>
        <ListItem key={"delete"} disablePadding>
          <ListItemButton onClick={deleteButton}>
            <ListItemIcon>
              <DeleteIcon />
            </ListItemIcon>
            <ListItemText primary={"Delete"} />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider sx={{ mt: "auto" }} />
      <List>
        <ListItem key={"Settings"} disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <SettingsIcon />
            </ListItemIcon>
            <ListItemText primary={"Settings"} />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
}
