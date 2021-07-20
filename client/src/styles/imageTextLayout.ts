import styled from 'styled-components';
import { device } from './breakpoint/breakpoint';

const ImageTextLayout = styled.div`
  @media ${device.tablet} {
    display: flex;
    alignitems: center;
    text-align: left;
    margin-bottom: 0;
  }
  text-align: center;
  margin-bottom: 24px;
`;

export default ImageTextLayout;
