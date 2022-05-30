import styled from 'styled-components';

export const SearchWrapper = styled.div`
  width: 100vw;
  min-height: 100vh;
  background-color: #60703C;

  main {
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: transparent;

    .imgAnima {
      background-color: transparent;
      img {
        border: none;
        margin-top: 50px;
        box-shadow: 0px 5px 15px 9px rgba(0, 0, 2, 0.5);
      }
    }

    form, input, button {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 50%;
      height: 20%;
      background-color: transparent;
    }

    input {
      width: 450px;
      height: 50px;
      background-color: yellow;
      margin-bottom: 40px;
      border-bottom: 2px solid #60703C;
      box-shadow: 0px 5px 15px 9px rgba(0, 0, 2, 0.5);
      border-radius: 5px;
      margin-top: 25px;
    }

    button {
      width: 220px;
      height: 60px;
      background-color: black;
      border-radius: 10px;
    }
  }
`;