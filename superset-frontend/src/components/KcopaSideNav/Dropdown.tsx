import { ReactNode, useEffect, useRef, useState } from 'react';
import styled from '@emotion/styled';
import Tips from './Tip';

interface Props {
  children?: ReactNode;
  contents?: ReactNode;
  activate?: boolean;
  height?: string;
}

const Container = styled.div`
  & > div:first-of-type {
    position: relative;
  }
`
const Box = styled.div`
  height: 0;
  overflow: hidden;
  transition: height 250ms ease-in-out;
  background-color: #1e4e7a;
  
  & > div {
    display: flex;
    flex-flow: column;
    align-items: center;
    padding: 16px 0;
    color: white;
  }
`;

const Dropdown = ({ children, contents, activate = false }: Props) => {
  const boxRef = useRef<HTMLDivElement>(null);
  const itemRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(activate);

  useEffect(() => {
    if (!boxRef || !boxRef.current) return;
    let timeout: string | number | NodeJS.Timeout | undefined;
    const { height } = itemRef?.current?.getClientRects()[0] ?? { height: 0 };

    if (active) {
      timeout && clearTimeout(timeout);
      boxRef.current.setAttribute('style', `height: ${height}px;`);
      // timeout = setTimeout(() => {
      //   boxRef.current?.setAttribute('style', 'height: 100%;');
      //   timeout && clearTimeout(timeout);
      // }, 200);
    } else {
      timeout && clearTimeout(timeout);
      // boxRef.current.setAttribute('style', `height: ${height}px`);
      // timeout = setTimeout(() => {
        boxRef.current?.setAttribute('style', 'height: 0px');
        // timeout && clearTimeout(timeout);
      // }, 200);
    }
  }, [active]);

  return (
    <Container data-active={active}>
      <div onClick={() => setActive(!active)}>
        {children}
        <Tips active={active} />
      </div>
      <Box ref={boxRef}>
        <div ref={itemRef}>
          {contents}
        </div>
      </Box>
    </Container>
  );
};

export default Dropdown;