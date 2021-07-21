import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

const DeveloperLists = styled.div`
  flex-direction: column;
  background-color: #f8f8f8;
  @media ${device.tablet} {
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-between;
    background-color: #f8f8f8;
  }
`;

export default DeveloperLists;
