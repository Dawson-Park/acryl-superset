/* eslint-disable theme-colors/no-literal-colors */
import React from 'react';
import { styled } from '@superset-ui/core';
import KcopaSideNav from 'src/components/KcopaSideNav';

const Frame = styled.div`
  //display: flex;
  //flex-flow: row nowrap;
  display: grid;
  //grid-template-columns: 78px 1fr;
  grid-template-columns: 90px 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'outer-nav outer-main';
  width: 1903px;
  position: relative;
`;

const Aside = styled.div`
  //height: 100%;
  position: sticky;
  top: 0;
  //width: 78px;
  width: 90px;
  height: 100vh;
  grid-area: outer-nav;
  background-color: #246198;
`;

const Main = styled.div`
  grid-area: outer-main;
`;

interface Props {
  children?: React.ReactNode;
}

const OuterFrame = ({ children }: Props) => (
  <Frame className="outer-frame">
    <Aside>
      <KcopaSideNav />
    </Aside>
    <Main>{children}</Main>
  </Frame>
);

export default React.memo(OuterFrame);
