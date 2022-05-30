import styled from 'styled-components';

export const MenuTopWrapper = styled.nav`
  width: 100%;
  background-color: transparent;
  display: flex;
  align-items: center;
  justify-content: center;
  ol {
    display: flex;
    width: 80%;
    justify-content: space-around;
    align-items: center;
    list-style: none;
    background-color: transparent;
    margin-top: 15px;
    
    li:hover {
      background-color: greenyellow;
      width: 245px;

      a {
        color: #000000;
        font-size: 1.1rem;
      }
    }

    li {
      width: 240px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: transparent;
      border: 1px solid yellow;
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