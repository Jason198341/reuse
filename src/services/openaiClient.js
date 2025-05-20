 import OpenAI from 'openai';
 
 // 환경 변수에서 API 키를 가져옵니다.
 const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;
 
 // API 키가 설정되어 있는지 확인
 if (!openaiApiKey) {
   console.warn('OpenAI API 키가 설정되지 않았습니다. .env 파일에 REACT_APP_OPENAI_API_KEY를 설정해주세요.');
 }
 
 const openai = new OpenAI({
   apiKey: openaiApiKey,
   dangerouslyAllowBrowser: true // 클라이언트 측에서 API 키를 사용하는 것은 보안상 위험할 수 있으니 실제 환경에서는 서버 측에서 처리하는 것이 좋습니다.
 });
 
 export default openai;