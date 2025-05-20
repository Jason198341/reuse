 import React, { useState } from 'react';
 import { useAuth } from '../contexts/AuthContext';
 import { analyzeImage } from '../services/imageAnalysisService';
 import AnalysisResult from '../components/AnalysisResult';
 
 function AnalyzePage() {
   const { user } = useAuth();
   const [image, setImage] = useState(null);
   const [preview, setPreview] = useState(null);
   const [isAnalyzing, setIsAnalyzing] = useState(false);
   const [result, setResult] = useState(null);
   const [error, setError] = useState(null);
 
   const handleImageChange = (e) => {
     const file = e.target.files[0];
     if (file) {
       setImage(file);
       setPreview(URL.createObjectURL(file));
       setResult(null);
       setError(null);
     }
   };
 
   const handleAnalyze = async () => {
     if (!image) {
       setError('이미지를 먼저 업로드해주세요.');
       return;
     }
 
     try {
       setIsAnalyzing(true);
       setError(null);
       
       // 이미지를 서비스로 전송하여 분석 수행
       const analysisResult = await analyzeImage(image);
       
       // 분석 결과 설정
       setResult(analysisResult);
       setIsAnalyzing(false);
     } catch (err) {
       setIsAnalyzing(false);
       setError('이미지 분석 중 오류가 발생했습니다. 다시 시도해주세요.');
       console.error('이미지 분석 오류:', err);
     }
   };
 
   return (
     <div className="min-h-screen bg-green-50 p-6">
       <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6">
         <h1 className="text-2xl font-bold text-green-700 mb-6">재활용 분석하기</h1>
         
         <div className="mb-6">
           <div className="flex flex-col sm:flex-row gap-4">
             <div className="flex-1">
               <label className="block text-sm font-medium text-gray-700 mb-2">
                 이미지 업로드
               </label>
               <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:bg-gray-50" onClick={() => document.getElementById('fileInput').click()}>
                 <input 
                   type="file" 
                   id="fileInput" 
                   className="hidden" 
                   accept="image/*" 
                   onChange={handleImageChange} 
                 />
                 {preview ? (
                   <img src={preview} alt="미리보기" className="max-h-64 mx-auto" />
                 ) : (
                   <div className="py-8">
                     <p className="text-gray-500">클릭하여 이미지 업로드</p>
                     <p className="text-xs text-gray-400 mt-1">PNG, JPG, GIF 형식 지원</p>
                   </div>
                 )}
               </div>
             </div>
 
             <div className="flex-1">
               <h2 className="text-lg font-semibold text-gray-800 mb-3">사용 방법</h2>
               <ol className="list-decimal ml-5 text-gray-600 space-y-2">
                 <li>분석할 쓰레기/재활용품의 사진을 업로드해주세요.</li>
                 <li>분석하기 버튼을 클릭하면 AI가 이미지를 분석합니다.</li>
                 <li>재질과 분리수거 방법을 확인하세요.</li>
                 <li>창의적인 재활용 아이디어도 함께 제공됩니다.</li>
               </ol>
             </div>
           </div>
 
           <div className="mt-6">
             <button
               onClick={handleAnalyze}
               disabled={isAnalyzing || !image}
               className={`${isAnalyzing ? 'bg-gray-400' : 'bg-green-600 hover:bg-green-700'} text-white font-medium py-2 px-6 rounded-md transition duration-200 w-full sm:w-auto`}
             >
               {isAnalyzing ? '분석 중...' : '분석하기'}
             </button>
           </div>
 
           {error && (
             <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
               {error}
             </div>
           )}
         </div>
 
         {result && <AnalysisResult result={result} />}
       </div>
     </div>
   );
 }
 
 export default AnalyzePage;