import * as React from "react";
import { useState, useEffect, useContext } from "react";
import Grid from "@mui/material/Unstable_Grid2";
import MediaCard from "@/components/MediaCard";
import { API } from "@/components/Consts"
import { FilesContext } from "@/components/Contexts";

export default function FileGrid({ displayFile }) {
  let [items, setItems] = useState([]);
  let [files, _] = useContext(FilesContext)
  useEffect(() => {
    let futures = [];
    for (let f of files) {
      futures.push(fetch(`${API}/file?fileId=${f}`, {
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          return (
            <Grid key={f}>
              <MediaCard
                image="https://source.unsplash.com/random"
                heading={data.fileName}
                text={data.summary}
                id={f}
                displayFile={displayFile}
              />
            </Grid>,
          );
        }))
    }
    Promise.all(futures).then((data) => {
      setItems(data)
    });
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
