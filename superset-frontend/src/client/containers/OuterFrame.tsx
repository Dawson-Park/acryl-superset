import React from 'react';
import { styled } from '@superset-ui/core';
import { Logo, LogoutButton, DashNav } from '../components/OuterFrame';
import KcopaSideNav from 'src/components/KcopaSideNav';

interface Props {
  children: React.ReactNode;
}

const StyledDiv = styled.div`
  display: grid;
  //grid-template-columns: 78px 1fr;
  grid-template-columns: 90px 1fr;
  grid-template-rows: 48px auto;
  grid-template-areas:
    'outer-nav outer-header'
    'outer-nav outer-main';
  width: 1903px;
`;

const StyledNav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  grid-area: outer-nav;
  //width: 78px;
  width: 90px;
  height: 100%;
  z-index: 2000;
`;

const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
  background-color: #ffffff;
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-end;
  grid-area: outer-header;
  border-bottom: 1px solid #e0e0e0;
`;

const StyledMain = styled.main`
  grid-area: outer-main;
  //padding: 24px;
`;

const OuterFrame = ({ children }: Props) => (
  <StyledDiv>
    <StyledHeader>
      <LogoutButton />
    </StyledHeader>
    <StyledNav>
      <Logo />
      <KcopaSideNav />
    </StyledNav>
    <StyledMain className="license-dashboard-main">
      <DashNav />
      {children}
    </StyledMain>
  </StyledDiv>
);

export default React.memo(OuterFrame);
