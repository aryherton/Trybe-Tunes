import styled from 'styled-components';

export const LoginWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #60703C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    h1, form, input, button {
      background-color: transparent;
    }

    h1 {
      text-align: center;
    }

    input {
      background-color: yellowgreen;
      width: 350px;
      height: 50px;
      border-radius: 7px;
    }
`;