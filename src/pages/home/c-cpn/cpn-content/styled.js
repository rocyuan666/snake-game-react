import styled from "styled-components"

const CpnContentWrap = styled.div`
  width: 500px;
  height: 500px;
  border: 2px solid #f00;
  overflow: hidden;
  position: relative;
  .snake-item{
    position: absolute;
    left: ${props => props.left + "px"};
    top: ${props => props.top + "px"};
    width: 10px;
    height: 10px;
    background-color: #000;
  }
`;
export default CpnContentWrap;