import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useSearchParams, useParams } from "react-router-dom";
import styled from "styled-components";
import { patchFinishedItems } from "../store/slices/finishedTasks";
import { patchProcessItems } from "../store/slices/processTasks";
import { patchNewItems } from "../store/slices/newTasksSlice";

const TaskDescripton = () => {
  const [task, setTask] = useState({ description: "" });
  const newTasks = useSelector((state) => state.newTasks.data);
  const processTasks = useSelector((state) => state.processTasks.data);
  const finishedTasks = useSelector((state) => state.finishedTasks.data);
  const description = useRef("");
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { id } = useParams();
  const column = searchParams.get("column");
  const dispatch = useDispatch();

  useEffect(() => {
    if (column === "Новые") {
      setTask(newTasks.find((task) => task.id === +id));
    } else if (column === "В процессе") {
      setTask(processTasks.find((task) => task.id === +id));
    } else {
      setTask(finishedTasks.find((task) => task.id === +id));
    }
  }, [column, finishedTasks, id, newTasks, processTasks]);

  function handleChange(e) {
    description.current = e.target.value;
  }

  function changeTask(patch) {
    if (column === "Новые") {
      dispatch(patchNewItems(patch));
    } else if (column === "В процессе") {
      dispatch(patchProcessItems(patch));
    } else {
      dispatch(patchFinishedItems(patch));
    }
    navigate(-1);
  }

  return (
    <TaskDescriptonStyle>
      <div className="container">
        <div>
          <h1>Название</h1>
          <button
            onClick={() =>
              changeTask({
                id,
                description: `${description.current}`,
              })
            }
          >
            Назад
          </button>
        </div>
        <textarea
          onChange={handleChange}
          placeholder="Пусто"
          defaultValue={task?.description || ""}
        ></textarea>
      </div>
    </TaskDescriptonStyle>
  );
};

const TaskDescriptonStyle = styled.section`
  height: 100%;

  .container {
    height: 100%;

    div {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  }

  h1 {
    font-size: 30px;
    color: #fff;
    margin-bottom: 30px;
  }

  button {
    width: 70px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    border-radius: 20px;
  }

  textarea {
    width: 100%;
    height: 70%;
    background-color: rgba(0, 0, 0, 0.5);
    padding: 10px;
    color: #fff;
    border-radius: 20px;
  }
`;

export default TaskDescripton;
