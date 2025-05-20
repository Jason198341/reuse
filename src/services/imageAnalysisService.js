 import openai from './openaiClient';
 import supabase from './supabaseClient';
 
 // 이미지 분석 함수
 export async function analyzeImage(imageFile) {
   try {
     // 이미지를 base64로 변환
     const base64Image = await fileToBase64(imageFile);
     
     // GPT-4 Vision을 사용하여 이미지 분석
     const response = await openai.chat.completions.create({
       model: "gpt-4-vision-preview",
       messages: [
         {
           role: "user",
           content: [
             { type: "text", text: "This image shows waste/trash. Identify what type of material it is (plastic, paper, glass, metal, organic, etc.), and provide detailed recycling instructions in Korean. Also specify if it's recyclable or not." },
             {
               type: "image_url",
               image_url: {
                 url: base64Image,
               },
             },
           ],
         },
       ],
       max_tokens: 500,
     });
     
     return response.choices[0].message.content;
   } catch (error) {
     console.error('Image analysis error:', error);
     throw new Error('Failed to analyze image: ' + error.message);
   }
 }
 
 // 분석 결과 저장 함수
 export async function saveAnalysisResult(userId, imageUrl, analysisResult) {
   try {
     const { data, error } = await supabase
       .from('recycling_history')
       .insert([
         { 
           user_id: userId, 
           image_url: imageUrl,
           analysis_result: analysisResult,
           created_at: new Date()
         }
       ]);
       
     if (error) throw error;
     return data;
   } catch (error) {
     console.error('Error saving analysis result:', error);
     throw new Error('Failed to save analysis result: ' + error.message);
   }
 }
 
 // 사용자의 분석 기록 가져오기
 export async function getUserAnalysisHistory(userId) {
   try {
     const { data, error } = await supabase
       .from('recycling_history')
       .select('*')
       .eq('user_id', userId)
       .order('created_at', { ascending: false });
       
     if (error) throw error;
     return data;
   } catch (error) {
     console.error('Error fetching analysis history:', error);
     throw new Error('Failed to fetch analysis history: ' + error.message);
   }
 }
 
 // 파일을 base64로 변환하는 함수
 function fileToBase64(file) {
   return new Promise((resolve, reject) => {
     const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);
   });
 }
 
 // 이미지 업로드 함수
 export async function uploadImage(userId, imageFile) {
   try {
     const fileExt = imageFile.name.split('.').pop();
     const fileName = `${userId}/${Date.now()}.${fileExt}`;
     
     const { data, error } = await supabase.storage
       .from('recycling_images')
       .upload(fileName, imageFile);
       
     if (error) throw error;
     
     // 업로드된 이미지의 URL 가져오기
     const { data: urlData } = supabase.storage
       .from('recycling_images')
       .getPublicUrl(fileName);
       
     return urlData.publicUrl;
   } catch (error) {
     console.error('Error uploading image:', error);
     throw new Error('Failed to upload image: ' + error.message);
   }
 }
 
