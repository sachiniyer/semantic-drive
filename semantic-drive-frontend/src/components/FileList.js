import * as React from 'react';
import { useState, useEffect } from 'react';
import { List } from '@mui/material';
import ListCard from '@/components/ListCard'

export default function FileList({ files, displayFile }) {
  let [items, setItems] = useState([]);

  useEffect(() => {
    let newitems = []
    for (let f of files) {
      // fetch('/api/files')
      //  .then(response => response.json())
      // .then(data => items.push(
      //  <ListItem>
      //    <ListItemAvatar>
      //      <Avatar alt="file image" src="https://source.unsplash.com/random" />
      //    </ListItemAvatar>
      //    <ListItemText
      //      primary="cmyk"
      //      secondary="The CMYK color model (also known as process color, or four color) is a subtractive color model, based on the CMY color model, used in color printing, and is also used to describe the printing process itself."
      //    />
      //  </ListItem>
      // ));
      newitems.push(
        <ListCard
          image="https://source.unsplash.com/random"
          heading="cmyk"
          text="the cmyk color model (also known as process color, or four color) is a subtractive color model, based on the cmy color model, used in color printing, and is also used to describe the printing process itself."
          id={f}
          displayFile={displayFile}
        />
      )
    }
    setItems(newitems)
  }, [files]);

  return (
    <List>
      {items}
    </List>
  );
}
