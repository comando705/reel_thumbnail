# Reel Thumbnail Maker

리얼 썸네일 메이커는 이미지를 업로드하고 모션 효과와 워터마크를 적용하여 편집할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- 최대 5장까지 이미지 업로드 및 관리
- 다양한 모션 효과 적용
  - 좌/우 슬라이딩
  - 위/아래 슬라이딩
  - 확대/축소 효과
  - 페이드 인/아웃
  - 회전 효과
- 워터마크 추가 및 설정
  - 위치, 크기, 색상, 투명도 조절
- 편집된 썸네일 내보내기

## 기술 스택

- Next.js 14
- TypeScript
- Fabric.js (Canvas 조작)
- Tailwind CSS
- Docker

## 설치 및 실행

### Docker를 사용하는 경우 (권장)

```bash
# 프로젝트 클론
git clone https://github.com/comando705/reel_thumbnail.git
cd reel_thumbnail

# Docker 컨테이너 빌드 및 실행
docker-compose up --build
```

Docker 컨테이너가 실행되면 `http://localhost:3000`에서 애플리케이션에 접근할 수 있습니다.

### 로컬에서 개발 모드로 실행하는 경우

```bash
# 프로젝트 클론
git clone https://github.com/comando705/reel_thumbnail.git
cd reel_thumbnail

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

개발 서버가 실행되면 `http://localhost:3000`에서 애플리케이션에 접근할 수 있습니다.

## 사용 방법

1. **이미지 업로드**
   - 이미지 업로드 버튼을 클릭하여 최대 5장까지 이미지를 선택합니다.
   - 드래그 앤 드롭으로 이미지 순서를 변경할 수 있습니다.

2. **모션 설정**
   - 업로드된 이미지를 클릭하여 선택합니다.
   - 모션 유형, 지속 시간, 지연 시간을 설정합니다.

3. **워터마크 추가**
   - 워터마크 활성화 체크박스를 선택합니다.
   - 워터마크 텍스트, 위치, 폰트 크기, 색상, 투명도를 설정합니다.

4. **미리보기 및 내보내기**
   - 오른쪽 미리보기 화면에서 모션 효과와 워터마크가 적용된 결과를 확인합니다.
   - 재생 버튼을 눌러 모션 효과를 연속적으로 볼 수 있습니다.
   - 내보내기 버튼을 클릭하여 현재 화면을 이미지로 저장합니다.

## Docker 볼륨 및 파일 저장

업로드된 이미지는 Docker 볼륨을 통해 컨테이너와 호스트 시스템 간에 동기화됩니다:

```
./public/uploads:/app/public/uploads
```

이를 통해 컨테이너가 재시작되어도 업로드된 이미지가 유지됩니다.

## 개발 및 디버깅

타입스크립트 오류나 린터 경고를 무시하고 빌드하려면:

```bash
npm run build
```

프로덕션 환경에서 실행:

```bash
npm start
```

## 라이선스

MIT License 