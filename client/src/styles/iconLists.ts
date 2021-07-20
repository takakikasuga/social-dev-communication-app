import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

const IconLists = styled.div`
  display: flex;
  flex-direction: column;
  @media ${device.mobileXL} {
    display: flex;
    max-width: 400px;
    margin: 0 auto;
    flex-direction: row;
    justify-content: space-between;
  }
`;

export default IconLists;
