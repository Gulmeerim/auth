import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { postNewItems } from "../store/slices/newTasksSlice";
import TaskSelect from "./TaskSelect";
import { Link } from "react-router-dom";

const TasksBlock = ({ blockName, tasks, optionItems }) => {
  const dispatch = useDispatch();
  const [taskName, setTaskName] = useState("");
  const [visible, setVisible] = useState(false);

  const addTask = (item) => {
    if (taskName) {
      dispatch(postNewItems(item));
      setVisible(false);
      setTaskName("");
    } else {
      setVisible((prev) => !prev);
    }
  };

  const activityBlock = (blockName) => {
    if (blockName === "Новые") {
      return <Input onChange={(e) => setTaskName(e.target.value)} />;
    } else {
      return (
        <TaskSelect
          tasks={tasks}
          optionItems={optionItems}
          blockName={blockName}
        />
      );
    }
  };

  return (
    <Container>
      <h2>{blockName}</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <Link to={`/description/${task.id}?&column=${blockName}`}>
              {task.name}
            </Link>
            <button onClick={() => "1"}>X</button>
          </li>
        ))}
      </ul>
      {visible && activityBlock(blockName)}
      <Button onClick={() => addTask({ name: taskName, description: "" })}>
        Добавить задачу
      </Button>
    </Container>
  );
};

const Container = styled.div`
  color: #fff;
  width: 250px;
  background-color: #383838;
  display: flex;
  flex-direction: column;
  border: 10px black;
  border-radius: 3%;
  padding: 10px;
  height: fit-content;

  h2 {
    margin-bottom: 15px;
  }

  li {
    display: flex;
    background-color: #6e6565;
    margin-bottom: 10px;
    border-radius: 5px;
    a {
      padding: 10px;
      display: inline-block;
      color: white;
      font-size: 16px;
      width: 100%;
    }

    button {
      background: transparent;
      padding: 10px;
      font-family: sans-serif;
    }
  }

  .select__control {
    width: 100% !important;
    border-radius: 5px !important;
    font-size: 16px;
    margin-bottom: 10px;
    border: none;
    background: #6e6565;
    box-shadow: none !important;
  }

  .select__control:hover {
    cursor: pointer;
  }

  .select__control--is-focused {
    border-color: #fff !important;
    border-width: 0 !important;
  }

  .select__control--menu-is-open {
    border-color: #fff !important;
    border-width: 0 !important;
  }

  .select__menu {
    margin-top: 4px !important;
    box-shadow: none !important;
  }

  .select__menu-list {
    padding: 0 !important;
    border-radius: 5px !important;
  }

  .select__option {
    cursor: pointer !important;
    background-color: #6e6565 !important;
    color: #fff !important;
    height: 30px !important;
  }

  .select__option:hover {
    background-color: #383838 !important;
  }
`;

const Input = styled.input`
  background-color: #6e6565;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
  font-size: 16px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #383838;
  color: white;
  cursor: pointer;
  border: 2px solid #fff;
  border-radius: 5px;
`;
export default TasksBlock;
