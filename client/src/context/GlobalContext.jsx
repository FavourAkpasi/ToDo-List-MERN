import React, { createContext, useReducer, useEffect, useContext } from "react";
import axios from "axios";

const initialState = {
  user: null,
  fetchingUser: true,
  toDos: [],
};

function globalReducer(state, action) {
  switch (action.type) {
    case "SET_USER":
      return {
        ...state,
        user: action.payload,
        fetchingUser: false,
      };
    case "SET_TODOS":
      return {
        ...state,
        toDos: action.payload,
      };
    case "RESET_USER":
      return {
        ...state,
        user: null,
        toDos: [],
        fetchingUser: false,
      };
    default:
      return state;
  }
}

export const GlobalContext = createContext(initialState);

export const GlobalProvider = (props) => {
  const [state, dispatch] = useReducer(globalReducer, initialState);

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const res = await axios.get("/api/auth/current");
      if (res.data) {
        const toDoRes = await axios.get("/api/todos/current");
        if (toDoRes.data) {
          dispatch({ type: "SET_USER", payload: res.data });
          dispatch({ type: "SET_TODOS", payload: toDoRes.data.toDos });
        }
      } else {
        dispatch({ type: "RESET_USER" });
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: "RESET_USER" });
    }
  };

  const logout = async () => {
    try {
      await axios.put("/api/auth/logout");
      dispatch({ type: "RESET_USER" });
    } catch (error) {
      console.log(error);
      dispatch({ type: "RESET_USER" });
    }
  };

  const addToDo = (toDo) => {
    dispatch({
      type: "SET_TODOS",
      payload: [...state.toDos, toDo],
    });
  };

  const updateToDo = () => {
    dispatch({
      type: "SET_TODOS",
      payload: [...state.toDos],
    });
  };

  const deleteToDo = (todo) => {
    dispatch({
      type: "SET_TODOS",
      payload: state.toDos.filter((toDo) => toDo._id !== todo._id),
    });
  };

  const value = {
    ...state,
    getCurrentUser,
    logout,
    addToDo,
    updateToDo,
    deleteToDo,
  };

  return (
    <GlobalContext.Provider value={value}>
      {props.children}
    </GlobalContext.Provider>
  );
};

export function useGlobalContext() {
  return useContext(GlobalContext);
}
