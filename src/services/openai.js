import OpenAI from 'openai';

// OpenAI 클라이언트 초기화
const openaiApiKey = process.env.REACT_APP_OPENAI_API_KEY;

if (!openaiApiKey) {
  throw new Error('OpenAI API Key가 설정되지 않았습니다. .env 파일을 확인하세요.');
}

const openai = new OpenAI({
  apiKey: openaiApiKey,
  dangerouslyAllowBrowser: true, // 프론트엔드에서만 사용 (실제 프로덕션에서는 백엔드를 통해 호출하는 것이 안전함)
});

/**
 * 이미지를 분석하여 재활용 정보를 반환합니다.
 * @param {File} imageFile - 분석할 이미지 파일
 * @returns {Promise<Object>} 분석 결과
 */
export const analyzeImage = async (imageFile) => {
  try {
    // 파일을 base64로 변환
    const reader = new FileReader();
    const base64Promise = new Promise((resolve) => {
      reader.onload = () => {
        const base64Data = reader.result.split(',')[1];
        resolve(base64Data);
      };
    });
    reader.readAsDataURL(imageFile);
    const base64Data = await base64Promise;

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-4-vision-preview",
      messages: [
        {
          role: "user",
          content: [
            { type: "text", text: "이 이미지에 있는 쓰레기의 종류와 재질을 분석하고, 재활용 가능 여부와 분리수거 방법을 JSON 형태로 알려주세요. 다음 형식으로 응답해주세요: {\"type\": \"물건 유형\", \"material\": \"재질\", \"recyclable\": true/false, \"category\": \"분류 카테고리\", \"recyclingMethod\": \"구체적인 분리수거 방법\", \"additionalTips\": \"추가 팁\"}"},
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${base64Data}`,
              },
            },
          ],
        },
      ],
      max_tokens: 1000,
    });

    // 응답에서 JSON 추출
    const content = response.choices[0].message.content;
    
    try {
      // JSON 문자열을 추출하기 위한 정규표현식 패턴
      const jsonRegex = /{[\s\S]*}/;
      const jsonMatch = content.match(jsonRegex);
      
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      } else {
        throw new Error('JSON 문자열을 추출할 수 없습니다.');
      }
    } catch (jsonError) {
      console.error('응답 파싱 중 오류 발생:', jsonError);
      console.log('원본 응답:', content);
      throw new Error('응답을 분석하는 중 오류가 발생했습니다.');
    }
  } catch (error) {
    console.error('이미지 분석 중 오류 발생:', error);
    throw new Error('이미지 분석 중 오류가 발생했습니다: ' + error.message);
  }
};

/**
 * 재활용 물건에 대한 창의적 아이디어를 생성합니다.
 * @param {Object} recyclingInfo - 분석된 재활용 정보 객체
 * @param {string} category - 아이디어 카테고리 ('toy', 'furniture', 'decoration', 'all')
 * @returns {Promise<Object>} 생성된 아이디어 결과
 */
export const generateCreativeIdeas = async (recyclingInfo, category = 'all') => {
  try {
    // 카테고리별 지시사항 설정
    let prompt = '';
    
    switch(category) {
      case 'toy':
        prompt = `다음 재활용 정보를 가진 물건을 이용하여 아이들을 위한 장난감이나 교육용 도구로 만들 수 있는 창의적인 아이디어를 3가지 제안해주세요. 각 아이디어는 제목, 난이도, 필요한 추가 재료, 간단한 만드는 방법을 포함해야 합니다. 결과는 JSON 형태로 응답해주세요: 

${JSON.stringify(recyclingInfo)}`;
        break;
      case 'furniture':
        prompt = `다음 재활용 정보를 가진 물건을 이용하여 집안 가구나 인테리어 소품으로 만들 수 있는 창의적인 아이디어를 3가지 제안해주세요. 각 아이디어는 제목, 난이도, 필요한 추가 재료, 간단한 만드는 방법을 포함해야 합니다. 결과는 JSON 형태로 응답해주세요: 

${JSON.stringify(recyclingInfo)}`;
        break;
      case 'decoration':
        prompt = `다음 재활용 정보를 가진 물건을 이용하여 집안 장식이나 데코레이션으로 만들 수 있는 창의적인 아이디어를 3가지 제안해주세요. 각 아이디어는 제목, 난이도, 필요한 추가 재료, 간단한 만드는 방법을 포함해야 합니다. 결과는 JSON 형태로 응답해주세요: 

${JSON.stringify(recyclingInfo)}`;
        break;
      default: // 'all'
        prompt = `다음 재활용 정보를 가진 물건을 이용하여 다양한 활용방안(장난감, 가구, 집안 소품, 장식 등)으로 만들 수 있는 창의적인 아이디어를 5가지 제안해주세요. 각 아이디어는 제목, 카테고리, 난이도, 필요한 추가 재료, 간단한 만드는 방법을 포함해야 합니다. 결과는 JSON 형태로 응답해주세요: 

${JSON.stringify(recyclingInfo)}`;
    }

    // OpenAI API 호출
    const response = await openai.chat.completions.create({
      model: "gpt-4",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
      max_tokens: 2000,
      response_format: { type: "json_object" }
    });

    // 응답 추출
    const content = response.choices[0].message.content;
    
    try {
      // JSON 문자열 파싱
      return JSON.parse(content);
    } catch (jsonError) {
      console.error('아이디어 응답 파싱 중 오류 발생:', jsonError);
      return { ideas: [{ title: '아이디어 생성 오류', description: '응답 형식을 처리하는 중 오류가 발생했습니다. 다시 시도해주세요.' }] };
    }
  } catch (error) {
    console.error('아이디어 생성 중 오류 발생:', error);
    throw new Error('아이디어 생성 중 오류가 발생했습니다: ' + error.message);
  }
};

export default openai;
