import * as React from "react";
import Card from "@mui/material/Card";
import { CardActionArea, CardMedia } from "@mui/material";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

export default function MediaCard({ image, heading, text, id, displayFile }) {
  function handleClick() {
    displayFile(id);
  }
  return (
    <Card
      sx={{
        maxWidth: 345,
      }}
    >
      <CardActionArea onClick={handleClick}>
        <CardMedia
          component="img"
          alt="Random image"
          image={image}
          style={{
            maxWidth: "100%",
            height: "200px",
            objectFit: "cover",
          }}
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {heading}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {text}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
