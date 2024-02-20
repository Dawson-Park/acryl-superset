import React from 'react';
import { styled } from '@superset-ui/core';
import image from './license_logo.png';

const LogoRoot = styled.img`
  width: 30px;
  height: 32px;
`;

const LogoContainer = styled.h1`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 48px;
  margin: 0;
  background-color: #fff;
`;

const Logo = () => (
  <LogoContainer id="Korea-License-Logo">
    <LogoRoot src={image} />
  </LogoContainer>
);

export default React.memo(Logo);
