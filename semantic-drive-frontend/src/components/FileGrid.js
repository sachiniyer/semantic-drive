import * as React from 'react';
import { useState, useEffect } from 'react';
import Grid from '@mui/material/Unstable_Grid2';
import MediaCard from '@/components/MediaCard';

export default function FileGrid({ files, displayFile }) {
  let [items, setItems] = useState([]);
  useEffect(() => {
    let newItems = []
    for (let f of files) {
      // fetch('/api/files')
      //  .then(response => response.json())
      // .then(data => items.push(
      //    <grid xs={6}>
      //      <mediacard
      //        image={data.image}
      //        heading={data.heading}
      //        text={data.text}
      //      />
      //    </grid>
      // ));
      newItems.push(
        <Grid
          key={f}>
          <MediaCard
            image="https://source.unsplash.com/random"
            heading="cmyk"
            text="the cmyk color model (also known as process color, or four color) is a subtractive color model, based on the cmy color model, used in color printing, and is also used to describe the printing process itself."
            id={f}
            displayFile={displayFile}
          />
        </Grid>
      )
    }
    setItems(newItems)
  }, [files]);
  return (
    <Grid container spacing={3}
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'left',
        alignItems: 'center',
      }}
    >
      {items}
    </Grid>
  )
}
