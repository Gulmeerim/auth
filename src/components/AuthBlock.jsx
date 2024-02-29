import { useRef } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { fetchUser } from "../store/slices/userSlice";
import { useNavigate } from "react-router-dom";

const AuthBlock = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = useRef("");
  const password = useRef("");

  const authFunc = (email, password) => {
    dispatch(
      fetchUser({
        email: email,
        password: password,
      })
    );
    if (localStorage.getItem("token")) {
      navigate("/");
    }
  };

  return (
    <>
      <Title>Авторизация</Title>
      <Input
        type="text"
        placeholder="Логин"
        onChange={(e) => (email.current = e.target.value)}
      />
      <Input
        type="password"
        placeholder="Пароль"
        onChange={(e) => (password.current = e.target.value)}
      />
      <Button onClick={() => authFunc(email.current, password.current)}>
        Войти
      </Button>
    </>
  );
};

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 20px;
  color: #fff;
`;

const Input = styled.input`
  padding: 10px;
  margin-bottom: 10px;
  width: 200px;
  background-color: #e7e7e7;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #272727;
  color: white;
  border: 5px black;
  border-radius: 5%;
`;

export default AuthBlock;
