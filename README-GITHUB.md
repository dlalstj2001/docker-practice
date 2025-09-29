# 🏗️ Docker-Practice

> **Docker Compose**를 활용한 **풀스택 웹 애플리케이션** 실습 프로젝트

[![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)](https://www.docker.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![Flask](https://img.shields.io/badge/Flask-000000?style=flat&logo=flask&logoColor=white)](https://flask.palletsprojects.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white)](https://www.mysql.com/)

## 🎯 **이 프로젝트로 배울 수 있는 것**

- ✅ **Docker Compose** 다중 컨테이너 오케스트레이션
- ✅ **풀스택 아키텍처** 설계와 구현
- ✅ **REST API** 개발 (Flask + SQLAlchemy)
- ✅ **React** 프론트엔드 개발
- ✅ **MySQL** 데이터베이스 연동
- ✅ **CORS**, **한글 인코딩** 등 실무 이슈 해결

## ⚡ **빠른 시작**

```bash
# 1. 프로젝트 클론
git clone https://github.com/dlalstj2001/docker-practice.git
cd docker-practice

# 2. 서비스 시작 (첫 실행 시 ~1분 소요)
docker compose up -d

# 3. 웹 애플리케이션 접속
# 브라우저에서 http://localhost:8080 열기
```

**그게 전부입니다!** 🎉

## 📁 **프로젝트 구조**

```
docker-practice/
├── 📄 README.md              # 이 파일
├── 🐳 docker-compose.yml     # 서비스 정의
├── ⚙️ .env                   # 환경 변수
├── 📁 backend/               # Flask API 서버
│   ├── 🐳 Dockerfile
│   ├── 🐍 app.py
│   └── 📄 requirements.txt
└── 📁 frontend/              # React 웹 앱
    ├── 🐳 Dockerfile
    ├── 📄 package.json
    ├── 📁 public/
    └── 📁 src/
```

## 🌐 **서비스 구성**

| 서비스 | 포트 | 설명 |
|--------|------|------|
| 🌐 **Frontend** | 8080 | React 웹 애플리케이션 |
| 🔧 **Backend** | 5000 | Flask REST API |
| 🗄️ **Database** | 3307 | MySQL 데이터베이스 |

## 📚 **학습 단계별 가이드**

### 🥇 **1단계: 기본 실행**
- `docker compose up -d`로 서비스 시작
- 웹 애플리케이션에서 사용자 추가/삭제 테스트

### 🥈 **2단계: 코드 분석**
- `backend/app.py`: Flask API 구조 이해
- `frontend/src/App.js`: React 컴포넌트 분석
- `docker-compose.yml`: 서비스 의존성 파악

### 🥉 **3단계: 커스터마이징**
- 새로운 API 엔드포인트 추가
- React UI 개선
- 데이터베이스 스키마 확장

## 🔧 **개발 워크플로우**

```bash
# 코드 수정 후 프론트엔드 재시작
docker compose restart frontend

# 로그 확인
docker compose logs -f backend

# 데이터베이스 초기화
docker compose down -v
docker compose up -d
```

## 🐛 **문제 해결**

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

## 🎓 **추가 실습 과제**

1. **📱 모바일 반응형** UI 개선
2. **🔍 검색 기능** 구현  
3. **📄 페이지네이션** 추가
4. **📊 사용자 통계** 대시보드
5. **🔐 JWT 인증** 시스템
6. **📁 파일 업로드** 기능

## 🤝 **기여하기**

이 프로젝트를 개선할 아이디어가 있다면:

1. **Fork** 이 리포지토리
2. **Feature branch** 생성 (`git checkout -b feature/amazing-feature`)
3. **Commit** 변경사항 (`git commit -m 'Add amazing feature'`)
4. **Push** to branch (`git push origin feature/amazing-feature`)
5. **Pull Request** 생성

## 📄 **라이선스**

이 프로젝트는 **MIT 라이선스**를 따릅니다. 교육 목적으로 자유롭게 사용하세요!

## 👨‍🏫 **만든 이**

**교육용 Docker 실습 프로젝트**
- 📧 Email: your-email@example.com
- 🐙 GitHub: [@your-username](https://github.com/your-username)

---

⭐ **도움이 되었다면 스타를 눌러주세요!** ⭐