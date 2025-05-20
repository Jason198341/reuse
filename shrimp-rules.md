# Shrimp Rules

## 코딩 스타일 및 규칙

### JavaScript/React 코딩 규칙

- 변수 선언은 `const`를 기본으로 사용하고, 값이 변경되는 경우에만 `let` 사용
- 함수는 화살표 함수(arrow function) 형태로 작성
- 컴포넌트는 함수형 컴포넌트(Functional Component) 사용
- 컴포넌트 파일은 `.jsx` 확장자 사용
- 클래스 이름은 PascalCase 사용
- 함수 및 변수 이름은 camelCase 사용
- 여러 줄 주석은 `/* */`, 한 줄 주석은 `//` 사용
- 모든 함수와 매서드는 JSDoc 형식의 주석 추가

### 아키텍처 규칙

- 컴포넌트는 `components` 폴더에 구성
  - UI 컴포넌트는 `components/ui` 하위에 구성
  - 기능별 컴포넌트는 `components/features` 하위에 구성
- 페이지는 `pages` 폴더에 구성
- 유틸리티 함수는 `utils` 폴더에 구성
- 상태 관리는 `contexts` 폴더에 구성
- API 통신 관련 코드는 `services` 폴더에 구성
- 커스텀 훅은 `hooks` 폴더에 구성

### API 통신 규칙

- API 호출은 `services` 폴더 내 기능별 파일로 분리
- Supabase 연동은 `services/supabase.js`에서 관리
- ChatGPT API 연동은 `services/openai.js`에서 관리
- API 키는 환경 변수로 관리

### 테스트 규칙

- 컴포넌트 테스트는 `__tests__` 폴더 내에 컴포넌트 이름 + `.test.jsx` 형태로 구성
- 유틸리티 테스트는 `__tests__` 폴더 내에 유틸리티 이름 + `.test.js` 형태로 구성

## 처리 규칙

### 오류 처리

- 모든 API 호출은 try-catch로 감싸서 오류 처리
- 사용자에게 보여주는 오류 메시지는 사용자 친화적으로 작성
- 로그 파일은 `logs` 폴더에 저장

### 보안 규칙

- API 키는 환경 변수로 관리하고 공개되지 않도록 주의
- 사용자 입력은 항상 유효성 검사 후 처리
- 인증 정보는 안전하게 관리

