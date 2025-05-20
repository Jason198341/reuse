import React from 'react';

const AnalysisResult = ({ result }) => {
  if (!result) return null;

  const { material, recyclable, disposalMethod, creative } = result;

  return (
    <div className="mt-8 border-t pt-6">
      <div className="p-6 bg-green-50 rounded-lg shadow-inner">
        <h2 className="text-xl font-semibold text-green-800 mb-4">분석 결과</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* 재질 정보 */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">재질 정보</h3>
            <div className="flex items-center mb-2">
              <span className="font-medium text-gray-700">종류:</span>
              <span className="ml-2 text-gray-800">{material.type}</span>
            </div>
            <div className="flex items-center">
              <span className="font-medium text-gray-700">재활용 가능 여부:</span>
              <span className={`ml-2 font-medium ${recyclable ? 'text-green-600' : 'text-red-600'}`}>
                {recyclable ? '가능' : '불가능'}
              </span>
            </div>
            <p className="mt-3 text-sm text-gray-600">{material.description}</p>
          </div>

          {/* 분리수거 방법 */}
          <div className="bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium text-gray-800 mb-2">분리수거 방법</h3>
            <ol className="list-decimal ml-5 text-gray-700 space-y-1">
              {disposalMethod.steps.map((step, index) => (
                <li key={index}>{step}</li>
              ))}
            </ol>
            <div className="mt-3 p-2 bg-yellow-50 rounded text-sm text-yellow-800">
              <strong>참고:</strong> {disposalMethod.note}
            </div>
          </div>
        </div>

        {/* 창의적 재활용 아이디어 */}
        {creative && (
          <div className="mt-6 bg-white p-4 rounded-md shadow-sm">
            <h3 className="text-lg font-medium text-green-700 mb-2">창의적 재활용 아이디어</h3>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">{creative.title}</h4>
              <p className="text-gray-700">{creative.description}</p>
            </div>
            <div className="mt-4">
              <h4 className="font-medium text-gray-800 mb-1">만드는 방법</h4>
              <ol className="list-decimal ml-5 text-gray-700 space-y-1">
                {creative.steps.map((step, index) => (
                  <li key={index}>{step}</li>
                ))}
              </ol>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 text-right">
        <button 
          className="bg-green-100 text-green-700 px-4 py-2 rounded-md hover:bg-green-200 transition duration-200"
          onClick={() => window.print()}
        >
          결과 저장/프린트
        </button>
      </div>
    </div>
  );
};

export default AnalysisResult;