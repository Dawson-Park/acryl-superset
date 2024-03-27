import React from 'react';
import { styled } from '@superset-ui/core';
import { Logo, SideNav, LogoutButton, DashNav } from '../components/OuterFrame';

interface Props {
  children: React.ReactNode;
}

const StyledDiv = styled.div`
  display: grid;
  grid-template-columns: 78px 1fr;
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
  width: 78px;
  height: 100%;
  z-index: 2000;
`;

// eslint-disable-next-line theme-colors/no-literal-colors
const StyledHeader = styled.header`
  position: sticky;
  top: 0;
  z-index: 999;
  height: 100%;
  width: 100%;
  background-color: #fff;
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
      <SideNav />
    </StyledNav>
    <StyledMain className="license-dashboard-main">
      <DashNav />
      {children}
    </StyledMain>
  </StyledDiv>
);

export default React.memo(OuterFrame);
