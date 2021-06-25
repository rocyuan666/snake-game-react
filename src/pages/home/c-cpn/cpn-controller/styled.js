import styled from "styled-components"

const CpnContorllerWrap = styled.div`
  text-align: center;
  .btn-play{
		display: block;
		width: 50px;
		height: 26px;
		line-height: 26px;
		cursor: pointer;
    margin: 0 auto 6px;
		background-color: #fff;
		color: #000;
		border: 1px solid #aaa;
		border-radius: 6px;
		transition: all .2s;
  }
	.btn-play:hover{
		background-color: #ccc;
		color: #000;
	}
	.btn-play:active{
		transform: scale(.9);
	}
  .tips-text{
    color: #f00;
    padding: 6px 0;
  }
`;
export default CpnContorllerWrap;