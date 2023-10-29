import * as React from "react";
import { useState, useEffect } from "react";
import { List } from "@mui/material";
import ListCard from "@/components/ListCard";
import { API } from "@/components/Consts"

export default function FileList({ files, displayFile }) {
  let [items, setItems] = useState([]);

  useEffect(() => {
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
    setItems(newitems);
  }, [files]);

  return <List>{items}</List>;
}
