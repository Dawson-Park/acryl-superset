/* eslint-disable theme-colors/no-literal-colors */
import React from 'react';
import { styled, css } from '@superset-ui/core';
import { Link } from 'react-router-dom';
import {
  BigdataIcon,
  MonotoringIcon,
  PortalIcon,
  ReviewIcon,
  StatisticsIcon,
} from './icons';
import Dropdown from './Dropdown';
import SitemapPortal from './Sitemap';

const SideNavContainer = styled.aside`
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  //max-width: 78px;
  max-width: 90px;
  //height: fit-content;
  height: 100%;
  max-height: calc(100vh - 48px);
  overflow-y: auto;
  margin: 0;
  //padding: 20px 0;
  background-color: #246198;
  position: sticky;
  top: 0;
`;

type Props = {
  $active?: boolean;
};
const SideItemBox = styled.div`
  position: relative;
  border-bottom: 1px solid #4782b8;
  user-select: none;
`;

const SideItem = styled.a<Props>`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  gap: 8px;
  padding: 16px 8px;

  ${props =>
          props?.$active
                  ? css`
                    &,
                    &:hover {
                      background-color: #fff;
                      color: #1f4f7a;
                      text-decoration: none;
                    }
                  `
                  : css`
                    &,
                    &:hover {
                      color: #fff;
                      text-decoration: none;
                    }
                  `}//&:first-of-type {
          //  border-top: 1px solid #4782b8;
          //}
          //&:last-of-type {
          //  border-bottom: none;
          //}
`;

const SideLabel = styled.span`
  display: inline-block;
  text-align: center;
  width: 48px;
  font-family: Pretendard, 'Inter', sans-serif;
  font-weight: 400;
  font-size: 14px;
  line-height: 22px;
  letter-spacing: -0.02em;
`;

const Label = styled.div`
  width: 100%;
  position: relative;
  font-size: 14px;
  padding: 6px 4px;

  & > a {
    text-decoration: none;
    color: #fff;
    padding-left: 3px;

    &::before {
      display: inline-block;
      content: "";
      width: 3px;
      height: 3px;
      background-color: rgba(255, 255, 255, 0.9);
      vertical-align: middle;
      margin: 0 5px 2px 0;
    }
  }
`;

const Strong = styled.strong`
  font-size: 7pt;
  height: 11px;
  width: 11px;
  line-height: 11px;
  text-align: center;
  background: #ffdc8c;
  border-radius: 2px;
  display: inline-block;
  color: #333333;
  position: absolute;
  top: 10px;
  right: 3px;
`;

const list = [
  {
    label: '모니터링',
    to: '',
    icon: <MonotoringIcon />,
    more: (
      <>
        <Label>
          <a
            href="http://icopsmt.kcopa.or.kr:8080/"
            target="_blank"
            rel="noreferrer"
          >
            · 수집·분석
          </a>
        </Label>
        <Label>
          <a
            href="https://icopsmt.kcopa.or.kr/main.do"
            target="_blank"
            rel="noreferrer"
          >
            · 수집·분석 <Strong>N</Strong>
          </a>
        </Label>
        <Label>
          <a
            href="https://icopsres.kcopa.or.kr/rceptcntr/main.do"
            target="_blank"
            rel="noreferrer"
          >
            · 접수·조치
          </a>
        </Label>
      </>
    ),
  },
  {
    label: '심의',
    to: 'https://icopsres.kcopa.or.kr/dlbrt/main.do',
    icon: <ReviewIcon />,
  },
  {
    label: '통계',
    to: '',
    icon: <StatisticsIcon />,
    more: (
      <>
        <Label>
          <a
            href="http://icopsstat.kcopa.or.kr:9001/editds/report/viewer.do"
            target="_blank"
            rel="noreferrer"
          >
            · 정형통계
          </a>
        </Label>
        <Label>
          <a
            href="http://icopsstat.kcopa.or.kr:9002/main"
            target="_blank"
            rel="noreferrer"
          >
            · 비정형통계
          </a>
        </Label>
      </>
    ),
  },
  {
    label: '업무포털',
    to: 'https://icopsres.kcopa.or.kr/taskportal/main.do',
    icon: <PortalIcon />,
  },
  {
    label: '빅데이터',
    to: '',
    icon: <BigdataIcon />,
    more: (
      <>
        <Label>
          <Link to="/superset/dashboard/license_dashboard/"
                /*to='https://icopsbig.kcopa.or.kr/superset/dashboard/license_dashboard/'*/>
            · 통계분석
          </Link>
        </Label>
        <Label>
          <a
            href="http://125.129.210.132:8080/operation.do"
            target="_blank"
            rel="noreferrer"
          >
            · 운영관리
          </a>
        </Label>
      </>
    ),
  },
];

const SideNav = () => {
  const renderItem = (v: any) => (
    <SideItem
      key={v.label}
      // $active={v.label === '빅데이터 통계분석'}
      href={v.to.length > 0 ? v.to : undefined}
      target="_blank"
      rel="noreferrer"
    >
      {v.icon}
      <SideLabel>{v.label}</SideLabel>
    </SideItem>
  );

  return (
    <SideNavContainer className="kcopa-side-nav">
      <SideItemBox>
        <SitemapPortal />
      </SideItemBox>

      {list.map(v => (
        <SideItemBox data-selected={v.label === '빅데이터'}>
          {v.more ? (
            <Dropdown
              contents={v.more}
              activate={v.label === '빅데이터'}
            >
              {renderItem(v)}
            </Dropdown>
          ) : (
            renderItem(v)
          )}
        </SideItemBox>
      ))}
    </SideNavContainer>
  );
};

export default SideNav;
