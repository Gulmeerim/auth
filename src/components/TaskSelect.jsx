import { useDispatch } from "react-redux";
import Select from "react-select";
import {
  deleteProcessItems,
  postProcessItems,
} from "../store/slices/processTasks";
import { postFinishedItems } from "../store/slices/finishedTasks";
import { deleteNewItems } from "../store/slices/newTasksSlice";

export default function TaskSelect({ optionItems, blockName }) {
  const dispatch = useDispatch();

  function handleSelect(task) {
    const t = optionItems.find((item) => task.id === item.id);

    console.log(t);
    if (blockName === "В процессе") {
      dispatch(postProcessItems(t));
      dispatch(deleteNewItems(t));
    } else if (blockName === "Завершенные") {
      dispatch(postFinishedItems(t));
      dispatch(deleteProcessItems(t));
    }
  }

  const options = optionItems.map(function (task) {
    return { value: task.name, label: task.name, id: task.id };
  });

  return (
    <Select
      classNamePrefix="select"
      options={options}
      value={""}
      components={{ DropdownIndicator: false }}
      onChange={handleSelect}
    />
  );
}
