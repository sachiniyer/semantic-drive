"use client"
import { useContext, useRef } from "react";
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
import { API, IMAGE_TYPES, AUDIO_TYPES, VIDEO_TYPES } from "@/components/Consts"

export default function LeftBar() {
  let [files, setFiles] = useContext(FilesContext);
  let [fileId, _setFileId] = useContext(FileIdContext);
  const fileInputRef = useRef(null);

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = async (e) => {
    let fileName = e.target.files[0].name;
    let uploadTime = new Date().toISOString();
    let file = e.target.files[0];
    let extension = fileName.split('.').pop();
    let fileType = "text";
    if (IMAGE_TYPES.includes(extension)) {
      fileType = "image"
    }
    else if (AUDIO_TYPES.includes(extension)) {
      fileType = "audio"
    }
    else if (VIDEO_TYPES.includes(extension)) {
      fileType = "video"
    }
    let formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", fileName);
    formData.append("fileType", fileType);
    formData.append("uploadTime", uploadTime);
    fetch(`${API}/file`, {
      method: 'POST',
      body: formData
    }).then(response => response.json())
      .then(data => {
        let fileId = data.fileId;
        setFiles([...files, fileId])
      });
  };


  function homeButton() {
    fetch(`${API}/files`)
      .then(response => response.json())
      .then(data => {
        setFiles(data)
      });
  }

  async function uploadButton() {
    handleCustomButtonClick()
  }

  function deleteButton() {
    let formData = new FormData();
    formData.append("fileId", fileId);
    fetch(`${API}/file`, {
      method: 'DELETE',
      body: formData
    });
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

        <a href={`${API}/filedata?fileId=${fileId}`} style={{ textDecoration: "none", color: "inherit" }} target="_blank">
          <ListItem key={"download"} disablePadding>
            <ListItemButton>
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
