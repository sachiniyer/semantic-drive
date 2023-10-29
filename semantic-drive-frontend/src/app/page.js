"use client";
import * as React from "react";
import { useContext, useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Drawer from "@mui/material/Drawer";
import Typography from "@mui/material/Typography";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import FileGrid from "@/components/FileGrid";
import FileList from "@/components/FileList";
import { LayoutContext, FilesContext, FileIdContext } from "@/components/Contexts";
import { API } from "@/components/Consts"

export default function HomePage() {
  let [layout, _setLayout] = useContext(LayoutContext);
  let [_files, setFiles] = useContext(FilesContext);
  let [_fileId, setFileId] = useContext(FileIdContext);
  let [newId, setNewId] = useState(0);
  let [displayFile, setDisplayFile] = useState(false);
  let [displayFileContent, setDisplayFileContent] = useState(<></>);

  useEffect(() => {
    fetch(`${API}/files`)
      .then(response => response.json())
      .then(data => {
        setFiles(data)
      });
  }, []);

  function closeDisplayFile() {
    setDisplayFile(false);
  }

  useEffect(() => {
    if (displayFile == false) {
      setDisplayFileContent(<></>);
      setFileId(0);
    } else {
      setFileId(newId);
      const formData = new FormData();
      formData.append("fileId", newId);
      fetch(`${API}/file`, {
        method: "POST",
        body: formData
      }).then(response => response.json())
        .then(data => {
          setDisplayFileContent(
            <Drawer
              sx={{
                width: 320,
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                  width: 320,
                  boxSizing: "border-box",
                  top: ["48px", "56px", "64px"],
                  height: "auto",
                  bottom: 0,
                },
              }}
              elevation={0}
              open={true}
              variant="permanent"
              anchor="right"
            >
              <Button onClick={closeDisplayFile}>Close</Button>
              <List sx={{ px: 2 }}>
                <ListItem disablePadding>
                  <Typography variant="overline" sx={{ fontWeight: 500 }}>
                    On this page {data.fileName}
                  </Typography>
                </ListItem>
              </List>
            </Drawer>,

          )
        });
    }
  }, [newId, displayFile]);

  function changeDisplayFile(id) {
    setNewId(id);
    setDisplayFile(true);
  }

  function fileContent() {
    if (layout == "grid") {
      return <FileGrid displayFile={changeDisplayFile} />;
    } else {
      return <FileList displayFile={changeDisplayFile} />;
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box>{fileContent()}</Box>
      {displayFileContent}
    </Box>
  );
}
