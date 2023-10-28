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
import { LayoutContext, FilesContext } from "@/components/Contexts";

export default function HomePage() {
  let [layout, _] = useContext(LayoutContext);
  let [files, setFiles] = useContext(FilesContext);
  let [newId, setNewId] = useState(0);
  let [displayFile, setDisplayFile] = useState(false);
  let [displayFileContent, setDisplayFileContent] = useState(<></>);

  useEffect(() => {
    // fetch('/api/files')
    //   .then(response => response.json())
    //   .then(data => setFiles(data.files));
    setFiles([1, 2, 3, 4]);
  }, []);

  function closeDisplayFile() {
    setDisplayFile(false);
  }

  useEffect(() => {
    if (displayFile == false) {
      setDisplayFileContent(<></>);
    } else {
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
                On this page {newId}
              </Typography>
            </ListItem>
          </List>
        </Drawer>,
      );
    }
  }, [displayFile]);

  function changeDisplayFile(id) {
    setNewId(id);
    setDisplayFile(true);
  }

  function fileContent() {
    if (layout == "grid") {
      return <FileGrid files={files} displayFile={changeDisplayFile} />;
    } else {
      return <FileList files={files} displayFile={changeDisplayFile} />;
    }
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Box>{fileContent()}</Box>
      {displayFileContent}
    </Box>
  );
}
