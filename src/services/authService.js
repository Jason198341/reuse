 import supabase from './supabaseClient';
 
 // 회원가입 함수
 export async function signUp(email, password) {
   try {
     const { data, error } = await supabase.auth.signUp({
       email,
       password,
     });
     
     if (error) throw error;
     return data;
   } catch (error) {
     console.error('Error signing up:', error);
     throw new Error('Failed to sign up: ' + error.message);
   }
 }
 
 // 로그인 함수
 export async function signIn(email, password) {
   try {
     const { data, error } = await supabase.auth.signInWithPassword({
       email,
       password,
     });
     
     if (error) throw error;
     return data;
   } catch (error) {
     console.error('Error signing in:', error);
     throw new Error('Failed to sign in: ' + error.message);
   }
 }
 
 // 로그아웃 함수
 export async function signOut() {
   try {
     const { error } = await supabase.auth.signOut();
     if (error) throw error;
   } catch (error) {
     console.error('Error signing out:', error);
     throw new Error('Failed to sign out: ' + error.message);
   }
 }
 
 // 현재 사용자 정보 가져오기
 export async function getCurrentUser() {
   try {
     const { data: { user }, error } = await supabase.auth.getUser();
     if (error) throw error;
     return user;
   } catch (error) {
     console.error('Error getting current user:', error);
     return null;
   }
 }
 
 // 사용자 인증 상태 관리
 export function onAuthStateChange(callback) {
   const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
     callback(session?.user || null);
   });
   
   return subscription;
 }
 
