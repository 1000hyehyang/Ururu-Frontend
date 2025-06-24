# 🚀 로컬 개발 환경 설정

## 1. 프로젝트 클론

```bash
git clone https://github.com/UruruLab/Ururu-Frontend.git
cd Ururu-Frontend
```

## 2. 패키지 설치

```bash
npm install
```

> ⚠️ node_modules는 Git에 포함되어 있지 않으므로 반드시 `npm install`을 실행해야 합니다.

## 3. 환경변수 설정

`.env.local` 파일을 루트에 생성해주세요.

```bash
NEXT_PUBLIC_API_URL=http://localhost:8080
```

> 프론트엔드에서 로컬 백엔드 API를 호출하려면, 위 예시처럼 `.env.local` 파일을 설정해 주세요.

## 4. 개발 서버 실행

```bash
npm run dev
```

- 기본 주소: http://localhost:3000
- 변경된 코드는 저장 시 자동 리렌더링됩니다.

## VSCode 설정 가이드

📌 필수 확장 추천

- Prettier – Code formatter
- EditorConfig for VSCode
- Tailwind CSS IntelliSense
