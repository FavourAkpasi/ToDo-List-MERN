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
  console.log(toDos);

  return (
    <div className="container">
      <Heading />
      <Input />
      <div>
        {toDos.map((toDo) => {
          return <ToDoItem key={toDo._id} toDo={toDo.content} />;
        })}
      </div>
    </div>
  );
}

export default Dashboard;
