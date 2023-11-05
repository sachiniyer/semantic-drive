"use client";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import DashboardIcon from "@mui/icons-material/Dashboard";
import Typography from "@mui/material/Typography";
import InputBase from "@mui/material/InputBase";
import IconButton from "@mui/material/IconButton";
import SearchIcon from "@mui/icons-material/Search";
import ReorderIcon from "@mui/icons-material/Reorder";
import ViewModuleIcon from "@mui/icons-material/ViewModule";
import Divider from "@mui/material/Divider";
import { LayoutContext, FilesContext } from "@/components/Contexts";
import { useContext } from "react";
import { API } from "@/components/Consts";

export default function SearchBar({ drawerWidth }) {
  let [layout, setLayout] = useContext(LayoutContext);
  let [_, setFiles] = useContext(FilesContext);

  function changeOrderType() {
    if (layout == "grid") {
      setLayout("list");
      console.log(layout);
    } else {
      setLayout("grid");
    }
  }

  async function getSearchResults() {
    let terms = document.querySelector("input").value;
    if (terms == "") {
      fetch(`${API}/files`
      ).then(response => response.json())
        .then(data => {
          setFiles(data);
        });
    }
    else {
      fetch(`${API}/search?terms=${terms}`
      ).then(response => response.json())
        .then(data => {
          setFiles(data.fileIds);
        });

    }
  }

  function orderIcon() {
    if (layout == "grid") {
      return <ViewModuleIcon />;
    } else {
      return <ReorderIcon />;
    }
  }
  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ backgroundColor: "background.paper" }}>
        <DashboardIcon
          sx={{ color: "#444", mr: 2, transform: "translateY(-2px)" }}
        />
        <Typography variant="h6" noWrap component="div" sx={{ pr: 5 }}>
          Semantic Drive
        </Typography>
        <Divider sx={{ height: 28, mr: 2 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Drive"
          inputProps={{ "aria-label": "search the drive" }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getSearchResults();
            }
          }}
        />
        <IconButton
          type="search"
          sx={{ p: "10px" }}
          aria-label="order"
          onClick={getSearchResults}
        >
          <SearchIcon />
        </IconButton>
        <IconButton
          type="submit"
          sx={{ p: "10px" }}
          aria-label="order"
          onClick={changeOrderType}
        >
          {orderIcon()}
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
