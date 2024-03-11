# Superset
## Superset README.md
- [Superset Readme](https://github.com/apache/superset?tab=readme-ov-file#superset)

## How to Install in Window
### WSL2 설치
#### Windows10 버전 확인
- 실행 > PC 정보: 20H1, 20H2, 21H1 이상인지 확인
- 그 이하인 경우 설치 불가
#### 설치
- [다운로드](https://wslstorestorage.blob.core.windows.net/wslblob/wsl_update_x64.msi)
- powershell을 켜고 아래를 입력
```shell
wsl --set-default-version 2
wsl --update
```

### Docker Desktop(windows) 설치
#### 설치
1. 설치파일 다운로드: [docker desktop](https://docs.docker.com/desktop/install/windows-install/)
2. 시스템 요구사항 확인
   - docker desktop은 wsl2나 hyper-v를 요구하는데, window 환경에서 설치한 경우 기본적으로 wsl2를 자동으로 탐색한다
3. 설치 후 재부팅
4. docker desktop 재실행
5. 서비스 약관 동의
   - Accept 클릭 후 진행
   - Continue without signing in 클릭
   - Skip
   - wsl2를 설치한 경우 넘어간다
6. cmd에서 설치 확인
  ```shell
  docker version
  docker --help
  docker container --help
  docker container run ubuntu /bin/echo "hello world"
  docker container ls -al
  docker image ls
  ```

### Acryl Superset 설치
#### 설치
```shell
git clone https://github.com/Dawson-Park/acryl-superset.git
cd superset/docker/
cp .env-back .env
cd ../
docker-compose up # 10분 이상 소요됨
```
#### Admin 로그인
```
ID : admin
PS : admin
```
#### 권한 설정
- `User Role`에서 `Admin` 복사 후 `Client` 추가
- `Client`에서 `Write` 관련 권한 전부 삭제
- `Client` 권한을 가진 유저 추가
- 반드시 `Client`여야 한다. 권한 탐색을 하드코딩으로 함.
#### Dashboard 추가
- Dashboard 탭으로 이동
- 새로운 Dashboard 추가 또는 기존의 Dashboard 수정
- Slug를 다음과 같이 변경하여 매칭한다.
  ```json
  {
    "대시보드": "license_dashboard",
    "수집 현황": "collection",
    "유통 현황 분석": "distribution",
    "침해 현황 분석": "infringement",
    "동향 분석": "trend",
    "수사 지원 분석": "investigation"
  }
  ```
#### Client 로그인
- Client로 로그인 시 정상적으로 화면이 나오면 된다.

## How to Develop
### docker-compose 수정
`docker-compose.yml`에서 `superset-node`가 작성된 코드 블록 전체를 주석처리한다.
```yml
# superset-node:
#   image: node:16
#   container_name: superset_node
#   command: ["/app/docker/docker-frontend.sh"]
#   env_file: docker/.env
#   depends_on: *superset-depends-on
#   volumes: *superset-volumes
```
### frontend build
```shell
cd superset/superset-frontend
npm install
npm run dev
```
### docker run
기존에 실행되던 docker를 정지 및 컨테이너와 이미지 삭제 후 terminal을 새로 열고 아래를 실행
```shell
docker-compose up
```
frontend를 제외하고 실행되며 `npm run dev`가 실행 중인 동안 프론트엔드 코드 수정시 새로고침하면 변경사항이 반영된다.
### Directories
```
.storybook/				- storybook 관련 설정
cypress-base/				- superset-frontend에 관련한 cypress 설정
packages/				- plugin 및 기타 모듈과 연결해주는 함수 및 상수
plugins/				- chart 관련 설정 및 컴포넌트
scripts/				- 개발 관련 script 모음
spec/					- test 관련
src/					- 실질적으로 front를 구성하는 메인 컴포넌트
  ├ assets/				- front 구성 시 필요한 icon, image, css
  ├ components/				- antd 기반 공용 컴포넌트
  ├ dashboard/				- DOMAIN: dashboard에서 사용할 컴포넌트
  ├ dataMask/				- data 처리를 위한 Redux 관련 유틸
  ├ embedded/				- dashboard의 data 및 redux, controller 관련
  ├ explore/				- DOMAIN: action에서 사용할 컴포넌트
  ├ features/				- 각 DOMAIN에서 사용하는 기능 컴포넌트
  ├ filters/				- DOMAIN: filter에서 사용할 컴포넌트
  ├ hooks/				- 공용 hooks
  ├ logger/				- DOMAIN: logger에서 사용할 컴포넌트
  ├ middleware/				- api 통신 중 사용할 미들웨어
  ├ pages/				- Frontend에서 사용할 페이지 컴포넌트
  ├ setup/				- frontend 시작 전 설정 파일
  ├ sqlLab/				- DOMAIN: sqlLab에서 사용할 컴포넌트
  ├ types/				- 타입을 정의한 폴더
  ├ utils/				- 기타 유용한 유틸 함수
  ├ views/				- 중심 컴포넌트를 정의한 폴더
  ├ visualizations/			- 시각화 관련 컴포넌트
  ├ constants.ts			- 전역에서 사용하는 상수
  ├ GlobalStyles.tsx			- 전역 스타일 및 테마 정의
  ├ preamble.ts				- setup/ 의 설정을 실행시키는 파일
  ├ reduxUtils.ts			- redux의 util 함수
  ├ theme.ts				- 테마 스타일 호출
tools/					- linting 등 개발 관련
constants.ts				- 취급하는 모든 
GlobalStyles.tsx			- @emotion의 전역 스타일을 설정하는 컴포넌트
preamble.ts				- frontend를 시작하기 전 static 정보를 읽어옴
reduxUtils.ts				- redux 관련 util 함수
theme.ts				- Theme 관련 less를 호출
```

## 참고자료
- [(Windows)WSL 설치 및 사용법](https://www.lainyzine.com/ko/article/how-to-install-wsl2-and-use-linux-on-windows-10/)
- [이전 버전 WSL의 수동 설치 단계](https://learn.microsoft.com/ko-kr/windows/wsl/install-manual#step-4---download-the-linux-kernel-update-package)
- [윈도우에 도커 데스크탑 설치](https://myanjini.tistory.com/entry/%EC%9C%88%EB%8F%84%EC%9A%B0%EC%97%90-%EB%8F%84%EC%BB%A4-%EB%8D%B0%EC%8A%A4%ED%81%AC%ED%83%91-%EC%84%A4%EC%B9%98)