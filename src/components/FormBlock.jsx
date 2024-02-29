import styled from "styled-components";
import AuthBlock from "./AuthBlock";
import RegBlock from "./RegBlock";
import { useState } from "react";

const FormBlock = () => {
  const [isReg, setIsReg] = useState(true);

  return (
    <Container>
      {!isReg ? <RegBlock /> : <AuthBlock />}
      <Button onClick={() => setIsReg((prev) => !prev)} $reg={isReg}>
        <span>Авторизация</span>/<span>Регистрация</span>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  height: 100%;
`;

const Button = styled.button`
  color: #6d6d6d;
  border: 5px solid black;
  border-radius: 3%;
  width: 250px;
  padding: 10px 0;
  position: absolute;
  bottom: 20px;

  span:first-of-type {
    text-decoration: ${(props) => (props.$reg ? "underline" : "")};
  }

  span:last-of-type {
    text-decoration: ${(props) => (props.$reg ? "" : "underline")};
  }
`;

export default FormBlock;
