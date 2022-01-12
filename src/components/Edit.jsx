import React, { useEffect } from "react";
import { Navigate, useLocation, useParams } from "react-router-dom";

function Edit() {
  const [text, setText] = React.useState("");

  const [goto, setGoto] = React.useState(false);
  console.log("goto:", goto);

  const { id } = useParams();

  const location = useLocation();

  const details = location.state;

  useEffect(() => {
    setText(details.title);
  }, []);

  const handleUpdate = (id) => {
    fetch(`http://localhost:3001/todos/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: text,
      }),
    })
      .then((res) => res.json())
      .then((result) => {
        console.log("result:", result);
        alert("updated successfully");
      })
      .catch((err) => {
        setGoto(false);
        console.log("error: ", err);
      });
  };

  return goto ? (
    <Navigate to={"/"} />
  ) : (
    <div>
      <input
        value={text}
        type="text"
        placeholder="Enter Todo"
        onChange={(e) => setText(e.target.value)}
      />

      <button onClick={() => handleUpdate(id)}>update</button>
    </div>
  );
}

export default Edit;
