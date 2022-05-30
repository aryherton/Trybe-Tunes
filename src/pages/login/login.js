import styled from 'styled-components';

export const LoginWrapper = styled.div`
    width: 100vw;
    min-height: 100vh;
    background-color: #60703C;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;

    main {
      background-color: transparent;
      display: flex;
      justify-content: center;
      align-items: center;

      img {
        border-radius: 50%;
        background-color: transparent;
        width: 250px;
        height: 250px;
        margin-right: 130px;
      }

      form {
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        width: 550px;
        height: 250px;
        background-color: transparent;
        border-left: 5px solid rgba(255, 255, 255, 0.5);
  
        input {
          background-color: yellow;
          width: 350px;
          height: 50px;
          border-radius: 7px;
          text-align: center;
        }

        button {
          background-color: yellowgreen;
          width: 250px;
          height: 50px;
          border-radius: 7px;
          color: #fff;
          font-size: 20px;
          font-weight: bold;
          border: 2px solid #fff;
          cursor: pointer;
        }

        button:hover {
          background-color: #fff;
          color: #60703C;
        }
      }
    }

    footer{
      margin-top: 50px;
      width: 100%;
      height: 50px;
      display: flex;
      justify-content: center;
      align-content: center;
      background-color: transparent;
      position: absolute;
      bottom: 70px;

      img {
        position: absolute;
        right: 20px;
        width: 120px;
        height: 120px;
        background-color: transparent;
      }
    }
`;