import React, { createContext, useState, useEffect, useContext } from 'react';
import supabase from '../services/supabase';

// 인증 컨텍스트 생성
const AuthContext = createContext();

/**
 * 인증 상태를 관리하는 프로바이더 컴포넌트
 * @param {Object} props - 컴포넌트 속성
 * @returns {JSX.Element} AuthProvider 컴포넌트
 */
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 사용자 인증 상태 확인
  useEffect(() => {
    // 현재 세션 확인
    const checkSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) {
          throw error;
        }
        setUser(data.session?.user || null);
      } catch (err) {
        console.error('세션 확인 오류:', err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // 인증 상태 변경 구독
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setUser(session?.user || null);
        setLoading(false);
      }
    );

    // 정리 함수
    return () => {
      if (authListener && authListener.subscription) {
        authListener.subscription.unsubscribe();
      }
    };
  }, []);

  /**
   * 이메일과 비밀번호로 회원가입
   * @param {string} email - 사용자 이메일
   * @param {string} password - 사용자 비밀번호
   * @returns {Promise<Object>} 회원가입 결과
   */
  const signUp = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('회원가입 오류:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 이메일과 비밀번호로 로그인
   * @param {string} email - 사용자 이메일
   * @param {string} password - 사용자 비밀번호
   * @returns {Promise<Object>} 로그인 결과
   */
  const signIn = async (email, password) => {
    try {
      setLoading(true);
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      return data;
    } catch (err) {
      console.error('로그인 오류:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  /**
   * 로그아웃
   * @returns {Promise<void>}
   */
  const signOut = async () => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (err) {
      console.error('로그아웃 오류:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    user,
    loading,
    error,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * 인증 상태를 사용하기 위한 커스텀 훅
 * @returns {Object} 인증 컨텍스트 값
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서만 사용할 수 있습니다.');
  }
  return context;
};

export default AuthContext;

