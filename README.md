# 용어정리

HDMAP 및 3D Mapping에서 사용하는 복잡하지는 않지만, 데이터별로 교체되는 레벨이 다르기 때문에 쉽게 헷갈릴 수 있다.

또한 사내에서 같은 데이터를 다르게 명명하거나 다른 데이터를 동일한 용어로 사용하는 경우가 많아서 명확하게 정의가 필요하다

### Drawn Data

- `Facility`

### Workable Data

- `Round`
- `Snap`

### Captured Data

- `Mark` - Capture Point
  - `Mark Image`
- `Cloud` - Pointcloud

### Workspace Data

- `User`
  - `Owner`
  - `Admin`
  - `Member`
  - `Guest`
- `Project`

### Work View

- `Map View`
- `Space View`
- `Image View`

### Work Layer

- `Facility Layer`

  - `Drawn Layer`
    - 현재 타겟 시설물들 표시
  - `Ref Layer`
    - 타켓 레이어의 참조 시설물들 표시
  - `Edited Layer`
    - 수정된 시설물 표시
  - `Related Layer`
    - 선택한 시설물 및 연관 시설물 표시

- `Vertex Layer`

  - Selected Layer
    - 선택한 시설물 버텍스 표시

- `Mark Layer`
  - `Processed Layer`
    - 현재 프로젝트 마크들 표시
  - `Mark Layer`
    - 현재 스냅 마크들 표시
  - `Current Layer`
    - 현재 마크를 표시

# Develop

```bash
yarn
yarn dev
```

## Windows

```cmd
mkdir "c:\Program Files\Git\mnt\10.1.0.112"
mklink /d "c:\Program Files\Git\mnt\10.1.0.112\mms_test2" "\\10.1.0.112\mms_test2"
```

# DB

칼럼수정하면 칼럼 넣어주고, 서버 모델 바꿔주고, 지오서버 레이어 프로퍼티 업데이트 해줘야함

## backup

```sql
drop database mms;
create database mms;
```

### sql backup

```bash
pg_ctl -D /data -o '-c ignore_system_indexes=true' -U stryx -p 10611 -d mms -h data.stryx.co.kr
pg_dump -U stryx -p 10611 -d mms -h data.stryx.co.kr -f temp.sql
psql -U stryx -d mms -h data.stryx.co.kr -f temp.sql -v ON_ERROR_STOP=1 -p 10631
rm temp.sql
```

### Clear

```sql
select st_srid(geom) as srid from facilities where st_srid(geom) != 32652
delete from facilities where st_srid(geom) != 32652
```

```sql
select *, ST_IsValid(geom) as valid from facilities where not ST_IsValid(geom)
delete from facilities where not st_isvalid(geom)
select *, ST_IsValid(geom) as valid from facilities where geom is null
delete from facilities where geom is null
```

## cluster

```sql
CLUSTER facilities USING facilities_geom;
CLUSTER snaps USING snaps_geom;
CLUSTER marks USING marks_geom;
CLUSTER lases USING lases_geom;
```
