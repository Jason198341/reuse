 import React, { createContext, useState, useEffect, useContext } from 'react';
 import { getCurrentUser, signIn, signUp, signOut, onAuthStateChange } from '../services/authService';
 
 const AuthContext = createContext(null);
 
 export function AuthProvider({ children }) {
   const [user, setUser] = useState(null);
   const [loading, setLoading] = useState(true);
 
   useEffect(() => {
     // 초기 사용자 정보 불러오기
     async function loadUser() {
       try {
         const currentUser = await getCurrentUser();
         setUser(currentUser);
       } catch (error) {
         console.error('Error loading user:', error);
       } finally {
         setLoading(false);
       }
     }
 
     loadUser();
 
     // 인증 상태 변경 관리
     const subscription = onAuthStateChange((user) => {
       setUser(user);
       setLoading(false);
     });
 
     return () => {
       subscription?.unsubscribe();
     };
   }, []);
 
   // 로그인 함수
   async function login(email, password) {
     try {
       const { user } = await signIn(email, password);
       setUser(user);
       return user;
     } catch (error) {
       throw error;
     }
   }
 
   // 회원가입 함수
   async function register(email, password) {
     try {
       const { user } = await signUp(email, password);
       setUser(user);
       return user;
     } catch (error) {
       throw error;
     }
   }
 
   // 로그아웃 함수
   async function logout() {
     try {
       await signOut();
       setUser(null);
     } catch (error) {
       throw error;
     }
   }
 
   const value = {
     user,
     loading,
     login,
     register,
     logout,
   };
 
   return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
 }
 
 // 컨텍스트 사용을 위한 후크
 export function useAuth() {
   const context = useContext(AuthContext);
   if (context === null) {
     throw new Error('useAuth must be used within an AuthProvider');
   }
   return context;
 }
 
