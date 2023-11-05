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
      futures.push(fetch(`${API}/file?fileId=${f}`, {
        method: "GET",
      })
        .then(response => response.json())
        .then(data => {
          let image = `${API}${data.file}`
          if (data.fileType != "image") {
            image = `/${data.fileType}.png`
          }
          return (
            <ListCard
              image={image}
              heading={data.fileName}
              text={data.summary}
              id={f}
              displayFile={displayFile}
            />
          )
        }))
    };
    Promise.all(futures).then((data) => {
      console.log(data)
      setItems(data)
    })
  }, [files]);

  return <List>{items}</List>;
}
