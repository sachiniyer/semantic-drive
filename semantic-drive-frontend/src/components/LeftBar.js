"use client"
import { useContext, useRef, useState } from "react";
import { FileIdContext, FilesContext } from "@/components/Contexts";
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
import { redirect } from "next/navigation";
import { API } from "@/components/Consts"

export default function LeftBar() {
  let [files, setFiles] = useContext(FilesContext);
  let [fileId, _setFileId] = useContext(FileIdContext);
  const fileInputRef = useRef(null);

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {

  };


  function homeButton() {
  }

  async function downloadButton() {
  }

  async function uploadButton() {
    handleCustomButtonClick()
  }

  function deleteButton() {
    deleteFile(fileId)
    setFiles(files.filter((f) => f != fileId))
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

        <a href={`${API}/localfile?fileId=${fileId}`} style={{ textDecoration: "none", color: "inherit" }} target="_blank">
          <ListItem key={"download"} disablePadding>
            <ListItemButton onClick={downloadButton}>
              <ListItemIcon>
                <FileDownloadIcon />
              </ListItemIcon>
              <ListItemText primary={"Download"} />
            </ListItemButton>
          </ListItem>
        </a>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: 'none' }}
          onChange={handleFileChange}
        />
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
