import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

export const CommentContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f8f8f8;
  padding: 32px 32px;
  margin-bottom: 24px;
  text-align: center;
  @media ${device.tablet} {
    padding: 32px 32px;
    margin-bottom: 24px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f8f8f8;
    flex-direction: row;
    text-align: left;
  }
`;

export default CommentContainer;
