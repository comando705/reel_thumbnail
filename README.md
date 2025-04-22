# Reel Thumbnail Maker

리얼 썸네일 메이커는 이미지를 업로드하고 편집할 수 있는 웹 애플리케이션입니다.

## 주요 기능

- 이미지 업로드 및 미리보기
- 이미지 크기 조절 및 위치 조정
- 텍스트 추가 및 편집
- 모션 효과 적용
- 썸네일 내보내기

## 기술 스택

- Next.js 14
- TypeScript
- Fabric.js
- Tailwind CSS
- Docker

## 설치 및 실행

### Docker를 사용하는 경우

```bash
# 프로젝트 클론
git clone https://github.com/comando705/reel_thumbnail.git
cd reel_thumbnail

# Docker 컨테이너 실행
docker-compose up --build
```

### 로컬에서 실행하는 경우

```bash
# 프로젝트 클론
git clone https://github.com/comando705/reel_thumbnail.git
cd reel_thumbnail

# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

## 사용 방법

1. 이미지 업로드 버튼을 클릭하여 이미지를 선택합니다.
2. 업로드된 이미지를 클릭하여 편집할 이미지를 선택합니다.
3. 텍스트 추가, 모션 효과 등의 기능을 사용하여 썸네일을 편집합니다.
4. 완성된 썸네일을 내보내기 버튼을 클릭하여 저장합니다.

## 라이선스

MIT License 