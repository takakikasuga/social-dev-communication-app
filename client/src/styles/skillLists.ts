import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

export const SkillLists = styled.ul`
  @media ${device.mobileS} {
    text-align: center;
    display: block;
  }
  @media ${device.tablet} {
    width: 150px;
    text-align: left;
    display: block;
  }
  display: flex;
  justify-content: space-around;
`;

export default SkillLists;
