import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

/**
 * 인증된 사용자만 접근 가능한 보호된 라우트 컴포넌트
 * @returns {JSX.Element} 컴포넌트
 */
const PrivateRoute = () => {
  const { user, loading } = useAuth();

  // 로딩 중일 때는 로딩 상태 표시
  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-primary-600">
          <svg
            className="h-10 w-10 animate-spin"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  // 사용자가 로그인하지 않은 경우 로그인 페이지로 리다이렉트
  return user ? <Outlet /> : <Navigate to="/login" replace />;
};

export default PrivateRoute;

