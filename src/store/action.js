import {
  ADD_TODO,
  ADD_TODO_ERROR,
  ADD_TODO_LOADING,
  ADD_TODO_SUCCESS,
  GET_TODO_ERROR,
  GET_TODO_LOADING,
  GET_TODO_SUCCESS,
  REMOVE_TODO,
} from "./actionTypes";

export const addTodo = (data) => ({
  type: ADD_TODO,
  payload: data,
});

export const addTodoLoading = () => ({
  type: ADD_TODO_LOADING,
});

export const addTodoSuccess = (data) => ({
  type: ADD_TODO_SUCCESS,
  payload: data,
});

export const addTodoError = (err) => ({
  type: ADD_TODO_ERROR,
  payload: err,
});

export const getTodoLoading = () => ({
  type: GET_TODO_LOADING,
});

export const getTodoSuccess = (data) => ({
  type: GET_TODO_SUCCESS,
  payload: data,
});

export const getTodoError = (err) => ({
  type: GET_TODO_ERROR,
  payload: err,
});

export const removeTodo = (id) => ({
  type: REMOVE_TODO,
  payload: id,
});
