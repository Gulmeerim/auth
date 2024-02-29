import styled from "styled-components";
import TasksBlock from "./TasksBlock";
import { useSelector } from "react-redux";

const BoardBlock = () => {
  const newTasks = useSelector((state) => state.newTasks.data);
  const processTasks = useSelector((state) => state.processTasks.data);
  const finishedTasks = useSelector((state) => state.finishedTasks.data);

  return (
    <Container>
      <div className="container">
        <TasksBlock blockName={"Новые"} tasks={newTasks} />
        <TasksBlock
          blockName={"В процессе"}
          tasks={processTasks}
          optionItems={newTasks}
        />
        <TasksBlock
          blockName={"Завершенные"}
          tasks={finishedTasks}
          optionItems={processTasks}
        />
      </div>
    </Container>
  );
};

const Container = styled.div`
  color: #fff;

  .container {
    display: flex;
    justify-content: space-between;
    gap: 15px;
  }
`;

export default BoardBlock;
