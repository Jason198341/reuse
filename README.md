# 재활용 도우미 앱 (Recycling Helper App)

## 프로젝트 개요

이 앱은 쓰레기 사진을 찍으면 재활용 가능 여부와 분리수거 방법을 알려주는 서비스입니다. ChatGPT Image API를 활용하여 이미지를 분석하고, 창의적인 재활용 아이디어도 제시합니다.

## 기술 스택

- 프론트엔드: React.js, React Router, Tailwind CSS
- 백엔드/데이터베이스: Supabase (Authentication, Storage, Database)
- 이미지 분석: ChatGPT Image API
- 배포: Vercel 또는 Netlify

## 설치 방법

### 전제 조건

- Node.js (v16 이상)
- npm 또는 yarn

### 설치 방법

1. 레포지토리 복사
   ```bash
   git clone https://github.com/Jason198341/reuse.git
   cd reuse
   ```

2. 라이브러리 설치
   ```bash
   npm install
   ```

3. `.env` 파일 설정
   프로젝트 루트에 `.env` 파일을 생성하고 다음 환경 변수를 설정합니다:

   ```
   REACT_APP_SUPABASE_URL=your_supabase_url
   REACT_APP_SUPABASE_ANON_KEY=your_supabase_anon_key
   REACT_APP_OPENAI_API_KEY=your_openai_api_key
   ```

4. 액플리케이션 실행
   ```bash
   npm start
   ```
   브라우저에서 http://localhost:3000 에 접속하여 앱을 확인해보세요.

## 주요 기능

1. **이미지 업로드**: 사용자가 쓰레기 사진을 캡처하거나 업로드할 수 있는 인터페이스
2. **이미지 분석**: ChatGPT Image API를 활용해 쓰레기 재질 및 종류 식별
3. **분리수거 안내**: 식별된 품목에 대한 정확한 분리수거 방법 안내
4. **사용자 기록**: Supabase를 활용해 사용자의 재활용 이력 저장 및 관리
5. **창의적 재활용 아이디어**: 분석된 쓰레기를 활용한 창의적인 재활용 방법 제안

## 프로젝트 구조

- `/src/components`: 재사용 가능한 UI 컴포넌트
- `/src/pages`: 앱의 메인 페이지
- `/src/services`: API 통신 및 데이터 처리
- `/src/contexts`: 상태 관리 및 켄텍스트
- `/src/hooks`: 커스텀 훅

## 보안 관련 주의사항

이 앱은 클라이언트 측에서 API 키를 사용하고 있으며, 이는 보안상 위험할 수 있습니다. 실제 프로덕션 환경에서는 백엔드를 통해 API 통신을 처리하는 것이 좋습니다.


## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can't go back!**

If you aren't satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you're on your own.

You don't have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn't feel obligated to use this feature. However we understand that this tool wouldn't be useful if you couldn't customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
