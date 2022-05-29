import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100px;
  background-color: green;

  .logoTop {
    background-color: transparent;
    width: 25%;
    height: 100%;
    margin-left: 130px;
    img {
      width: 100%;
      height: 100%;
      background-color: transparent;
    }
  }

  .div-user {
    width: 25%;
    display: flex;
    align-items: center;
    background-color: transparent;

    span {
      color: greenyellow;
      font-family: ${props => props.theme.font.tertiary};
      font-size: 1.7em;
      text-align: center;
      margin-right: 12px;
      background-color: transparent;
    }

    img {
      background-color: transparent;
    }
  }
`;