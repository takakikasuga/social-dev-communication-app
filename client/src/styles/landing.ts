import styled from 'styled-components';

export const BackgroundDiv = styled.div`
  background-image: url('./images/landing.jpeg');
  background-size: cover;
  background-repeat: no-repeat;
  width: 100%;
  height: 100vh;
  position: relative;
  &::before {
    background-color: rgba(0, 0, 0, 0.5);
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    content: ' ';
  }
`;

export const Box = styled.div`
  position: absolute;
  width: 100%;
  text-align: center;
  top:40%;
  left:50%;
  transform:translateY(-50%)translateX(-50%);
  -webkit-
  transform:translateY(-50%)translateX(-50%);
  margin:auto;
`;
