import React from 'react';
import { styled } from '@superset-ui/core';
import logout_icon from './logout.png';

const LogoutIcon = styled.img`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  font-size: 14px;
  color: #fff;
  width: 100%;
  height: 100%;
`;

const LogoutRoot = styled.a`
  display: block;
  width: 48px;
  height: 48px;
`;

const LogoutButton = () => (
  <LogoutRoot href="/logout/">
    <LogoutIcon src={logout_icon} alt="logout" />
  </LogoutRoot>
);

export default React.memo(LogoutButton);
