import { createGlobalStyle } from "styled-components";
import Header from "./components/Header";
import Router from "./router/Router";
import { fetchFinishedItems } from "./store/slices/finishedTasks";
import { fetchProcessItems } from "./store/slices/processTasks";
import { fetchNewItems } from "./store/slices/newTasksSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchNewItems());
    dispatch(fetchProcessItems());
    dispatch(fetchFinishedItems());
  }, [dispatch]);
  return (
    <>
      <Global />
      <Header />
      <main>
        <Router />
      </main>
    </>
  );
}

const Global = createGlobalStyle`
  body {
    height: 100vh;
  }
  #root {
    display: flex;
    flex-direction: column;
    height: 100%;
  }
  main {
    background: url(/back.jpg);
    background-size: cover;
    background-position: center;
    padding-top: 20px;
    flex-grow: 1;
    position: relative;

  }
  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 30px;
  }
`;

export default App;
