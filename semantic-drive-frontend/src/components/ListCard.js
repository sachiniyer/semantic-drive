import * as React from "react";
import { ListItem, ListItemText, ListItemAvatar, Avatar } from "@mui/material";

export default function ListCard({ image, heading, text, id, displayFile }) {
  function handleClick() {
    displayFile(id);
  }
  return (
    <ListItem onClick={handleClick}>
      <ListItemAvatar>
        <Avatar alt="file image" src={image} />
      </ListItemAvatar>
      <ListItemText primary={heading} secondary={text} />
    </ListItem>
  );
}
