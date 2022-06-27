import { useGlobalContext } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";
import Heading from "./Heading";
import React from "react";
import Input from "./Input";
import ToDoItem from "./ToDoItem";

function Dashboard() {
  const { user, toDos } = useGlobalContext();
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!user && navigate) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <div>
      <div className="container">
        {user ? <Heading initial={user.name[0].toUpperCase()} /> : <Heading />}

        <Input />
        <div className="todoContainer">
          {toDos.map((toDo) => {
            return (
              <ToDoItem
                key={toDo._id}
                id={toDo._id}
                content={toDo.content}
                todo={toDo}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
