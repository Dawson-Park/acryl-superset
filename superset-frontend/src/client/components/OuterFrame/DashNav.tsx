import React from 'react';
import { styled, css } from '@superset-ui/core';
import { useHistory, useParams } from 'react-router-dom';

const NavContainer = styled.nav`
  display: flex;
  flex-flow: row nowrap;
  gap: 16px;
  height: 40px;
  margin-bottom: 40px;
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
      border-bottom: 2px solid #5badf4;
    `}
`;

const linkPrefix = (str: string | number) => `/superset/dashboard/${str}/`;

type ListType = {
  to: string;
  label: string;
};
const lists: ListType[] = [
  { /* to: '10', */ label: '대시보드', to: 'license_dashboard' },
  { /* to: '9', */ label: '수집 현황', to: 'collection' },
  { /* to: '8', */ label: '유통 현황 분석', to: 'distribution' },
  { /* to: '7', */ label: '침해 현황 분석', to: 'infringement' },
  { /* to: '5', */ label: '동향 분석', to: 'trend' },
  { /* to: 'world_health', */ label: '수사 지원 분석', to: 'investigation' },
];

interface Params {
  idOrSlug: string;
}

const DashNav = () => {
  const params = useParams<Params>();
  const history = useHistory();

  // React.useEffect(() => {
  //   console.log('params', params?.idOrSlug);
  // }, [params]);

  return (
    <NavContainer>
      {lists.map(v => (
        <NavItem
          key={v.label}
          onClick={() => {
            history.push(linkPrefix(v.to));
          }}
          $active={params?.idOrSlug === v.to}
        >
          {v.label}
        </NavItem>
      ))}
    </NavContainer>
  );
};

export default React.memo(DashNav);
