# Docker 실습 

Docker Compose를 사용한 풀스택 웹 애플리케이션 실습

## 📚 학습 목표
- Docker Compose로 다중 컨테이너 애플리케이션 구성
- React 프론트엔드와 Flask API 백엔드 연동
- MySQL 데이터베이스 연결 및 데이터 영속성
- CRUD 작업과 REST API 구현

## 🏗️ 프로젝트 구조
```
mini-stack/
├── docker-compose.yml    # 서비스 오케스트레이션
├── .env                  # 환경 변수
├── app/                  # Flask 백엔드
│   ├── Dockerfile
│   ├── app.py           # API 서버
│   └── requirements.txt
└── frontend/            # React 프론트엔드
    ├── Dockerfile
    ├── package.json
    ├── public/
    └── src/
```

## 🚀 실행 방법

### 1. 프로젝트 클론
```bash
git clone <repository-url>
cd mini-stack
```

### 2. 환경 설정
`.env` 파일이 이미 포함되어 있습니다.

### 3. 서비스 시작
```bash
docker compose up -d
```

### 4. 접속
- 🌐 **웹 애플리케이션**: http://localhost:8080
- 🔧 **API 서버**: http://localhost:5000
- 🗃️ **MySQL**: localhost:3307

## ⏱️ 설치 및 실행 시간

### 📥 **소스 코드 다운로드**
- **Git clone**: ~5초 (21KB)
- **ZIP 다운로드**: ~2초

### 🔨 **Docker 빌드 & 실행**
- **첫 실행**: ~40-60초 (베이스 이미지 다운로드 + 패키지 설치)
- **재실행**: ~3-5초 (이미지 캐시 사용)
- **코드 수정 후**: ~20초 (증분 빌드)

### 📊 **용량 비교**
```
소스 코드: 21KB
Docker 이미지: 1.6GB (Python + Node.js + MySQL 환경)
```

## 📋 포함된 기능
- ✅ 사용자 생성/조회/삭제
- ✅ 한글 이름 지원
- ✅ 실시간 데이터 업데이트
- ✅ 에러 처리 및 알림
- ✅ 반응형 UI

## 🛠️ 기술 스택
- **프론트엔드**: React 18, Axios
- **백엔드**: Flask, SQLAlchemy
- **데이터베이스**: MySQL 8.0
- **컨테이너**: Docker, Docker Compose

## 📖 학습 포인트

### Docker Compose 설정
- 다중 서비스 정의
- 서비스 간 의존성 설정
- 볼륨과 네트워크 구성

### API 개발
- REST API 설계 원칙
- JSON 인코딩 처리
- 데이터베이스 연동

### 프론트엔드 개발
- React Hooks 사용
- API 통신 (axios)
- 상태 관리

## 🔧 개발 명령어

```bash
# 로그 확인
docker compose logs -f

# 특정 서비스 재시작
docker compose restart frontend

# 서비스 중지
docker compose down

# 볼륨까지 삭제
docker compose down -v
```

## 🎯 실습 과제
1. 새로운 필드 추가 (전화번호, 나이 등)
2. 사용자 수정 기능 구현
3. 검색 기능 추가
4. 페이지네이션 구현

## 📝 문제 해결

### 포트 충돌
```bash
# 포트 사용 확인
netstat -ano | findstr :8080
```

### 한글 깨짐
- MySQL charset: utf8mb4
- Flask: JSON_AS_ASCII = False

### 프론트엔드 변경사항 미반영
```bash
docker compose restart frontend
```

---
**👨‍🏫 교육용 프로젝트** - Docker와 풀스택 개발 학습을 위한 실습