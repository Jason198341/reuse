/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        secondary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
          950: '#042f2e',
        },
        // 더 고급스러운 색상
        luxury: {
          50: '#f9f7f7',
          100: '#e5e3e3',
          200: '#d1cdcd',
          300: '#b3adad',
          400: '#968e8e',
          500: '#7a7070',
          600: '#655c5c',
          700: '#524949',
          800: '#403939',
          900: '#322c2c',
          950: '#1a1717',
        },
        gold: {
          50: '#fbf7eb',
          100: '#f5ebca',
          200: '#eed99a',
          300: '#e7c76a',
          400: '#e0b53a',
          500: '#cfa029',
          600: '#a4791b',
          700: '#7a5915',
          800: '#503a12',
          900: '#292010',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Playfair Display', 'ui-serif', 'Georgia', 'serif'],
        display: ['Montserrat', 'Inter', 'system-ui', 'sans-serif'],
      },
      // 그림자, 그라디언트 및 기타 효과
      boxShadow: {
        'elegant': '0 10px 25px -3px rgba(0, 0, 0, 0.05), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
        'soft': '0 8px 30px rgba(0, 0, 0, 0.08)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.9)',
      },
      // 모바일 디자인을 위한 추가 breakpoints
      screens: {
        'xs': '400px',
        'mobile': {'max': '639px'},
      },
      // 디자인 요소를 위한 트랜지션 지속 시간
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },
    },
  },
  plugins: [],
}


