import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Checkbox from "@mui/material/Checkbox";
import Zoom from "@mui/material/Zoom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestoreIcon from "@mui/icons-material/Restore";
import axios from "axios";
import { useGlobalContext } from "../context/GlobalContext";

function ToDoItem(props) {
  const { updateToDo, deleteToDo } = useGlobalContext();
  const [checked, setChecked] = useState(false);
  const [content, setContent] = useState(props.content);

  const [editing, setEditing] = useState(false);
  const todo = props.todo;

  function handleChange() {
    setChecked(!checked);
  }

  function handleEdit(e) {
    e.preventDefault();
    setEditing(true);
    input.current.focus();
  }

  function cancelEdit(e) {
    if (e) {
      e.preventDefault();
    }
    setEditing(false);
    setContent(props.content);
  }

  function saveEdit(e) {
    if (e) {
      e.preventDefault();
    }
    axios.put(`/api/todos/${props.id}`, { content }).then((res) => {
      updateToDo(res.data);
      setEditing(false);
    });
  }

  function handleDelete(e) {
    if (e) {
      e.preventDefault();
    }
    axios.delete(`/api/todos/${props.id}`).then(() => {
      deleteToDo(todo);
    });
  }

  const input = React.useRef(null);

  return (
    <div className="todoItem">
      <Checkbox
        disabled={editing}
        size="small"
        color="success"
        id={props._id}
        onChange={handleChange}
        className="done"
      />
      <li style={{ textDecoration: checked && "line-Through" }}>
        <input
          type="text"
          ref={input}
          value={content}
          readOnly={!editing}
          onChange={(e) => {
            setContent(e.target.value);
          }}
        />
      </li>
      {!checked && (
        <Zoom in={!editing}>
          <ModeEditOutlineIcon
            fontSize="small"
            color="success"
            onClick={handleEdit}
            className="edit"
          />
        </Zoom>
      )}
      {checked && (
        <Zoom in={checked}>
          <DeleteForeverIcon
            fontSize="small"
            color="error"
            onClick={handleDelete}
            className="delete"
          />
        </Zoom>
      )}
      {editing && (
        <Zoom in={true}>
          <CheckCircleOutlineIcon
            fontSize="small"
            color="success"
            onClick={saveEdit}
            className="done"
          />
        </Zoom>
      )}
      {editing && (
        <Zoom in={true}>
          <RestoreIcon
            fontSize="small"
            color="error"
            onClick={cancelEdit}
            className="undo"
          />
        </Zoom>
      )}
    </div>
  );
}

export default ToDoItem;
