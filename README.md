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
[Installation Guide](./INSTALL.md)