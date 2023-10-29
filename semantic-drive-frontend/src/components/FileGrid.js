import * as React from "react";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "@/components/MediaCard";
import { API } from "@/components/Consts"

export default function FileGrid({ files, displayFile }) {
  let [items, setItems] = useState([]);
  useEffect(() => {
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
          console.log(data);
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
