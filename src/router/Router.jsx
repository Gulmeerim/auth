import { Route, Routes } from "react-router-dom";
import FormBlock from "../components/FormBlock";
import BoardBlock from "../components/BoardBlock";
import PrivateRoute from "../utils/PrivateRoute";
import TaskDescripton from "../components/TaskDescripton";

const Router = () => {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route path="/" element={<BoardBlock />} />
        <Route path="/description/:id" element={<TaskDescripton />} />
      </Route>
      <Route path="/login" element={<FormBlock />} />
    </Routes>
  );
};

export default Router;
