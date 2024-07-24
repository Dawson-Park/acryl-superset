/* eslint-disable theme-colors/no-literal-colors */
// noinspection CssUnusedSymbol

import { styled } from '@superset-ui/core';
import React, {useMemo, useState} from 'react';
import { createPortal } from 'react-dom';
import icon from './icons/hamburger.png';
import close from './icons/CloseButton.png';

type SessionType = {
  jtoken: string;
  mberid: string;
  mbernm: string;
}

interface CommonProps {
  sessions: SessionType;
}

const HamburgerIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 20px;
  border-radius: 0;
  background-color: #246198;
  cursor: pointer;

  & > img {
    height: 60%;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 3000;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: #fff;
  overflow-y: auto;
`;
const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  height: 60px;
  padding: 20px;
  background: #246198;

  & h1 {
    width: auto;
    height: auto;
    font-size: 22px;
    color: #fff;
  }

  & div.button {
    width: 20px;
    height: 20px;
    display: inline-block;
    background-color: transparent;
    cursor: pointer;
    outline: none;
  }

  & img {
    width: 100%;
    height: 100%;
  }
`;
const ModalBody = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 20px;
  padding: 20px;

  .menu {
    h2 {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 72px;
      margin-bottom: 15px;
      color: #005098;
      font-size: 18px;
      border-color: rgba(173, 173, 173, 0.3);
      border-style: solid;
      border-width: 1px 0;
      background-color: #e7eefb;
      background-repeat: no-repeat;
      //background-position: 94% 79%;
      //background-size: 30px;

      .background-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        
        color: #fff;
        width: 40px;
        height: 40px;
        position: absolute;
        top: 94%;
        left: 75%;
        transform: translate(50%, -100%);
      }
    }
    .submu {
      display: inline-block;
      width: calc(50% - 7px);
      vertical-align: top;
      & + .submu {
        margin-left: 10px;
      }
      h3 {
        font-size: 15px;
        text-align: center;
        padding: 3px;
        margin-bottom: 15px;
        background-color: #eef0f4;
      }
    }
    .contents {
      h4 {
        margin-bottom: 5px;
        font-weight: 500;
        border-top: #e0e0e0 1px solid;
        border-bottom: #e0e0e0 1px solid;
        background-color: #f8f8f8;
        text-align: center;
        padding: 3px;

        & + ul {
          margin-bottom: 18px;
        }
      }
      li {
        padding: 0 5px;
        margin-top: 4px;

        a {
          &::before {
            display: inline-block;
            content: '';
            width: 3px;
            height: 3px;
            margin: 0 5px 2px 7px;
            border-radius: 2px;
            background-color: #aaa;
          }
        }
      }
    }
  }
  .menu {
    flex-basis: 100px;
  }
  .menu.monitoring, .menu.bigdata {
    //width: 40%;
    flex-grow: 2;
    h2 {
      height: 40px;
      .background-icon {
        top: 100%;
        left: 82%;
      }
    }
  }
  .menu.review, .menu.statistical, .menu.portal, .menu.monitor-tool {
    //width: 20%;
    flex-grow: 1;
  }

  ul {
    list-style: none;
    margin: 0;
    padding: 0;

    &.f-large a {
      display: block;
      font-size: 15px;
      padding: 3px;
      margin: 0 -5px 10px;
      background-color: #eef0f4;
    }
  }

  a {
    color: #393939;
    text-decoration: none;
    &::before {
      display: inline-block;
      content: '';
      width: 3px;
      height: 3px;
      margin: 0 5px 2px 7px;
      border-radius: 2px;
      background-color: #aaa;
    }
  }
`;

interface Props {
  onClose?: () => void;
}

const A = ({ children, to }: { children?: string; to?: string }) => (
  <a href={to} target="_blank" rel="noreferrer">
    {children}
  </a>
);

const Monitoring = ({ sessions }:CommonProps) => (
  <div className="menu monitoring">
    <h2>
      모니터링
      <div className="background-icon">
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M32 18C34.2091 18 36 16.2091 36 14C36 11.7909 34.2091 10 32 10C29.7909 10 28 11.7909 28 14C28 16.2091 29.7909 18 32 18ZM36.5617 17.8977C37.4585 16.8492 38 15.4878 38 14C38 10.6863 35.3137 8 32 8C28.6863 8 26 10.6863 26 14C26 17.3137 28.6863 20 32 20C33.1015 20 34.1336 19.7032 35.0208 19.1852L37.134 21.2983C37.5245 21.6889 38.1577 21.6889 38.5482 21.2983C38.9387 20.9078 38.9387 20.2747 38.5482 19.8841L36.5617 17.8977ZM9 15C9 14.4477 9.44772 14 10 14H22.5C23.0523 14 23.5 13.5523 23.5 13C23.5 12.4477 23.0523 12 22.5 12H10C8.34315 12 7 13.3431 7 15V27V32V33C7 34.1046 7.89543 35 9 35H10H20V38H19C18.4477 38 18 38.4477 18 39C18 39.5523 18.4477 40 19 40H21H27H29C29.5523 40 30 39.5523 30 39C30 38.4477 29.5523 38 29 38H28V35H38H39C40.1046 35 41 34.1046 41 33V32V27V24.5C41 23.9477 40.5523 23.5 40 23.5C39.4477 23.5 39 23.9477 39 24.5V27H9V15ZM26 38V35H22V38H26ZM38 33H27H21H10C9.44772 33 9 32.5523 9 32V29H39V32C39 32.5523 38.5523 33 38 33ZM12 19C12 18.4477 12.4477 18 13 18H24C24.5523 18 25 18.4477 25 19C25 19.5523 24.5523 20 24 20H13C12.4477 20 12 19.5523 12 19ZM13 22C12.4477 22 12 22.4477 12 23C12 23.5523 12.4477 24 13 24H30C30.5523 24 31 23.5523 31 23C31 22.4477 30.5523 22 30 22H13Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </h2>
    <div className="submu">
      <h3>수집ㆍ분석</h3>
      <div className="contents">
        <h4>대시보드</h4>
        <ul>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=2`}>
              대시보드
            </A>
          </li>
        </ul>

        <h4>프로파일링</h4>
        <ul>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=9`}>
              사이트 프로파일링
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=10`}>
              침해그룹 추적
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=34`}>
              COPY112 수집분석
            </A>
          </li>
        </ul>

        <h4>차단업무</h4>
        <ul>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=11`}>
              접속차단 요청
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=12`}>
              검색제한 요청
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=12`}>
              검색ㆍ수집
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=12`}>
              대량조회
            </A>
          </li>
        </ul>

        <h4>심의연계업무</h4>
        <ul>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=15`}>
              수집내역 검수
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=16`}>
              ICOP-W
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=17`}>
              신규URL 수집
            </A>
          </li>
        </ul>

        <h4>수집ㆍ운영 현황</h4>
        <ul>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=18`}>
              수집통계 및 리포트
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=19`}>
              ICOP-W 통계
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=20`}>
              ICOP-T 통계
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=21`}>
              수집목록
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=22`}>
              채증목록
            </A>
          </li>
        </ul>

        <h4>운영 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=23`}>
              중점 저작물 조회
            </A>
          </li>
          <li>
            <A
              to={`https://icopsmt.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=24`}>
              수집 대상사이트 관리
            </A>
          </li>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/mgmtCollector/index.do`}>
              수집기 관리
            </A>
          </li>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/mgmtKeyword/index.do`}>
              검색ㆍ수집 관리
            </A>
          </li>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/mgmtKeyword/index.do`}>
              특징점 관리
            </A>
          </li>
          <li>
            <A to={`https://icopsmt.kcopa.or.kr/feature-management`}>
              시스템 운영
            </A>
          </li>
        </ul>

        <h4>운영 로그</h4>
        <ul>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/logAlarm/index.do`}>
              알람 이력
            </A>
          </li>
          {/*<li>*/}
          {/*  <A to={`http://icopsmt.kcopa.or.kr:8080/acct/logMonitoringTool/index.do">*`}}
          {/*    모니터링 도구 이력*/}
          {/*  </A>*/}
          {/*</li>*/}
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/logCollector/index.do`}>
              수집기 운영 이력
            </A>
          </li>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/logAdminAction/index.do`}>
              행정조치 이력
            </A>
          </li>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/logTextDscrmnt/index.do`}>
              변형 텍스트 분석 이력
            </A>
          </li>
          <li>
            <A to={`http://icopsmt.kcopa.or.kr:8080/acct/logKeypointDscrmnt/index.do`}>
              특징점 분석 이력
            </A>
          </li>
        </ul>
      </div>
    </div>

    <div className="submu">
      <h3>접수ㆍ조치</h3>
      <div className="contents">
        <h4>신고 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=8`}>
              신고 배정
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=9`}>
              민원 신고 관리
            </A>
          </li>
        </ul>

        <h4>보호요청 및 민관협력 조치</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=10`}>
              보호요청 신청 접수
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=11`}>
              보호요청 저작물 목록
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=12`}>
              조치 목록
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=13`}>
              OSP 안내 발송
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=14`}>
              OSP 이행 확인
            </A>
          </li>
        </ul>

        <h4>모니터링 도구 신고 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=15`}>
              불법복제물 신고 접수
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=16`}>
              검색제한 요청관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=17`}>
              광고게재중단요청 신고 접수
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=18`}>
              광고게재중단요청 협조공문관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=36`}>
              신규 차단 사이트 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=19`}>
              접속차단 요청관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=20`}>
              해와유통현황 조사ㆍ관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=49`}>
              기타 안건 관리
            </A>
          </li>
        </ul>

        <h4>모니터링 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=21`}>
              계정정지
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=22`}>
              상습유포자 관리
            </A>
          </li>
        </ul>

        <h4>시정권고 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=23`}>
              불법복제물 심의요청 현황
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=24`}>
              시정권고서 생성
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=25`}>
              시정권고서 발송
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=26`}>
              권고 이행
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=50`}>
              시정권고서 발송내역
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=27`}>
              권고대장
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=28`}>
              이의신청
            </A>
          </li>
        </ul>

        <h4>재택근로자 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=29`}>
              재택근로자 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=30`}>
              모니터링 배정 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=32`}>
              일일보고 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=34`}>
              공지사항 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=35`}>
              재직ㆍ경력 증명서 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=38`}>
              모니터링 계정 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=39`}>
              근무조 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=40`}>
              휴일 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=41`}>
              연차 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=42`}>
              휴가신청 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=43`}>
              평가 그룹(회차) 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=44`}>
              평가 현황
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=45`}>
              근태 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=46`}>
              복무 확인 관리
            </A>
          </li>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=51`}>
              연간 목표 관리
            </A>
          </li>
        </ul>

        <h4>자료 관리</h4>
        <ul>
          <li>
            <A
              to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/rceptcntr/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=48`}>
              자료 관리
            </A>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Review = ({ sessions }:CommonProps) => (
  <div className='menu review'>
    <h2>
      심의
      <div className='background-icon'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M19.4286 15.96C19.4286 13.3974 21.4753 11.32 24 11.32C26.5247 11.32 28.5714 13.3974 28.5714 15.96C28.5714 18.5226 26.5247 20.6001 24 20.6001C21.4753 20.6001 19.4286 18.5226 19.4286 15.96ZM24 9C20.2129 9 17.1429 12.1161 17.1429 15.96C17.1429 19.804 20.2129 22.9201 24 22.9201C27.7871 22.9201 30.8571 19.804 30.8571 15.96C30.8571 12.1161 27.7871 9 24 9ZM29.0166 26.2108C29.3298 25.789 29.8843 25.6352 30.3654 25.8367L37.0075 28.6199C37.4353 28.7991 37.7143 29.2224 37.7143 29.6921V34.52C37.7143 35.1606 37.2026 35.68 36.5714 35.68H11.4286C10.7974 35.68 10.2857 35.1606 10.2857 34.52V30.1906C10.2857 29.7417 10.5409 29.3331 10.9409 29.1415L17.6383 25.9343C18.1281 25.6998 18.7128 25.8463 19.0387 26.2853L23.0873 31.7381C23.3032 32.0289 23.6412 32.2 24 32.2C24.3588 32.2 24.6968 32.0289 24.9127 31.7381L29.0166 26.2108ZM31.2376 23.6923C29.7944 23.0876 28.1309 23.5489 27.1912 24.8145L24 29.1126L20.8641 24.889C19.8863 23.5721 18.1323 23.1325 16.663 23.8361L9.96563 27.0433C8.76561 27.618 8 28.8439 8 30.1906V34.52C8 36.4419 9.53502 38 11.4286 38H36.5714C38.465 38 40 36.4419 40 34.52V29.6921C40 28.2831 39.1629 27.0131 37.8797 26.4754L31.2376 23.6923ZM13.657 14.4601C13.2106 14.0071 12.487 14.0071 12.0407 14.4601L11.2325 15.2805L10.4246 14.4605C9.97826 14.0075 9.25464 14.0075 8.80833 14.4605C8.36201 14.9135 8.36201 15.648 8.80833 16.101L9.61621 16.921L8.80823 17.7411C8.36192 18.1941 8.36192 18.9286 8.80823 19.3816C9.25454 19.8346 9.97816 19.8346 10.4245 19.3816L11.2325 18.5615L12.0408 19.382C12.4871 19.835 13.2107 19.835 13.6571 19.382C14.1034 18.929 14.1034 18.1945 13.6571 17.7415L12.8487 16.921L13.657 16.1006C14.1033 15.6476 14.1033 14.9131 13.657 14.4601ZM34.9332 17.12C34.9332 16.2017 35.6667 15.4573 36.5714 15.4573C37.4762 15.4573 38.2096 16.2017 38.2096 17.12C38.2096 18.0384 37.4762 18.7828 36.5714 18.7828C35.6667 18.7828 34.9332 18.0384 34.9332 17.12ZM36.5714 13.64C34.6779 13.64 33.1429 15.1981 33.1429 17.12C33.1429 19.042 34.6779 20.6001 36.5714 20.6001C38.465 20.6001 40 19.042 40 17.12C40 15.1981 38.465 13.64 36.5714 13.64Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </h2>
    <div className='contents'>
      <h4>안건 관리</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=5`}>
            불법복제물/계정정지
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=6`}>
            검색결과 제한
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=7`}>
            정보제공 청구
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=16`}>
            기타 안건(N)
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=17`}>
            서면 심의
          </A>
        </li>
      </ul>

      <h4>심의위원회 개최</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=8`}>
            불법복제물/계정정지
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=9`}>
            검색결과 제한
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=10`}>
            정보제공 청구
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=11`}>
            기타 안건
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=18`}>
            기타 안건(N)
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=19`}>
            서면 심의
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=12`}>
            심의이슈 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=21`}>
            불법복제물 안건 관리
          </A>
        </li>
      </ul>

      <h4>심의위원회 관리</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=13`}>
            심의위원 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=14`}>
            위원회 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/dlbrt/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=15`}>
            공지사항 관리
          </A>
        </li>
      </ul>
    </div>

    <h2>
      통계
      <div className='background-icon'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d='M36.2667 11.1668C37.1503 11.1668 37.8667 10.4505 37.8667 9.5668C37.8667 8.68314 37.1503 7.9668 36.2667 7.9668C35.383 7.9668 34.6667 8.68314 34.6667 9.5668C34.6667 9.96556 34.8125 10.3303 35.0538 10.6104L28.379 17.7024C28.1815 17.6152 27.9631 17.5668 27.7333 17.5668C27.3171 17.5668 26.9379 17.7258 26.6533 17.9863L20.7996 14.8643C20.7806 13.9972 20.0717 13.3001 19.2 13.3001C18.3163 13.3001 17.6 14.0165 17.6 14.9001C17.6 14.9994 17.609 15.0966 17.6263 15.1908L10.7275 18.0315C10.4382 17.7443 10.0398 17.5668 9.6 17.5668C8.71634 17.5668 8 18.2831 8 19.1668C8 20.0505 8.71634 20.7668 9.6 20.7668C10.4837 20.7668 11.2 20.0505 11.2 19.1668C11.2 19.1085 11.1969 19.051 11.1908 18.9943L18.1668 16.1218C18.4455 16.3578 18.8062 16.5001 19.2 16.5001C19.7098 16.5001 20.1638 16.2617 20.4568 15.8904L26.1511 18.9273C26.1394 19.0055 26.1333 19.0854 26.1333 19.1668C26.1333 20.0505 26.8497 20.7668 27.7333 20.7668C28.617 20.7668 29.3333 20.0505 29.3333 19.1668C29.3333 18.9025 29.2692 18.6532 29.1558 18.4335L36.0137 11.1469C36.0961 11.16 36.1806 11.1668 36.2667 11.1668ZM37.8667 17.5668H35.7333V38.9001H37.8667V17.5668ZM33.6 15.4335V41.0335H40V15.4335H33.6ZM20.8 23.9668H18.6667V38.9001H20.8V23.9668ZM16.5333 21.8335V41.0335H22.9333V21.8335H16.5333ZM10.1333 26.1001V38.9001H12.2667V26.1001H10.1333ZM8 23.9668V41.0335H14.4V23.9668H8ZM27.2 26.1001H29.3333V38.9001H27.2V26.1001ZM25.0667 41.0335V23.9668H31.4667V41.0335H25.0667Z'
            fill='currentColor'
          />
        </svg>
      </div>
    </h2>
    <div className='contents'>
      <ul className='f-large'>
        <li>
          <A to='http://125.129.210.190:9001/editds/report/edit.do?USER=dudaji1&assign_name=bWVpcw=='>
            정형통계
          </A>
        </li>
        <li>
          <A to='http://icopsstat.kcopa.or.kr:9002/'>
            비정형통계
          </A>
        </li>
      </ul>
    </div>
  </div>
);

const Portal = ({ sessions }:CommonProps) => (
  <div className='menu portal'>
    <h2>
      업무포털
      <div className='background-icon'>
        <svg
          width='100%'
          height='100%'
          viewBox='0 0 48 48'
          fill='none'
          xmlns='http://www.w3.org/2000/svg'
        >
          <path
            fillRule='evenodd'
            clipRule='evenodd'
            d="M38 28H10V31H21H27H38V28ZM10 33H20V36H19C18.4477 36 18 36.4477 18 37C18 37.5523 18.4477 38 19 38H21H27H29C29.5523 38 30 37.5523 30 37C30 36.4477 29.5523 36 29 36H28V33H38C39.1046 33 40 32.1046 40 31V26V13C40 11.8954 39.1046 11 38 11H10C8.89543 11 8 11.8954 8 13V26V31C8 32.1046 8.89543 33 10 33ZM26 36V33H22V36H26ZM38 13V26H10V13L38 13ZM11.5 15.1C11.5 14.7686 11.7686 14.5 12.1 14.5H20.9C21.2314 14.5 21.5 14.7686 21.5 15.1V17.9C21.5 18.2314 21.2314 18.5 20.9 18.5H12.1C11.7686 18.5 11.5 18.2314 11.5 17.9V15.1ZM12.5 15.5V17.5H20.5V15.5H12.5ZM12.1 20.5C11.7686 20.5 11.5 20.7686 11.5 21.1V23.9C11.5 24.2314 11.7686 24.5 12.1 24.5H20.9C21.2314 24.5 21.5 24.2314 21.5 23.9V21.1C21.5 20.7686 21.2314 20.5 20.9 20.5H12.1ZM12.5 23.5V21.5H20.5V23.5H12.5ZM30 15.5C30 15.2239 30.2239 15 30.5 15H33.5C33.7761 15 34 15.2239 34 15.5C34 15.7761 33.7761 16 33.5 16H30.5C30.2239 16 30 15.7761 30 15.5ZM30.5 21C30.2239 21 30 21.2239 30 21.5C30 21.7761 30.2239 22 30.5 22H33.5C33.7761 22 34 21.7761 34 21.5C34 21.2239 33.7761 21 33.5 21H30.5ZM30 17.5C30 17.2239 30.2239 17 30.5 17H35.5C35.7761 17 36 17.2239 36 17.5C36 17.7761 35.7761 18 35.5 18H30.5C30.2239 18 30 17.7761 30 17.5ZM30.5 23C30.2239 23 30 23.2239 30 23.5C30 23.7761 30.2239 24 30.5 24H35.5C35.7761 24 36 23.7761 36 23.5C36 23.2239 35.7761 23 35.5 23H30.5ZM24.3 15.25C24.2724 15.25 24.25 15.2724 24.25 15.3V17.7C24.25 17.7276 24.2724 17.75 24.3 17.75H26.7C26.7276 17.75 26.75 17.7276 26.75 17.7V16.5C26.75 16.3619 26.8619 16.25 27 16.25C27.1381 16.25 27.25 16.3619 27.25 16.5V17.7C27.25 18.0038 27.0038 18.25 26.7 18.25H24.3C23.9962 18.25 23.75 18.0038 23.75 17.7V15.3C23.75 14.9962 23.9962 14.75 24.3 14.75H25.5C25.6381 14.75 25.75 14.8619 25.75 15C25.75 15.1381 25.6381 15.25 25.5 15.25H24.3ZM24.25 21.3C24.25 21.2724 24.2724 21.25 24.3 21.25H25.5C25.6381 21.25 25.75 21.1381 25.75 21C25.75 20.8619 25.6381 20.75 25.5 20.75H24.3C23.9962 20.75 23.75 20.9962 23.75 21.3V23.7C23.75 24.0038 23.9962 24.25 24.3 24.25H26.7C27.0038 24.25 27.25 24.0038 27.25 23.7V22.5C27.25 22.3619 27.1381 22.25 27 22.25C26.8619 22.25 26.75 22.3619 26.75 22.5V23.7C26.75 23.7276 26.7276 23.75 26.7 23.75H24.3C24.2724 23.75 24.25 23.7276 24.25 23.7V21.3ZM27.1768 15.1768L25.6768 16.6768C25.5791 16.7744 25.4209 16.7744 25.3232 16.6768L24.8232 16.1768C24.7256 16.0791 24.7256 15.9209 24.8232 15.8232C24.9209 15.7256 25.0791 15.7256 25.1768 15.8232L25.5 16.1464L26.8232 14.8232C26.9209 14.7256 27.0791 14.7256 27.1768 14.8232C27.2744 14.9209 27.2744 15.0791 27.1768 15.1768ZM25.6768 22.6768L27.1768 21.1768C27.2744 21.0791 27.2744 20.9209 27.1768 20.8232C27.0791 20.7256 26.9209 20.7256 26.8232 20.8232L25.5 22.1464L25.1768 21.8232C25.0791 21.7256 24.9209 21.7256 24.8232 21.8232C24.7256 21.9209 24.7256 22.0791 24.8232 22.1768L25.3232 22.6768C25.4209 22.7744 25.5791 22.7744 25.6768 22.6768Z"
            fill="currentColor"
          />
        </svg>
      </div>
    </h2>
    <div className="contents">
      <h4>과학수사지원 이력 관리</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=6`}>
            수거ㆍ삭제/계도ㆍ홍보 실적 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=7`}>
            디지털포렌식 수사지원
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=8`}>
            유통분석시스템 지원
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=26`}>
            SW단속 실적 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=27`}>
            SW단속 실적 현황
          </A>
        </li>
      </ul>

      <h4>해외 지원사업 관리</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=9`}>
            수권신청 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=10`}>
            경고장 발송/삭제현황 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=28`}>
            바우처지원사업 관리(참여기업/개인)
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=37`}>
            바우처지원사업 관리(수행기관)
          </A>
        </li>
      </ul>
      <h4>민원ㆍ신고ㆍ상담 관리</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=11`}>
            온라인 상담 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=29`}>
            공익신고 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=30`}>
            공익신고 처리담당 지정
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=13`}>
            국민신문고 신고 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=14`}>
            악성민원 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=31`}>
            악성민원인 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=15`}>
            민원유형 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=16`}>
            전화상담 이력 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=23`}>
            컨설팅/대면상담 관리
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=33`}>
            컨설턴트 관리
          </A>
        </li>
      </ul>

      <h4>문서 관리</h4>
      <ul>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=17`}>
            사업지원 양식 관리
          </A>
        </li>
        <li>
          <A to={`http://125.129.210.206/p/cims`}>
            공동편집
          </A>
        </li>
        <li>
          <A
            to={`https://icopsres.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/taskportal/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=24`}>
            한글 편집
          </A>
        </li>
      </ul>
    </div>
  </div>
);

const MonitoringTool = ({ sessions }:CommonProps) => (
  <div className='menu monitor-tool'>
    <h2>
      모니터링 도구
      <div className='background-icon'>
        <svg width='80%' height='80%' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'
             xmlnsXlink='http://www.w3.org/1999/xlink'>
          <rect x='2' y='3' width='36' height='34' fill='url(#pattern0_43_74)'/>
          <defs>
            <pattern id='pattern0_43_74' patternContentUnits='objectBoundingBox' width='1' height='1'>
              <use xlinkHref='#image0_43_74' transform='matrix(0.027027 0 0 0.0286169 0 -0.000794913)'/>
            </pattern>
            <image id='image0_43_74' width='37' height='35'
                   xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACUAAAAjCAYAAAATx8MeAAACNklEQVR4Xs2WsU5VQRCGKQxBCkyMJhRi9CH0GRArIsob0JvwACb6CMTCWBAsLIFEwY6WoIm1iVZWUGhMMDbGcf45s8Mw55zdcwrY+ycf++/8s3vO3Xu5504R0TzzjvlNdYXrv2fmp/jPbghrawc3daoT+NpAp8lAsaEGIjMuGMs2882BeewZisiMC4Yw6/x35g2zpiPmKbvasTaHyIwLStxmfjKbzAvmL7OsGUbMn2uOvoWwPofIjAtK4DS+Mp+YX8xTOjs5jJijjhx96I979CEy44Ic95l/zKLOr3f0+Dr60I91sacLkRkX5PhAzVtyN9SfMK909HX0oR/r4l5diMy4IAcuckjNhea0tkrN52hPR8xRv6Z96I8vog+RGReUeKj9V3T+kjlQjxFz+GntQ3/cow+RGRfkwCv+SOdPaoWaE8JbhPGR1tNJHem6uFcXIjMuyJE+U3dC/TE1J4TR19Nnaj/U+xCZcUGOe9T8Ny3p/GZHD7ih4wPtx7rY04XIjAtKbFHzOPlMzc+NdTr/PYU5HvLI0Yf+uEcfIjMuKHGL+cG8Zp5R9zc66sjRh/64Rx8iMy4YwozzuWef7xuCyIwLxjIxvxIuCpEZF9REZGaSNPE3FY+yBiIzLqiJyIwLaiKCOVGfnle1wPWhY0w2dDIp2sBN4SH6lvkTwssWro/7mI1HOIakWC9lRVqFESTFeikr0iqMICnWS1mRVmEESbFeyoq0CgP4QuOE/rhHllZhABd+U/8BMyDJV8x0S+EAAAAASUVORK5CYII='/>
          </defs>
        </svg>
      </div>
    </h2>
    <div className='contents'>
      <h4>모니터링 등록</h4>
      <ul>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=6`}>
            불법복제물
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=7`}>
            광고게재중단요청
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=8`}>
            해외유통현황 조사
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=21`}>
            ICOP-W
          </A>
        </li>
      </ul>

      <h4>모니터링 관리</h4>
      <ul>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=16`}>
            불법복제물 신고현황
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=17`}>
            해외유통현황 조사
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=18`}>
            광고게재중단요청현황
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=9`}>
            모니터링 배정
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=10`}>
            공지사항
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=11`}>
            일일보고
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=19`}>
            근태 현황
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=20`}>
            휴가신청
          </A>
        </li>
      </ul>

      <h4>수탁 모니터링 관리</h4>
      <ul>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=12`}>
            불법복제물
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=13`}>
            광고게재중단요청
          </A>
        </li>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=15`}>
            해외유통현황 조사
          </A>
        </li>
      </ul>

      <h4>증명서 관리</h4>
      <ul>
        <li>
          <A to={`https://montool.kcopa.or.kr/cmmn/sysLink.do?REDIRECT_URL=/montool/main.do&JTOKEN=${sessions.jtoken}#MENU_ID=14`}>
            재직 증명서
          </A>
        </li>
      </ul>
      
    </div>
  </div>
);

const Bigdata = ({ sessions }:CommonProps) => (
  <div className="menu bigdata">
    <h2>
      빅데이터
      <div className='background-icon'>
        <svg width='80%' height='80%' viewBox='0 0 40 40' fill='none' xmlns='http://www.w3.org/2000/svg'
             xmlnsXlink='http://www.w3.org/1999/xlink'>
          <rect x='2' y='5' width='36' height='30' fill='url(#pattern0_45_80)'/>
          <defs>
            <pattern id='pattern0_45_80' patternContentUnits='objectBoundingBox' width='1' height='1'>
              <use xlinkHref='#image0_45_80' transform='matrix(0.0222222 0 0 0.0266667 0 -0.00666667)'/>
            </pattern>
            <image id='image0_45_80' width='45' height='38'
                   xlinkHref='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAmCAYAAABQ3RJZAAADkUlEQVR4Xs2YWahOURTHzVFkuq4XQ6GUB6RLHoREUoiIF3kwljIlmUo3kWRKSSnq8uDBEKHMirwZ8+CJB2Uo85B5WNbf2ut+5669z/n2Ob4P//rVt/977eHb5+x19jnNiKhZBahlZjPbmIPMUWY/s4IZzjQPtCmMZ+RkIHOc+U7Zus8sZFqR30duPCOSlsxG5huJPjOnmVXMLGYaM5/Zwzx0MdAtpj/5/eXCMyJow5wgEVZ4B9M9EKe0IPkTD1ybN8yIQFw0nhHBARI9Z0YG6tNoT3KvQ5h4v0BMFJ5RBqwY9JYZFKgvB26rYyS66co2piyekUE75gmJFgTqY8Bqr2U+UUk/SPrdQpF/wjMymEsibKYiKWws85SyhSs4lPy2TfCMDM6RaF6grhxIjZpprjGTmU4kfx55/DCV0ibihpDfRyOeYahhpjJrmK8kQr7tGojNoidzg1lP6VepD8kGhV5nxKVOegDJTtfVscKqnCFZJdv2T+hLpRWvD9T/xhrYCJupNNkvzHlmO0luPsScZD64+p/MPqYtBTovyCkS4f7vHKhvMmlM+IhrgEnvYrrZBo4OzAbmo4s/G4gpyngq6SUz08YkC1tdIO4r7HTbWQhsGDym7wbqioIFQRrEVYZwNZcnY/THsETgmGRABK2pQgehBMguo5klJPc4Jj5D6zUIhx0I5wjbwb9mMYmeMV3gwcRhB6uMlJY3lf0tLpNoHcowsOzQBRP4PzGORPdQhoHZQ7G3xiUXXymhPzuGBXvmvYuvgYG8DK02gWlUQ3aMEHdcbB0Km1yhPhAYQmX9IqisH+K2ix2MwiJXaAgEhlCllfOgsr4F55BXLrYWBo6CEM60eDWyDSyqtHIeVNa31Lm4RyjDwL/Q97fpicA0VNYvgsr6Fn1N24mymngTgR5T+nlDqYbsGEmmkDwR8bbTC55W4LB0Ea1Jdmlv54eohuwYyiQqnSiXqZ8MwDEQyRt6wSwleS+0HamsXwSV9Xswe0me1NDuZL0N7khyXlYhoeMKNJB0AlTlBo5BpX1jnOtUmiwOcCvJtLOdKBOYq5T9ucsObPuIIU3vSL6vBL+NeIYB74gTSTaqorKxRVBp33OYUSRfsWxsI54RQTVkx8jEMyKohuwYmXhGBCrrF0Fl/Uw8IwJVWjkPKutn4hkRqNLKeVBZPxPPiEBl/SKorJ+JZ0RQDdkxMvGMCK5QZYWHmB0jk1/hy6olcN5s4wAAAABJRU5ErkJggg=='/>
          </defs>
        </svg>

      </div>
    </h2>
    <div className='submu'>
      <h3>통계분석</h3>
      <div className='contents'>
        <h4>대시보드</h4>
        <ul>
          <li>
            <A to={`/superset/dashboard/license_dashboard/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              대시보드
            </A>
          </li>
        </ul>

        <h4>수집현황</h4>
        <ul>
          <li>
            <A to={`/superset/dashboard/collection_site/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              불법유통사이트 탐지 현황
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/collection_contents/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              불법 콘텐츠 수집 현황
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/collection_news/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              뉴스 수집 현황
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/collection_sns/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              SNS 수집 현황
            </A>
          </li>
        </ul>

        <h4>유통 현황 분석</h4>
        <ul>
          <li>
            <A to={`/superset/dashboard/distribution_site/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              사이트별 유통 현황 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/distribution_language/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              언어별 유통 현황 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/distribution_genre/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              장르별 유통 현황 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/distribution_focus/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              중점 저작물별 유통 현황 분석
            </A>
          </li>
        </ul>

        <h4>침해 현황 분석</h4>
        <ul>
          <li>
            <A to={`/superset/dashboard/infringement_site/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              사이트별 침해 금액 추정 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/infringement_language/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              언어별 침해 금액 추정 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/infringement_genre/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              장르별 침해 금액 추정 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/infringement_revenue/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              사이트별 수입 규모 추정 분석
            </A>
          </li>
        </ul>

        <h4>동향 분석</h4>
        <ul>
          <li>
            <A to={`/superset/dashboard/trend_news/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              뉴스 동향 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/trend_sns/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              SNS 동향 분석
            </A>
          </li>
        </ul>

        <h4>수사 지원 분석</h4>
        <ul>
          <li>
            <A to={`/superset/dashboard/investigation_site/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              사이트 정보 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/investigation_response/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              동적 응답 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/investigation_clustering/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              클러스터링 분석
            </A>
          </li>
          <li>
            <A to={`/superset/dashboard/investigation_lifecycle/?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              라이프사이클 분석
            </A>
          </li>
        </ul>
      </div>
    </div>

    <div className='submu'>
      <h3>운영관리</h3>
      <div className='contents'>
        <h4>수집운영 관리</h4>
        <ul>
          <li>
            <A to={`http://icopsbig.kcopa.or.kr:8080/operation.do?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              탐지사이트 관리
            </A>
          </li>
          <li>
            <A to={`http://icopsbig.kcopa.or.kr:8080/keyWordManage.do?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              키워드 관리
            </A>
          </li>
          <li>
            <A to={`http://icopsbig.kcopa.or.kr:8080/systemManage.do?JTOKEN=${sessions.jtoken}&MBER_ID=${sessions.mberid}&MBER_NM=${sessions.mbernm}`}>
              시스템 관리
            </A>
          </li>
        </ul>
      </div>
    </div>
  </div>
);

const Sitemap = ({onClose}: Props) => {
  const sessions = useMemo<SessionType>(() => {
    const jtoken = window.sessionStorage.getItem('JTOKEN');
    const mberid = window.sessionStorage.getItem('MBER_ID');
    const mbernm = window.sessionStorage.getItem('MBER_NM');

    return {
      jtoken: jtoken ?? '',
      mberid: mberid ?? '',
      mbernm: mbernm ?? '',
    };
  }, []);

  return (
    <ModalContainer>
      <ModalHeader>
        <h1>전체메뉴</h1>
        {/* eslint-disable-next-line jsx-a11y/interactive-supports-focus */}
        <div className='button' onClick={onClose} role='button'>
          <img src={close} alt='창닫기'/>
        </div>
      </ModalHeader>
      <ModalBody>
        <Monitoring sessions={sessions} />
        <Review sessions={sessions} />
        {/*<Statistical sessions={sessions}/>*/}
        <Portal sessions={sessions} />
        <MonitoringTool sessions={sessions} />
        <Bigdata sessions={sessions} />
      </ModalBody>
    </ModalContainer>
  );
};

const SitemapPortal = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <HamburgerIcon onClick={() => setOpen(true)}>
        <img src={icon} alt="HamburgerIcon"/>
      </HamburgerIcon>
      <>
        {createPortal(
          open ? <Sitemap onClose={() => setOpen(false)}/> : null,
          document.body,
        )}
      </>
    </>
  );
};

export default SitemapPortal;

// const Statistical = ({sessions}: CommonProps) => (
//   <div className='menu statistical'>
//     <h2>
//       통계
//       <div className='background-icon'>
//         <svg
//           width='100%'
//           height='100%'
//           viewBox='0 0 48 48'
//           fill='none'
//           xmlns='http://www.w3.org/2000/svg'
//         >
//           <path
//             fillRule='evenodd'
//             clipRule='evenodd'
//             d='M36.2667 11.1668C37.1503 11.1668 37.8667 10.4505 37.8667 9.5668C37.8667 8.68314 37.1503 7.9668 36.2667 7.9668C35.383 7.9668 34.6667 8.68314 34.6667 9.5668C34.6667 9.96556 34.8125 10.3303 35.0538 10.6104L28.379 17.7024C28.1815 17.6152 27.9631 17.5668 27.7333 17.5668C27.3171 17.5668 26.9379 17.7258 26.6533 17.9863L20.7996 14.8643C20.7806 13.9972 20.0717 13.3001 19.2 13.3001C18.3163 13.3001 17.6 14.0165 17.6 14.9001C17.6 14.9994 17.609 15.0966 17.6263 15.1908L10.7275 18.0315C10.4382 17.7443 10.0398 17.5668 9.6 17.5668C8.71634 17.5668 8 18.2831 8 19.1668C8 20.0505 8.71634 20.7668 9.6 20.7668C10.4837 20.7668 11.2 20.0505 11.2 19.1668C11.2 19.1085 11.1969 19.051 11.1908 18.9943L18.1668 16.1218C18.4455 16.3578 18.8062 16.5001 19.2 16.5001C19.7098 16.5001 20.1638 16.2617 20.4568 15.8904L26.1511 18.9273C26.1394 19.0055 26.1333 19.0854 26.1333 19.1668C26.1333 20.0505 26.8497 20.7668 27.7333 20.7668C28.617 20.7668 29.3333 20.0505 29.3333 19.1668C29.3333 18.9025 29.2692 18.6532 29.1558 18.4335L36.0137 11.1469C36.0961 11.16 36.1806 11.1668 36.2667 11.1668ZM37.8667 17.5668H35.7333V38.9001H37.8667V17.5668ZM33.6 15.4335V41.0335H40V15.4335H33.6ZM20.8 23.9668H18.6667V38.9001H20.8V23.9668ZM16.5333 21.8335V41.0335H22.9333V21.8335H16.5333ZM10.1333 26.1001V38.9001H12.2667V26.1001H10.1333ZM8 23.9668V41.0335H14.4V23.9668H8ZM27.2 26.1001H29.3333V38.9001H27.2V26.1001ZM25.0667 41.0335V23.9668H31.4667V41.0335H25.0667Z'
//             fill='currentColor'
//           />
//         </svg>
//       </div>
//     </h2>
//     <div className='contents'>
//       <ul className='f-large'>
//         <li>
//           <A to='http://125.129.210.190:9001/editds/report/edit.do?USER=dudaji1&assign_name=bWVpcw=='>
//             정형통계
//           </A>
//         </li>
//         <li>
//           <A to='http://icopsstat.kcopa.or.kr:9002/'>
//             비정형통계
//           </A>
//         </li>
//       </ul>
//     </div>
//   </div>
// );