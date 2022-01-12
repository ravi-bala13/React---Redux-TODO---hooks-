import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

function TodoDetails() {
  const { id } = useParams();

  const [details, setDetails] = useState({});
  console.log("details:", details);

  useEffect(() => {
    getDetails();
  }, []);

  const getDetails = () => {
    fetch(`http://localhost:3001/todos/${id}`)
      .then((d) => d.json())
      .then((result) => {
        console.log("result:", result);
        var res = result;
        setDetails(res);
        // getTodos();
      })
      .catch((err) => console.log("error: ", err));
  };

  return (
    <div>
      <h2>
        {id} - {details.title} - {details.status ? "Finished" : "Not finished"}{" "}
        -
        <Link to={`/todo/${id}/edit`} state={details}>
          <button>Edit</button>
        </Link>
      </h2>
    </div>
  );
}

export { TodoDetails };
