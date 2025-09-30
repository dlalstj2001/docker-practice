# 🏗️ Docker Practice

> **Docker Compose**를 활용한 **풀스택 웹 애플리케이션** 실습 프로젝트

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Redis](https://img.shields.io/badge/Redis-DC382D?style=flat&logo=redis&logoColor=white)](https://redis.io/)

## 🎯 **이 프로젝트로 배울 수 있는 것**

- **Docker Compose** 다중 컨테이너 오케스트레이션
- **풀스택 아키텍처** 설계와 구현
- **REST API** 개발 (Flask + SQLAlchemy)
- **React** 프론트엔드 개발
- **MySQL** 데이터베이스 연동
- **Redis** 캐싱 시스템
- **CORS**, **한글 인코딩** 등 실무 이슈 해결

## **빠른 시작**

```bash
# 1. 프로젝트 클론
git clone https://github.com/dlalstj2001/docker-practice.git
cd docker-practice

# 2. 서비스 시작 (첫 실행 시 ~1분 소요)
docker compose up -d

# 3. 웹 애플리케이션 접속
# 브라우저에서 http://localhost:8080 열기
```

## 🔧 **환경별 설정**

### **Windows 사용자**
docker-compose.yml의 web에서 포트 5001번을 5000번으로 수정해야 합니다.

### **macOS 사용자**
macOS에서 포트 5000번이 AirPlay 서비스와 충돌할 수 있습니다.  
이미 `docker-compose.yml`에서 해결되어 있습니다:

```yaml
# 원본 (Windows용)
# - "5000:5000"

# 수정됨 (macOS 충돌 방지)
- "5001:5000"
```

**접속 URL:**
- 프론트엔드: http://localhost:8080
- 백엔드 API: http://localhost:5001


## 📁 **프로젝트 구조**

```
docker-practice/
├── 📄 README.md              # 이 파일
├── 🐳 docker-compose.yml     # 서비스 정의
├── ⚙️ .env                   # 환경 변수
├── 📁 app/                   # Flask API 서버
│   ├── 🐳 Dockerfile
│   ├── 🐍 app.py
│   └── 📄 requirements.txt
└── 📁 frontend/              # React 웹 앱
    ├── 🐳 Dockerfile
    ├── 📄 package.json
    ├── 📁 public/
    └── 📁 src/
```

## **서비스 구성**

| 서비스 | 포트 | 설명 |
|--------|------|------|
| 🌐 **Frontend** | 8080 | React 웹 애플리케이션 |
| 🔧 **Backend** | 5001 | Flask REST API (macOS 충돌 방지) |
| 🗄️ **Database** | 3307 | MySQL 데이터베이스 |
| 🚀 **Cache** | 6379 | Redis 캐시 서버 |

##  **학습 단계별 가이드**

### **1단계: 기본 실행**
- `docker compose up -d`로 서비스 시작
- 웹 애플리케이션에서 사용자 추가/삭제 테스트

### **2단계: 코드 분석**
- `app/app.py`: Flask API 구조 이해
- `frontend/src/App.js`: React 컴포넌트 분석
- `docker-compose.yml`: 서비스 의존성 파악

### **3단계: 커스터마이징**
- 새로운 API 엔드포인트 추가
- React UI 개선
- 데이터베이스 스키마 확장

## **설치 및 실행 시간**

### **소스 코드 다운로드**
- **Git clone**: ~5초 (소스코드 용량 작음)

### **Docker 빌드 & 실행**
- **첫 실행**: ~40-60초 (베이스 이미지 다운로드 + 패키지 설치)
- **재실행**: ~3-5초 (이미지 캐시 사용)
- **코드 수정 후**: ~20초 (증분 빌드)

### **용량 비교**
```
소스 코드: ~25KB
Docker 이미지: ~1.8GB (Python + Node.js + MySQL + Redis 환경)
```

## **개발 워크플로우**

```bash
# 코드 수정 후 프론트엔드 재시작
docker compose restart frontend

# 로그 확인
docker compose logs -f web

# 데이터베이스 초기화
docker compose down -v
docker compose up -d
```

## **문제 해결**

### ❌ **포트 충돌**
```bash
# 사용 중인 포트 확인 (Windows)
netstat -ano | findstr :8080
```

### ❌ **한글 깨짐**
✅ MySQL `utf8mb4` 설정과 Flask `JSON_AS_ASCII=False` 설정이 적용되어 있습니다.

### ❌ **프론트엔드 변경사항 미반영**
```bash
docker compose restart frontend
```

### ❌ **Redis 연결 오류**
```bash
# Redis 컨테이너 상태 확인
docker compose logs redis
```

## 🛠️ **기술 스택**
- **프론트엔드**: React 18, Axios
- **백엔드**: Flask, SQLAlchemy, Redis
- **데이터베이스**: MySQL 8.0
- **캐시**: Redis 7
- **컨테이너**: Docker, Docker Compose

## **학습 포인트**

### Docker Compose 설정
- 다중 서비스 정의
- 서비스 간 의존성 설정
- 볼륨과 네트워크 구성

### API 개발
- REST API 설계 원칙
- JSON 인코딩 처리
- 데이터베이스 연동
- Redis 캐싱 구현

### 프론트엔드 개발
- React Hooks 사용
- API 통신 (axios)
- 상태 관리

## 🎓 **추가 실습 과제**

1. **📱 모바일 반응형** UI 개선
2. **🔍 검색 기능** 구현  
3. **📄 페이지네이션** 추가
4. **📊 사용자 통계** 대시보드
5. **🔐 JWT 인증** 시스템
6. **📁 파일 업로드** 기능
7. **⚡ Redis 활용** 실시간 기능

## 📝 **포함된 기능**
- 사용자 생성/조회/삭제 (CRUD)
- 한글 이름 완벽 지원
- 실시간 데이터 업데이트
- Redis 캐싱으로 성능 최적화
- 에러 처리 및 사용자 알림
- 반응형 UI


## 📄 **라이선스**

이 프로젝트는 **MIT 라이선스**를 따릅니다. 교육 목적으로 자유롭게 사용하세요!

## 👨‍🏫 **만든 이**

**교육용 Docker 실습 프로젝트**
- 🐙 GitHub: [@dlalstj2001](https://github.com/dlalstj2001)

---
