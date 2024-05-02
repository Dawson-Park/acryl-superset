import downMenu from './icons/downmenu.png';
import arrow from './icons/mu-arrow.png';
import styled from '@emotion/styled';

const TipBox = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  user-select: none;
  
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  [data-active=true] & {
    bottom: 0;
  }
  [data-active=false] & {
    bottom: 8%;
  }
`;
const Tips = styled.img`
  [data-active=true] & {
    height: 90%;
  }
  [data-active=false] & {
    height: 90%;
  }
`;

interface IProps {
  active?: boolean;
}

const Tip = ({ active = false }:IProps) => (
  <TipBox>
    <Tips src={active ? arrow : downMenu} />
  </TipBox>
)

export default Tip;