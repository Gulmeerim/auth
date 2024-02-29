import styled from "styled-components";

const RegBlock = () => {
  return (
    <>
      <Title>Регистрация</Title>
      <Input type="text" placeholder="Имя" />
      <Input type="email" placeholder="Email" />
      <Input type="password" placeholder="Пароль" />
      <Button>Зарегистрироваться</Button>
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
  background-color: #d4dbd3;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #353835;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 5%;
`;

export default RegBlock;
