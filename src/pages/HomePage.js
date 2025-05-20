 import React from 'react';
 import { Link } from 'react-router-dom';
 import { useAuth } from '../contexts/AuthContext';
 
 function HomePage() {
   const { user } = useAuth();
 
   return (
     <div className="min-h-screen bg-green-50">
       <header className="bg-green-600 text-white p-6 shadow-md">
         <div className="container mx-auto flex justify-between items-center">
           <h1 className="text-3xl font-bold">재활용 도우미</h1>
           <nav className="space-x-4">
             {user ? (
               <>
                 <Link to="/" className="hover:underline font-medium">
                   홈
                 </Link>
                 <Link to="/analyze" className="hover:underline font-medium">
                   분석하기
                 </Link>
                 <Link to="/profile" className="hover:underline">
                   프로필
                 </Link>
                 <Link to="/history" className="hover:underline">
                   재활용 기록
                 </Link>
                 </>
             ) : (
               <>
                 <Link to="/login" className="hover:underline">
                   로그인
                 </Link>
                 <Link to="/register" className="hover:underline">
                   회원가입
                 </Link>
               </>
             )}
           </nav>
         </div>
       </header>
 
       <main className="container mx-auto py-8 px-4">
         <section className="text-center my-12">
           <h2 className="text-4xl font-bold text-green-800 mb-4">
             스마트한 분리수거 솔루션
           </h2>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto">
             재활용 도우미는 인공지능을 활용하여 쓰레기 사진을 분석하고 올바른 분리수거 방법을 안내합니다.
             환경을 보호하는 현명한 선택을 도와드립니다.
           </p>
         </section>
 
         <section className="flex flex-col md:flex-row justify-center items-center gap-8 my-12">
           <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
             <h3 className="text-2xl font-bold text-green-700 mb-4">사진으로 쉽게 분리수거하기</h3>
             <p className="text-gray-600 mb-6">
               쓰레기 사진을 찍기만 하면 AI가 재질을 분석하고 올바른 분리수거 방법을 알려드립니다.
             </p>
             <Link
               to={user ? "/analyze" : "/login"}
               className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center transition-colors"
             >
               {user ? "이미지 분석하기" : "로그인하고 시작하기"}
             </Link>
           </div>
 
           <div className="bg-white rounded-lg shadow-md p-6 max-w-md">
             <h3 className="text-2xl font-bold text-green-700 mb-4">친환경 팁 알아보기</h3>
             <p className="text-gray-600 mb-6">
               효과적인 재활용 방법과 환경 보호를 위한 다양한 팁을 알아보세요.
             </p>
             <Link
               to="/tips"
               className="block w-full bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-center transition-colors"
             >
               친환경 팁 보기
             </Link>
           </div>
         </section>
 
         <section className="bg-green-100 rounded-lg p-8 my-12">
           <h3 className="text-2xl font-bold text-green-800 mb-4">왜 올바른 분리수거가 중요할까요?</h3>
           <ul className="list-disc list-inside space-y-2 text-gray-700">
             <li>자원의 재활용으로 환경 보호에 기여합니다</li>
             <li>쓰레기 매립지 부담을 줄여 토양 오염을 방지합니다</li>
             <li>원자재 추출을 줄여 에너지를 절약합니다</li>
             <li>온실가스 배출을 감소시켜 기후변화 대응에 도움이 됩니다</li>
           </ul>
         </section>
       </main>
 
       <footer className="bg-green-800 text-white p-6">
         <div className="container mx-auto text-center">
           <p>© 2025 재활용 도우미 앱 - 모두를 위한 스마트한 분리수거 솔루션</p>
         </div>
       </footer>
     </div>
   );
 }
 
 export default HomePage;
 
