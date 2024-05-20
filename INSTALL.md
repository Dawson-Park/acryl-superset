# Installation Guide
## 사전 설정
1. git clone
  ```shell
  git clone https://github.com/Dawson-Park/acryl-superset.git
  ```
2. copy .env-back
  ```shell
  cd docker/
  cp .env-back .env
  ```
3. chmod docker shell files
  ```shell
  chmod 777 docker/*.sh
  ```
4. modify .env-back (optional)
  ```.env
  # database configurations (do not modify)
  DATABASE_DB=superset
  DATABASE_HOST=125.129.210.132 # 필요한 경우 특정 database를 바라볼 수 있도록 수정. default는 db. 현재 값은 저작권의 경우.
  DATABASE_PASSWORD=superset
  DATABASE_USER=superset
  
  EXAMPLES_DB=examples
  EXAMPLES_HOST=125.129.210.132 # 필요한 경우 특정 database를 바라볼 수 있도록 수정. default는 db. 현재 값은 저작권의 경우.
  EXAMPLES_USER=examples
  EXAMPLES_PASSWORD=examples
  EXAMPLES_PORT=5432
  
  ...
  SUPERSET_LOAD_EXAMPLES=yes # superset 기본 예제를 다운로드 하지 않는 경우 주석처리
  ```
5. modify docker-compose.yml (optional)
  ```yaml
  superset:  
    env_file: docker/.env  
    image: *superset-image  
    container_name: superset_app  
    command: ["/app/docker/docker-bootstrap.sh", "app"]  
    restart: unless-stopped  
    ports:  
      - 7070:8088 # 특정 포트로 받아야하는 경우 7070 부분을 변경
    extra_hosts:  
      - "host.docker.internal:host-gateway"  
    user: *superset-user  
    depends_on: *superset-depends-on  
    volumes: *superset-volumes  
    environment:  
      CYPRESS_CONFIG: "${CYPRESS_CONFIG}"  
      SUPERSET_FEATURE_EMBEDDED_SUPERSET: "true"
  ```
## 설치
1. chmod shell scripts
  ```shell
  cd (project_root) # 프로젝트의 루트 디렉토리로 이동
  chmod 777 ./*.sh
  ```
2. start shell
  ```
  ./start.sh
  ```
3. connect & login
  ```
  {IP}:7070/login
  
  ID: admin
  PASS: admin
  ```
## 설치 이후 작업
### Dashboard 설정
#### import가 가능한 경우
1. admin 로그인
2. `Dashboards`로 이동
3. 우측에 `대시보드 가져오기` 클릭
#### import가 불가능한 경우
1. admin 로그인
2. `Dashboards`로 이동
3. `+ 대시보드` 클릭
4. `[ untitled dashboard ]` 의 이름 변경 > 저장
5. `Dashboards`에서 저장된 대시보드의 `Edit` 버튼 클릭
6. `URL SLUG` 수정
- URL SLUG 설정
  - 대시보드: license_dashboard
  - 수집 현황: collection
    - 불법 유통 사이트 탐지 현황: collection_site
    - 불법 콘텐츠 수집 현황: collection_contents
    - 뉴스 수집 현황: collection_news
    - SNS 수집 현황: collection_sns
  - 유통 현황 분석: distribution
    - 사이트별 유통 현황 분석: distribution_site
    - 언어별 유통 현황 분석: distribution_language
    - 장르별 유통 현황 분석: distribution_genre
    - 중점 저작물별 유통 현황 분석: distribution_focus
  - 침해 현황 분석: infringement
    - 사이트별 침해 금액 추정 분석: infringement_site
    - 언어별 침해 금액 추정 분석: infringement_language
    - 장르별 침해 금액 추정 분석: infringement_genre
    - 사이트별 수익 규모 추정 분석: infringement_revenue
  - 동향 분석: trend
    - 뉴스 동향 분석: trend_news
    - SNS 동향 분석: trend_sns
  - 수사 지원 분석: investigation
    - 사이트 정보 분석: investigation_site
    - 동적 응답 분석: investigation_response
    - 클러스터링 분석: investigation_clustering
    - 라이프사이클 분석: investigation_lifecycle
### 유저 권한 설정
#### Public, Gamma 권한 수정
1. admin 로그인
2. `Settings` > `역할 목록` 클릭
3. Public의 `레코드 수정`
4. 아래를 하나씩 복붙 + 엔터
- Public, Gamma 권한
  ```
  [can list on SavedQuery, can export on Chart, can write on Chart, can read on Chart, can read on Dataset, can recent activity on Log, can export on Dashboard, can get embedded on Dashboard, can delete embedded on Dashboard, can write on Dashboard, can read on Dashboard, can read on Database, can this form post on ResetMyPasswordView, can this form get on ResetMyPasswordView, resetmypassword on UserDBModelView, can userinfo on UserDBModelView, can get on OpenApi, can show on SwaggerView, can get on MenuApi, can list on AsyncEventsRestApi, can read on AdvancedDataType, can read on AvailableDomains, can invalidate on CacheRestApi, can write on DashboardFilterStateRestApi, can read on DashboardFilterStateRestApi, can write on DashboardPermalinkRestApi, can read on DashboardPermalinkRestApi, can external metadata on Datasource, can get on Datasource, can external metadata by name on Datasource, can read on EmbeddedDashboard, can read on Explore, can write on ExploreFormDataRestApi, can read on ExploreFormDataRestApi, can write on ExplorePermalinkRestApi, can read on ExplorePermalinkRestApi, can add on FilterSets, can edit on FilterSets, can list on FilterSets, can delete on FilterSets, can write on Tag, can read on Tag, can bulk create on Tag, can format sql on SQLLab, can estimate query cost on SQLLab, can list on DynamicPlugin, can show on DynamicPlugin, can time range on Api, can query form data on Api, can query on Api, can get value on KV, can store on KV, can read on Profile, can share chart on Superset, can share dashboard on Superset, can csv on Superset, can slice on Superset, can dashboard on Superset, can log on Superset, can import dashboards on Superset, can fetch datasource metadata on Superset, can explore json on Superset, can dashboard permalink on Superset, can profile on Superset, can explore on Superset, menu access on Tags, can download on Tags, can add on Tags, can edit on Tags, can list on Tags, can delete on Tags, can show on Tags, can tags on TagView, can read on SecurityRestApi, can read on RowLevelSecurity, menu access on Home, menu access on Data, menu access on Databases, menu access on Dashboards, menu access on Charts, menu access on Datasets, menu access on Plugins, menu access on Import Dashboards, all datasource access on all_datasource_access, all database access on all_database_access]
  ```
#### Client 생성(Optional)
- 기존엔 client는 client 로그인을 해야하는 것으로 개발을 진행했으나 client 계정이 필요 없는 경우 아래는 진행하지 않아도 된다
1. admin 로그인
2. `Settings` > `역할 목록` 클릭
3. Admin 역할의 체크박스 클릭
4. 아래의 `활동` 클릭 > `역할 복사`
  - Admin copy의 `레코드 수정`
  - 이름 Client
5. `Settings` > `사용자 목록`
6. `FILTER LIST` 옆의 `+` 클릭
  - 이름 `Superset`
  - 성 `Client`
  - 사용자명 `client`
  - 활성? `check`
  - 이메일 `client@superset.com`
  - 역할 `Client`
  - 비밀번호 `client`
  - 비밀번호 확인 `client`
- Client 권한
  ```
  [can read on SavedQuery, can read on CssTemplate, can read on ReportSchedule, can read on Chart, can read on Annotation, can read on Dataset, can read on Log, can read on Dashboard, can read on Database, can read on Query, can this form get on ResetPasswordView, can this form post on ResetPasswordView, can this form get on ResetMyPasswordView, can this form post on ResetMyPasswordView, can this form get on UserInfoEditView, can this form post on UserInfoEditView, can show on UserDBModelView, can delete on UserDBModelView, can list on UserDBModelView, can edit on UserDBModelView, can userinfo on UserDBModelView, can add on UserDBModelView, resetmypassword on UserDBModelView, resetpasswords on UserDBModelView, userinfoedit on UserDBModelView, can show on RoleModelView, can delete on RoleModelView, can list on RoleModelView, can edit on RoleModelView, can add on RoleModelView, copyrole on RoleModelView, can get on OpenApi, can show on SwaggerView, can get on MenuApi, can list on AsyncEventsRestApi, can read on AdvancedDataType, can read on AvailableDomains, can invalidate on CacheRestApi, can export on Chart, can warm up cache on Chart, can read on DashboardFilterStateRestApi, can read on DashboardPermalinkRestApi, can delete embedded on Dashboard, can get embedded on Dashboard, can export on Dashboard, can set embedded on Dashboard, can export on Database, can warm up cache on Dataset, can get or create dataset on Dataset, can export on Dataset, can duplicate on Dataset, can get column values on Datasource, can read on EmbeddedDashboard, can read on Explore, can read on ExploreFormDataRestApi, can read on ExplorePermalinkRestApi, can delete on FilterSets, can list on FilterSets, can edit on FilterSets, can add on FilterSets, can export on ImportExportRestApi, can import on ImportExportRestApi, can read on Row Level Security, can export on SavedQuery, can bulk create on Tag, can read on Tag, can estimate query cost on SQLLab, can export csv on SQLLab, can execute sql query on SQLLab, can format sql on SQLLab, can get results on SQLLab, can read on SQLLab, can show on DynamicPlugin, can delete on DynamicPlugin, can list on DynamicPlugin, can edit on DynamicPlugin, can add on DynamicPlugin, can download on DynamicPlugin, can query on Api, can query form data on Api, can time range on Api, can this form get on CsvToDatabaseView, can this form post on CsvToDatabaseView, can this form get on ExcelToDatabaseView, can this form post on ExcelToDatabaseView, can this form get on ColumnarToDatabaseView, can this form post on ColumnarToDatabaseView, can save on Datasource, can external metadata by name on Datasource, can samples on Datasource, can get on Datasource, can external metadata on Datasource, can store on KV, can get value on KV, can read on Profile, can list on SavedQuery, can my queries on SqlLab, can explore on Superset, can profile on Superset, can dashboard permalink on Superset, can warm up cache on Superset, can explore json on Superset, can sqllab history on Superset, can fetch datasource metadata on Superset, can import dashboards on Superset, can log on Superset, can sqllab on Superset, can dashboard on Superset, can slice on Superset, can delete on TableSchemaView, can post on TableSchemaView, can expanded on TableSchemaView, can activate on TabStateView, can delete query on TabStateView, can post on TabStateView, can put on TabStateView, can delete on TabStateView, can get on TabStateView, can migrate query on TabStateView, can show on Tags, can delete on Tags, can list on Tags, can edit on Tags, can add on Tags, can download on Tags, can tags on TagView, can recent activity on Log, can grant guest token on SecurityRestApi, can read on SecurityRestApi, can read on RowLevelSecurity, menu access on Security, menu access on List Users, menu access on List Roles, menu access on Action Log, menu access on Row Level Security, menu access on Home, menu access on Data, menu access on Databases, menu access on Dashboards, menu access on Datasets, menu access on Manage, menu access on Plugins, menu access on CSS Templates, menu access on Import Dashboards, menu access on Tags, menu access on Alerts & Report, menu access on Annotation Layers, menu access on SQL Lab, menu access on SQL Editor, menu access on Saved Queries, menu access on Query Search, all datasource access on all_datasource_access, all database access on all_database_access, all query access on all_query_access, can csv on Superset, can share dashboard on Superset, can share chart on Superset]
  ```
## 트러블슈팅
### 설치 과정에서의 에러
- `ERROR: Couldn't find env file: /root/acryl-superset/docker/.env`
  - `.env`를 복사하지 않아서 생기는 문제
- `Error response from daemon: failed to create task for container: failed to create shim task: OCI runtime create failed: runc create failed: unable to start container process: exec: "/app/docker/docker-bootstrap.sh": permission denied: unknown`
  - `docker/*.sh`의 권한이 없어서 생기는 문제
### screenshot 차트가 안 뜨는 경우
```python
# superset/config.py
TALISMAN_CONFIG = {
	"content_security_policy": {
		"img-src": ["'self'", "blob:", "data:", "https://*", "http://*", "http://gocap.kr:30643", "http://125.129.210.138:80", "https://api.mapbox.com", "https://events.mapbox.com"], # CSP 수정
	},
}
# img-src 수정 후 아래의 TALISMAN_DEV_CONFIG 에 똑같이 붙여넣기
```
## 