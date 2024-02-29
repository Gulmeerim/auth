import { useSelector } from "react-redux";
import styled from "styled-components";

const Header = () => {
  const user = useSelector((state) => state.user.user);

  return (
    <HeaderStyle>
      <div className="container">
        <img
          className="Img"
          src="https://cdn-icons-png.flaticon.com/512/1225/1225814.png"
          alt=""
        />
        <h3>Trello</h3>
        <p>{user.userName}</p>
      </div>
    </HeaderStyle>
  );
};

const HeaderStyle = styled.header`
  background-color: #6e6565;

  .container {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
  }

  .Img {
    width: 50px;
    height: 50px;
  }
`;

export default Header;
