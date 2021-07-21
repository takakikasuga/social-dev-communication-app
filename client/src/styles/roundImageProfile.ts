import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

export const RoundImageProfile = styled.img`
  @media ${device.tablet} {
    margin-right: 32px;
    margin-bottom: 0px;
  }
  margin-bottom: 16px;
  border-radius: 60%;
  border: solid 1px #000;
`;

export default RoundImageProfile;
