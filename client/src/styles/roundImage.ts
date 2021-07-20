import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

export const RoundImage = styled.img`
  @media ${device.tablet} {
    margin-right: 32px;
  }
  border-radius: 50%;
  border: solid 1px #000;
`;

export default RoundImage;
