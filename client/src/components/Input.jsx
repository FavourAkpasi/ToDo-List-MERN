import React, { useState } from "react";
import IconButton from "@mui/material/IconButton";
import AddCircleRoundedIcon from "@mui/icons-material/AddCircleRounded";
import axios from "axios";
import { GlobalContext, useGlobalContext } from "../context/GlobalContext";

function Input() {
  const { addToDo } = useGlobalContext();
  const [content, setContent] = useState("");

  function handleChange(e) {
    setContent(e.target.value);
  }

  function handleSubmit(e) {
    console.log(content);
    e.preventDefault();
    axios.post("/api/todos/new", { content }).then((res) => {
      setContent("");
      addToDo(res.data);
    });
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New Item"
        name="content"
        onChange={handleChange}
        value={content}
      />
      <IconButton
        onClick={handleSubmit}
        variant="outlined"
        disabled={content == ""}
      >
        <AddCircleRoundedIcon />
      </IconButton>
    </form>
  );
}

export default Input;
