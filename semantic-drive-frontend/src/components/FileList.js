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
    let newitems = [];
    for (let f of files) {
      const formData = new FormData();
      formData.append("fileId", f);
      fetch(`${API}/file`, {
        method: "POST",
        body: formData,
      })
        .then(response => response.json())
        .then(data => newitems.push(
          <ListCard
            image="https://source.unsplash.com/random"
            heading={data.fileName}
            text={data.summary}
            id={f}
            displayFile={displayFile}
          />,
        ));
    }
    console.log(newitems)
    setItems(newitems);
  }, [files]);

  return <List>{items}</List>;
}
