import styled from "styled-components"

const CpnContentWrap = styled.div`
  width: 500px;
  height: 500px;
  border: 2px solid #f00;
  overflow: hidden;
  position: relative;
  .snake-item{
    position: absolute;
    width: 10px;
    height: 10px;
    overflow: hidden;
    text-indent: -9999px;
    background-color: #000;
  }
  .food{
    position: absolute;
    left: ${props => props.foodLeft + "px"};
    top: ${props => props.foodTop + "px"};
    width: 10px;
    height: 10px;
    overflow: hidden;
    text-indent: -9999px;
    background-color: ${props => props.foodBgColor};
  }
`;
export default CpnContentWrap;