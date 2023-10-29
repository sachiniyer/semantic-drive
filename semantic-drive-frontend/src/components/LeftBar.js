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
import { uploadFile, downloadFile, deleteFile, getFiles } from '@/app/api/routes'
import { redirect } from "next/navigation";
import { API } from "@/components/Consts"

export default function LeftBar() {
  let [files, setFiles] = useContext(FilesContext);
  let [fileId, _setFileId] = useContext(FileIdContext);
  const fileInputRef = useRef(null);

  const handleCustomButtonClick = () => {
    fileInputRef.current.click();
  };

  function readFileAsync(file, filetype) {
    return new Promise((resolve, reject) => {
      let reader = new FileReader();

      reader.onload = () => {
        resolve(reader.result);
      };

      reader.onerror = reject;

      if (filetype != "text")
        reader.readAsDataURL(file);
      else 
        reader.readAsText(file);  // or reader.readAsDataURL(file) for images/binary files
    });
  }

  const handleFileChange = async (e) => {
    const file = e.target.files[0];



    const filedatas = await readFileAsync(file, file.filetype)

    const res = await fetch("/api/postFile", {
      method: 'PUT',
      headers: {
        name: file.name,
        filetype: file.filetype,
      },
      body: filedatas,
    });


  };


  function homeButton() {
    // setFiles(getFiles())
    console.log(fileId);
  }

  async function downloadButton() {
    // let file = new Blob(downloadFile(fileId))
    // const link = document.createElement('a');
    // link.href = URL.createObjectURL(file.fileData);
    // link.download = file.fileName;
    // link.click();

    let _res = await fetch(`${API}/localfile?fileId=${fileId}`, {
    })


  }

  async function print(file) {
    console.log(await file)
  }

  async function uploadButton() {

    // let file = await window.showOpenFilePicker()
    // let actualFile = await file[0].getFile()
    // let fileData = await actualFile.arrayBuffer()
    // let fileName = actualFile.name
    // console.log(actualFile, fileName)
    // let fileId = uploadFile(fileName, fileData);
    // setFiles(files.push(fileId))

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
