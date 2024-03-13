import React from 'react';
import { styled, css } from '@superset-ui/core';
import { useHistory, useParams } from 'react-router-dom';
import { Menu, MainNav as DropdownMenu } from 'src/components/Menu';
import Icons from 'src/components/Icons';

const NavContainer = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  //height: 40px;
  height: 24px;
  padding: 16px 24px;
  //padding-bottom: 40px;
  box-sizing: content-box;
  background-color: #FFFFFF;
  border-bottom: 1px solid #e0e0e0;
`;

type Props = {
  $active?: boolean;
};

const NavItem = styled.div<Props>`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  width: fit-content;
  font-family: Pretendard, 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  line-height: 26px;
  letter-spacing: -0.02em;
  color: #afb2c0;
  transition: color 0.3s ease-in-out;

  &:hover {
    color: #0f111a;
    cursor: pointer;
  }

  ${props =>
  props?.$active &&
  css`
      color: #0f111a;
      //border-bottom: 2px solid #5badf4;
    `}
  
  .dashnav-menu {
    line-height: 24px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: none !important;
  }
  .dashnav-submenu {
    margin: 0 !important;
    padding: 0 !important;
    position: static !important;
    border-bottom: none !important;
    
    & > .ant-menu-submenu-title {
      display: inline-flex;
      flex-flow: row nowrap;
      align-items: center;
      
      padding: 0 !important;
      position: static;
      top: auto;

      font-family: Pretendard, 'Inter', sans-serif;
      font-weight: 700;
      font-size: 18px;
      line-height: 26px;
      letter-spacing: -0.02em;
      color: #afb2c0;
      transition: color 0.3s ease-in-out;
    }
    &:hover > .ant-menu-submenu-title {
      color: #0f111a;
      cursor: pointer;
    }
  }
  .dashnav-icon {
    position: static !important;
    right: auto;
    top: auto;
    margin-right: 0 !important;
  }
`;

const linkPrefix = (str: string | number) => `/superset/dashboard/${str}/`;

// type ListType = {
//   to: string;
//   label: string;
// };
// const lists: ListType[] = [
//   { /* to: '10', */ label: '대시보드', to: 'license_dashboard' },
//   { /* to: '9', */ label: '수집 현황', to: 'collection' },
//   { /* to: '8', */ label: '유통 현황 분석', to: 'distribution' },
//   { /* to: '7', */ label: '침해 현황 분석', to: 'infringement' },
//   { /* to: '5', */ label: '동향 분석', to: 'trend' },
//   { /* to: 'world_health', */ label: '수사 지원 분석', to: 'investigation' },
// ];

interface Params {
  idOrSlug: string;
}

const { SubMenu } = DropdownMenu;

const DashNav = () => {
  const params = useParams<Params>();
  const history = useHistory();

  const onClick = (link: string) => {
    history.push(linkPrefix(link));
  }

  return (
    <NavContainer>
      <NavItem onClick={() => {
        onClick('license_dashboard');
      }}
               $active={params?.idOrSlug === 'license_dashboard'}>
        대시보드
      </NavItem>

      <NavItem onClick={() => {
        onClick('collection')
      }}
               $active={params?.idOrSlug === 'collection'}>
        수집 현황
      </NavItem>

      <NavItem>
        <Menu mode="horizontal" triggerSubMenuAction="click" className='dashnav-menu'>
          <SubMenu title={
            <>
              유통 및 침해 분석
              <Icons.TriangleDown className='dashnav-icon' />
            </>
          }
            // popupOffset={[0, 0]}
                   className='dashnav-submenu'
          >
            <DropdownMenu.Item className='dashnav-dropdown-item'
                               onClick={() => {
                                 onClick('distribution')
                               }}
                               data-active={params?.idOrSlug === 'distribution'}
            >
              유통 현황 분석
            </DropdownMenu.Item>
            <DropdownMenu.Item className='dashnav-dropdown-item' onClick={() => {
              onClick('infringement')
            }}
                               data-active={params?.idOrSlug === 'infringement'}
            >
              침해 현황 분석
            </DropdownMenu.Item>
            <DropdownMenu.Item className='dashnav-dropdown-item' onClick={() => {
              onClick('trend')
            }}
                               data-active={params?.idOrSlug === 'trend'}
            >
              동향 분석
            </DropdownMenu.Item>
          </SubMenu>
        </Menu>
      </NavItem>

      <NavItem onClick={() => {
        onClick('investigation')
      }}
               $active={params?.idOrSlug === 'investigation'}>
        수사 지원 분석
      </NavItem>
    </NavContainer>
  )
};

export default React.memo(DashNav);
