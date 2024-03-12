import React from 'react';
import { styled } from '@superset-ui/core';
import SideNav from './SideNav';

const Frame = styled.div`
  display: flex;
  flex-flow: row nowrap;
`

interface Props {
  children?: React.ReactNode;
}

const OuterFrame = ({ children }:Props) => {
  return (
    <Frame>
      <SideNav />
      {children}
    </Frame>
  )
}

export default React.memo(OuterFrame);