import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { TodoDetails } from "./components/TodoDetails";

import { Todos } from "./components/Todos";
import Edit from "./components/Edit";
import Error from "./components/Error";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/home" element={<Todos />}>
          {""}
        </Route>
        <Route path="/todo/:id" element={<TodoDetails />}></Route>
        <Route path="/todo/:id/edit" element={<Edit />}></Route>
        <Route path="/error" element={<Error />}></Route>
      </Routes>
    </div>
  );
}

export default App;
