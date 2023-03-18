import * as React from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import { CardMedia, IconButton } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { useNavigate } from "react-router-dom";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Box } from "@mui/system";
import axios from "axios";

export default function BlogCard({
  title,
  description,
  image,
  time,
  username,
  id,
  isUser,
}) {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleDelete = async () => {
    const { data } = await axios.delete(`/api/v1/blog/delete-blog/${id}`);
    if (data?.success) {
      alert("blog deleted successfully");
      navigate("/my-blogs");
    }
  };
  return (
    <Card
      sx={{
        width: "40%",
        margin: "auto",
        mt: 4,
        padding: 2,
        boxShadow: "10px 10px 10px #ccc",
        ":hover": {
          boxShadow: "10px 10px 10px 20px #ccc",
        },
      }}
    >
      {isUser && (
        <Box display={"flex"}>
          <IconButton onClick={handleEdit} sx={{ marginLeft: "auto" }}>
            <EditIcon />
          </IconButton>

          <IconButton onClick={handleDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {image}
          </Avatar>
        }
        title={username}
        subheader={time}
      />
      <CardMedia component="img" height="194" image={image} alt="blog" />
      <CardContent>
        <Typography variant="h6" color="text.secondary">
          Title:{title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          Description:{description}
        </Typography>
      </CardContent>
    </Card>
  );
}
