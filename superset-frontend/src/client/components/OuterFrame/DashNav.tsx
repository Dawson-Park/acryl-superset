import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@superset-ui/core';
import { useParams } from 'react-router-dom';
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

// noinspection CssUnusedSymbol
const NavItem = styled.div<Props>`
  & > a {
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
    
    &[data-active=true] {
      color: #0f111a;
    }

    &:hover {
      color: #0f111a;
      cursor: pointer;
    }
  }
  
  .dashnav-menu {
    line-height: 24px;
    display: flex;
    flex-flow: row nowrap;
    align-items: center;
    border-bottom: none !important;
  }
  .dashnav-title[data-active=true] {
    color: #0f111a;
  }
  .dashnav-submenu {
    margin: 0 !important;
    padding: 0 !important;
    position: static !important;
    border-bottom: none !important;
    
    .dashnav-dropdown-item {
      font-weight: 500;
    }
    
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

type ListType = {
  to: string;
  label: string;
};

const collection: ListType[] = [
  { label: '불법 유통 사이트 탐지 현황', to: 'collection_site' },
  { label: '불법 콘텐츠 수집 현황', to: 'collection_contents' },
  { label: '뉴스 수집 현황', to: 'collection_news' },
  { label: 'SNS 수집 현황', to: 'collection_sns' },
];
const distribution: ListType[] = [
  { label: '사이트별 유통 현황 분석', to: 'distribution_site' },
  { label: '언어별 유통 현황 분석', to: 'distribution_language' },
  { label: '장르별 유통 현황 분석', to: 'distribution_genre' },
  { label: '중점 저작물별 유통 현황 분석', to: 'distribution_focus' },
];
const infringement: ListType[] = [
  { label: '사이트별 침해 금액 추정 분석', to: 'infringement_site' },
  { label: '언어별 침해 금액 추정 분석', to: 'infringement_language' },
  { label: '장르별 침해 금액 추정 분석', to: 'infringement_genre' },
  { label: '사이트별 수익 규모 추정 분석', to: 'infringement_revenue' },
];
const trend: ListType[] = [
  { label: '뉴스 동향 분석', to: 'trend_news' },
  { label: 'SNS 동향 분석', to: 'trend_sns' },
];
const investigation: ListType[] = [
  { label: '사이트 정보 분석', to: 'investigation_site' },
  { label: '동적 응답 분석', to: 'investigation_response' },
  { label: '클러스터링 분석', to: 'investigation_clustering' },
  { label: '라이프사이클 분석', to: 'investigation_lifecycle' },
];

interface Params {
  idOrSlug: string;
}

const { SubMenu } = DropdownMenu;

const DashNav = () => {
  const params = useParams<Params>();

  const renderMenu = useCallback((title: string, list: ListType[], slug: string) => {
    return (
      <NavItem>
        <Menu mode="horizontal" triggerSubMenuAction="click" className='dashnav-menu'>
          <SubMenu title={
            <>
              <span className='dashnav-title' data-active={params?.idOrSlug.includes(slug)}>{title}</span>
              <Icons.TriangleDown className='dashnav-icon' />
            </>
          }
            // popupOffset={[0, 0]}
           className='dashnav-submenu'
          >
            {
              list.map(v => (
                <DropdownMenu.Item key={v.to} className='dashnav-dropdown-item'
                                   data-active={params?.idOrSlug === v.to}
                >
                  <Link to={linkPrefix(v.to)}>{v.label}</Link>
                </DropdownMenu.Item>
              ))
            }
          </SubMenu>
        </Menu>
      </NavItem>
    )
  }, [params])

  return (
    <NavContainer>
      <NavItem data-active={params?.idOrSlug.includes('license_dashboard')}>
        <Link to='/superset/dashboard/license_dashboard/'>대시보드</Link>
      </NavItem>
      {renderMenu('수집 현황', collection, 'collection')}
      {renderMenu('유통 현황 분석', distribution, 'distribution')}
      {renderMenu('침해 현황 분석', infringement, 'infringement')}
      {renderMenu('동향 분석', trend, 'trend')}
      {renderMenu('수사 지원 분석', investigation, 'investigation')}
    </NavContainer>
  )
  // return (
  //   <NavContainer>
  //     <NavItem onClick={() => {
  //       onClick('license_dashboard');
  //     }}
  //              $active={params?.idOrSlug === 'license_dashboard'}>
  //       대시보드
  //     </NavItem>
  //
  //     <NavItem onClick={() => {
  //       onClick('collection')
  //     }}
  //              $active={params?.idOrSlug === 'collection'}>
  //       수집 현황
  //     </NavItem>
  //
  //     <NavItem>
  //       <Menu mode="horizontal" triggerSubMenuAction="click" className='dashnav-menu'>
  //         <SubMenu title={
  //           <>
  //             유통 및 침해 분석
  //             <Icons.TriangleDown className='dashnav-icon' />
  //           </>
  //         }
  //           // popupOffset={[0, 0]}
  //                  className='dashnav-submenu'
  //         >
  //           <DropdownMenu.Item className='dashnav-dropdown-item'
  //                              onClick={() => {
  //                                onClick('distribution')
  //                              }}
  //                              data-active={params?.idOrSlug === 'distribution'}
  //           >
  //             유통 현황 분석
  //           </DropdownMenu.Item>
  //           <DropdownMenu.Item className='dashnav-dropdown-item' onClick={() => {
  //             onClick('infringement')
  //           }}
  //                              data-active={params?.idOrSlug === 'infringement'}
  //           >
  //             침해 현황 분석
  //           </DropdownMenu.Item>
  //           <DropdownMenu.Item className='dashnav-dropdown-item' onClick={() => {
  //             onClick('trend')
  //           }}
  //                              data-active={params?.idOrSlug === 'trend'}
  //           >
  //             동향 분석
  //           </DropdownMenu.Item>
  //         </SubMenu>
  //       </Menu>
  //     </NavItem>
  //
  //     <NavItem onClick={() => {
  //       onClick('investigation')
  //     }}
  //              $active={params?.idOrSlug === 'investigation'}>
  //       수사 지원 분석
  //     </NavItem>
  //   </NavContainer>
  // )
};

export default React.memo(DashNav);
