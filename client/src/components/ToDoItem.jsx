import React, { useState } from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Checkbox from "@mui/material/Checkbox";
import Zoom from "@mui/material/Zoom";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import RestoreIcon from "@mui/icons-material/Restore";

function ToDoItem(props) {
  const [checked, setChecked] = useState(false);

  function handleChange() {
    setChecked(!checked);
  }

  const [toDoText, setToDoText] = useState(props.toDo);

  const [editing, setEditing] = useState(false);

  function handleEdit(e) {
    e.preventDefault();
    setEditing(true);
    input.current.focus();
  }

  function cancelEditing(e) {
    if (e) {
      e.preventDefault();
      setEditing(false);
      setToDoText(props.toDo);
    }
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
          value={toDoText}
          readOnly={!editing}
          onChange={(e) => {
            setToDoText(e.target.value);
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
            onClick={() => {
              props.delete(props._id);
            }}
            className="delete"
          />
        </Zoom>
      )}
      {editing && (
        <Zoom in={true}>
          <CheckCircleOutlineIcon
            fontSize="small"
            color="success"
            onClick={() => {
              props.delete(props._id);
            }}
            className="done"
          />
        </Zoom>
      )}
      {editing && (
        <Zoom in={true}>
          <RestoreIcon
            fontSize="small"
            color="error"
            onClick={cancelEditing}
            className="undo"
          />
        </Zoom>
      )}
    </div>
  );
}

export default ToDoItem;
