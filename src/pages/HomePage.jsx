import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { analyzeImage, generateCreativeIdeas } from '../services/openai';

/**
 * 홈 페이지 컴포넌트
 * @returns {JSX.Element} 컴포넌트
 */
const HomePage = () => {
  const { user, signOut } = useAuth();
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [creativeIdeas, setCreativeIdeas] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [ideasLoading, setIdeasLoading] = useState(false);

  /**
   * 이미지 업로드 처리
   * @param {Event} e - 이벤트 객체
   */
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // 파일 형식 검사 (JPEG, PNG, GIF만 허용)
    const validTypes = ['image/jpeg', 'image/png', 'image/gif'];
    if (!validTypes.includes(file.type)) {
      setError('지원되는 파일 형식: JPEG, PNG, GIF');
      return;
    }

    // 파일 크기 검사 (10MB 이하만 허용)
    if (file.size > 10 * 1024 * 1024) {
      setError('이미지 크기는 10MB 이하여야 합니다.');
      return;
    }

    setImage(file);
    setError(null);
    setResult(null);

    // 이미지 미리보기 생성
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result);
    };
    reader.readAsDataURL(file);
  };

  /**
   * 이미지 분석 처리
   */
  const handleAnalyze = async () => {
    if (!image) {
      setError('분석할 이미지를 선택해주세요.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const analysisResult = await analyzeImage(image);
      setResult(analysisResult);
    } catch (err) {
      console.error('이미지 분석 오류:', err.message);
      setError('이미지 분석 중 오류가 발생했습니다: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * 새 분석 시작
   */
  const handleReset = () => {
    setImage(null);
    setImagePreview(null);
    setResult(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">재활용 도우미</h1>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">{user.email}</span>
            <button
              onClick={signOut}
              className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
            >
              로그아웃
            </button>
          </div>
        </div>

        <div className="mt-6 rounded-lg bg-white shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold text-gray-900">쓰레기 이미지 분석</h2>
            <p className="mt-1 text-sm text-gray-500">
              쓰레기 사진을 업로드하면 재활용 가능 여부와 적절한 분리수거 방법을 알려드립니다.
            </p>

            {error && (
              <div className="mt-4 rounded-md bg-red-50 p-4">
                <div className="flex">
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-red-800">{error}</h3>
                  </div>
                </div>
              </div>
            )}

            {!result && (
              <div className="mt-4">
                <label
                  htmlFor="image-upload"
                  className="block text-sm font-medium text-gray-700"
                >
                  이미지 업로드
                </label>
                <div className="mt-1 flex justify-center rounded-md border-2 border-dashed border-gray-300 px-6 pt-5 pb-6">
                  <div className="space-y-1 text-center">
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="미리보기"
                        className="mx-auto h-64 w-auto object-contain"
                      />
                    ) : (
                      <svg
                        className="mx-auto h-12 w-12 text-gray-400"
                        stroke="currentColor"
                        fill="none"
                        viewBox="0 0 48 48"
                        aria-hidden="true"
                      >
                        <path
                          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative cursor-pointer rounded-md bg-white font-medium text-primary-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-primary-500 focus-within:ring-offset-2 hover:text-primary-500"
                      >
                        <span>이미지 선택</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          accept="image/*"
                          onChange={handleImageChange}
                        />
                      </label>
                      <p className="pl-1">또는 여기에 드래그 앤 드롭</p>
                    </div>
                    <p className="text-xs text-gray-500">
PNG, JPG, GIF 최대 10MB
                    </p>
                  </div>
                </div>

                {imagePreview && (
                  <div className="mt-4 flex justify-center">
                    <button
                      onClick={handleAnalyze}
                      disabled={loading}
                      className="inline-flex items-center rounded-md border border-transparent bg-primary-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 disabled:bg-primary-300"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="-ml-1 mr-3 h-5 w-5 animate-spin text-white"
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
                          분석 중...
                        </>
                      ) : (
                        '이미지 분석하기'
                      )}
                    </button>
                  </div>
                )}
              </div>
            )}

            {result && (
              <div className="mt-6">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">분석 결과</h3>
                  <button
                    onClick={handleReset}
                    className="rounded-md bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
                  >
                    새 분석 시작
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">물건 정보</h4>
                      <dl className="mt-2 divide-y divide-gray-200">
                        <div className="flex justify-between py-2">
                          <dt className="text-sm font-medium text-gray-500">유형</dt>
                          <dd className="text-sm font-medium text-gray-900">{result.type}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-sm font-medium text-gray-500">재질</dt>
                          <dd className="text-sm font-medium text-gray-900">{result.material}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-sm font-medium text-gray-500">분류 카테고리</dt>
                          <dd className="text-sm font-medium text-gray-900">{result.category}</dd>
                        </div>
                        <div className="flex justify-between py-2">
                          <dt className="text-sm font-medium text-gray-500">재활용 가능 여부</dt>
                          <dd
                            className={`text-sm font-bold ${
                              result.recyclable ? 'text-green-600' : 'text-red-600'
                            }`}
                          >
                            {result.recyclable ? '재활용 가능' : '비재활용'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>

                  <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
                    <div className="p-4">
                      <h4 className="text-sm font-medium text-gray-500">분리수거 방법</h4>
                      <div className="mt-2 text-sm text-gray-700">
                        <p>{result.recyclingMethod}</p>
                      </div>

                      {result.additionalTips && (
                        <div className="mt-4">
                          <h4 className="text-sm font-medium text-gray-500">추가 팁</h4>
                          <div className="mt-2 text-sm text-gray-700">
                            <p>{result.additionalTips}</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

