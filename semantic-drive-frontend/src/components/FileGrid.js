import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "@/components/MediaCard";
import { API } from "@/components/Consts"
import { FilesContext } from "@/components/Contexts";

export default async function FileGrid({ displayFile }) {
  let [items, setItems] = useState([]);
  let [files, _] = useContext(FilesContext)
  useEffect(() => {
    console.log(files)
    let newItems = [];
    for (let f of files) {
      const formData = new FormData();
      formData.append("fileId", f);
      fetch(`${API}/file`, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => {
          newItems.push(
            <Grid key={f}>
              <MediaCard
                image="https://source.unsplash.com/random"
                heading={data.fileName}
                text={data.summary}
                id={f}
                displayFile={displayFile}
              />
            </Grid>,
          )
        });
    }
    console.log(`New Items ${newItems}`)
    setItems(newItems);
  }, [files]);
  return (
    <Grid
      container
      spacing={3}
      sx={{
        display: "flex",
        flexWrap: "wrap",
        justifyContent: "left",
        alignItems: "center",
      }}
    >
      {items}
    </Grid>
  );
}
