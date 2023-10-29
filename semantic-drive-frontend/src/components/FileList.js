import * as React from "react";
import { useState, useEffect, useContext } from "react";
import { List } from "@mui/material";
import ListCard from "@/components/ListCard";
import { API } from "@/components/Consts"
import { FilesContext } from "@/components/Contexts";

export default function FileList({ displayFile }) {
  let [items, setItems] = useState([]);
  let [files, _] = useContext(FilesContext)
  useEffect(() => {
    console.log(files)
    let newItems = [];
    let futures = [];
    for (let f of files) {
      const formData = new FormData();
      formData.append("fileId", f);
      futures.push(fetch(`${API}/file`, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => { 
          return (
          <ListCard
            image="https://source.unsplash.com/random"
            heading={data.fileName}
            text={data.summary}
            id={f}
            displayFile={displayFile}
          />
          )
        }))};
    Promise.all(futures).then((data) => {
      console.log(data)
      setItems(data)
    })
  }, [files]);

  return <List>{items}</List>;
}
