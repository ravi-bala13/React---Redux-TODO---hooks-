import {
  addTodoError,
  addTodoLoading,
  addTodoSuccess,
  getTodoError,
  getTodoLoading,
  getTodoSuccess,
} from "../store/action";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";

export const Todos = () => {
  const [text, setText] = useState("");
  const [total, setTotal] = useState(0);

  var count = 0;

  const { loading, todos, error } = useSelector(
    (state) => ({
      loading: state.loading,
      todos: state.todos,
      error: state.error,
    }),
    function (prev, curr) {
      if (prev.loading === curr.loading && prev.error === curr.error) {
        return true;
      }
      return false;
    }
  );

  const dispatch = useDispatch();

  useEffect(() => {
    getTodos();
  }, []);

  async function getTodos() {
    try {
      dispatch(getTodoLoading());
      const data = await fetch("http://localhost:3001/todos").then((d) =>
        d.json()
      );
      dispatch(getTodoSuccess(data));

      // ****** for total
      count = 0;
      data.forEach((e) => {
        if (e.status == false) {
          count++;
        }
      });

      setTotal(count);
      // *********
    } catch (error) {
      dispatch(getTodoError(error));
    }
  }

  const deleteTodo = async (id) => {
    await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    })
      .then((d) => {
        d.json();
        getTodos();
      })
      .catch((err) => {
        console.log("err:", err);
      });
  };

  const handleStatus = (id, status) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: !status,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result:", result);
        getTodos();
        // setItem(result)
      })
      .catch((err) => console.log("error: ", err));
  };

  return loading ? (
    <div>Loading...</div>
  ) : error ? (
    <div>Something went wrong</div>
  ) : (
    <div>
      <input
        value={text}
        type="text"
        placeholder="Enter Todo"
        onChange={(e) => setText(e.target.value)}
      />

      <button
        onClick={() => {
          dispatch(addTodoLoading());

          fetch("http://localhost:3001/todos", {
            headers: {
              //   Accept: "application/json",
              "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ status: false, title: text }),
          })
            .then((d) => d.json())
            .then((res) => {
              dispatch(addTodoSuccess(res));
              console.log("res:", res);
              // ****** for total
              // count = 0;
              // res.forEach((e) => {
              //   if (e.status == false) {
              //     count++;
              //   }
              // });

              // setTotal(count);
              // *********
              getTodos();
            })
            .catch((err) => {
              console.log("err:", err);
              dispatch(addTodoError(err));
            });
          //   dispatch(addTodo(text));
          setText("");
        }}
      >
        Add Todo
      </button>

      <h4>Total tasks need to be done : {total}</h4>

      {todos.map((e) => (
        <div key={e.id}>
          <Link to={`/todo/${e.id}`}>{e.title} -</Link>
          <button onClick={() => handleStatus(e.id, e.status)}>
            {e.status ? "Done" : "Not Done"}
          </button>{" "}
          - <button onClick={() => deleteTodo(e.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};
