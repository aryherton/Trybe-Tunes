import styled from 'styled-components';

export const MenuTopWrapper = styled.nav`
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  ol {
    display: flex;
    width: 60%;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    background-color: transparent;

    li {
      width: 100%;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 2px solid yellow;
      border-radius: 10px;
      background-color: green;

      a {
        font-family: ${props => props.theme.font.secondary};
        text-decoration: none;
        color: greenyellow;
        background-color: transparent;
      }
    }
  }
`;