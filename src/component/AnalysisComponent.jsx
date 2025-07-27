import React from 'react';

function AnalysisComponent({ 
  analysis, 
  isAnalyzing, 
  analysisProgress, 
  imagePreview, 
  onAnalyze, 
  selectedFile 
}) {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-4">
        <span className="text-xl"></span>
        <h2 className="text-xl font-semibold text-gray-800">👁️ Plant Health Analysis</h2>
      </div>
      
      <div style={{
        background: '#f8f9fa',
        borderRadius: '15px',
        padding: '30px',
        minHeight: '400px',
        border: '1px solid #e9ecef'
      }}>
        {analysis ? (
          <div style={{ animation: 'fadeIn 0.6s ease-out' }}>
            {/* Uploaded Image Display */}
            {imagePreview && (
              <div style={{ textAlign: 'center', marginBottom: '20px' }}>
                <img 
                  src={imagePreview} 
                  alt="Analyzed plant" 
                  style={{
                    width: '200px',
                    height: '200px',
                    objectFit: 'cover',
                    borderRadius: '10px',
                    marginBottom: '10px',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)'
                  }}
                />
                <div style={{ fontSize: '14px', color: '#666', fontWeight: '500' }}>
                  Analyzed Plant Image
                </div>
              </div>
            )}

            {/* Disease Status Badge */}
            <div style={{
              textAlign: 'center',
              marginBottom: '20px',
              padding: '15px',
              background: analysis.severity === 'None' 
                ? 'linear-gradient(135deg, #e8f5e8, #c8e6c9)' 
                : analysis.severity === 'Mild'
                  ? 'linear-gradient(135deg, #fff3cd, #ffeaa7)'
                  : 'linear-gradient(135deg, #ffebee, #ffcdd2)',
              borderRadius: '12px',
              border: `2px solid ${
                analysis.severity === 'None' ? '#4CAF50' : 
                analysis.severity === 'Mild' ? '#ffc107' : '#f44336'
              }`
            }}>
              <div style={{
                fontSize: '20px',
                fontWeight: 'bold',
                color: analysis.severity === 'None' ? '#2e7d32' : 
                       analysis.severity === 'Mild' ? '#856404' : '#c62828',
                marginBottom: '5px'
              }}>
                {analysis.category}
              </div>
              <div style={{ fontSize: '14px', color: '#666' }}>
                <strong>Plant:</strong> {analysis.plantType}
              </div>
            </div>

            {/* Confidence Score */}
            <div style={{ marginBottom: '25px' }}>
              <div style={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                marginBottom: '8px',
                alignItems: 'center'
              }}>
                <span style={{ fontWeight: '600', color: '#333' }}>Detection Confidence</span>
                <span style={{ 
                  fontWeight: 'bold', 
                  color: '#4CAF50', 
                  fontSize: '16px',
                  padding: '4px 8px',
                  background: '#e8f5e8',
                  borderRadius: '6px'
                }}>
                  {analysis.confidence}%
                </span>
              </div>
              <div style={{
                width: '100%',
                background: '#e0e0e0',
                borderRadius: '10px',
                height: '10px',
                overflow: 'hidden'
              }}>
                <div 
                  style={{
                    height: '100%',
                    background: 'linear-gradient(90deg, #4CAF50, #81C784)',
                    width: `${analysis.confidence}%`,
                    borderRadius: '10px',
                    transition: 'width 1.5s ease-out'
                  }}
                ></div>
              </div>
            </div>

            {/* Severity Level */}
            {analysis.severity !== 'None' && (
              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #fff3e0, #ffe0b2)',
                border: '1px solid #ff9800',
                borderRadius: '10px',
                marginBottom: '20px'
              }}>
                <div style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  fontWeight: 'bold',
                  color: '#e65100'
                }}>
                  <div style={{
                    width: '12px',
                    height: '12px',
                    background: '#ff9800',
                    borderRadius: '50%'
                  }}></div>
                  Severity: {analysis.severity}
                </div>
              </div>
            )}

            {/* Description */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                color: '#333',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '5px'
              }}>
                🔍 Diagnosis
              </h3>
              <p style={{ 
                lineHeight: '1.6', 
                color: '#555',
                padding: '12px',
                background: '#f8f9fa',
                borderRadius: '8px',
                borderLeft: '4px solid #2196F3'
              }}>
                {analysis.description}
              </p>
            </div>

            {/* Treatment */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                color: '#333',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '5px'
              }}>
                💊 Recommended Treatment
              </h3>
              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #e3f2fd, #bbdefb)',
                borderRadius: '10px',
                border: '1px solid #2196F3'
              }}>
                <p style={{ 
                  lineHeight: '1.6', 
                  color: '#1565c0', 
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {analysis.treatment}
                </p>
              </div>
            </div>

            {/* Prevention */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                color: '#333',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '5px'
              }}>
                🛡️ Prevention Tips
              </h3>
              <div style={{
                padding: '15px',
                background: 'linear-gradient(135deg, #e8f5e8, #c8e6c9)',
                borderRadius: '10px',
                border: '1px solid #4CAF50'
              }}>
                <p style={{ 
                  lineHeight: '1.6', 
                  color: '#2e7d32', 
                  margin: 0,
                  fontWeight: '500'
                }}>
                  {analysis.prevention}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div style={{ marginBottom: '25px' }}>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '12px',
                color: '#333',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '5px'
              }}>
                🏷️ Tags
              </h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                {analysis.tags.map((tag, index) => (
                  <span 
                    key={index}
                    style={{
                      padding: '8px 12px',
                      background: 'linear-gradient(135deg, #e1f5fe, #b3e5fc)',
                      color: '#0277bd',
                      borderRadius: '20px',
                      fontSize: '13px',
                      fontWeight: 'bold',
                      border: '1px solid #29b6f6',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Information */}
            <div>
              <h3 style={{ 
                fontSize: '18px', 
                fontWeight: 'bold', 
                marginBottom: '15px',
                color: '#333',
                borderBottom: '2px solid #e0e0e0',
                paddingBottom: '5px'
              }}>
                📋 Detailed Information
              </h3>
              <div style={{
                background: 'white',
                borderRadius: '10px',
                border: '1px solid #e0e0e0',
                overflow: 'hidden'
              }}>
                {Object.entries(analysis.details).map(([key, value], index) => (
                  <div 
                    key={index} 
                    style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      padding: '12px 16px',
                      borderBottom: index < Object.entries(analysis.details).length - 1 ? '1px solid #f0f0f0' : 'none',
                      background: index % 2 === 0 ? '#fafafa' : 'white',
                      transition: 'background-color 0.2s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = index % 2 === 0 ? '#fafafa' : 'white'}
                  >
                    <span style={{ 
                      fontWeight: '600', 
                      color: '#444',
                      fontSize: '14px'
                    }}>
                      {key}
                    </span>
                    <span style={{ 
                      color: '#666', 
                      textAlign: 'right',
                      fontSize: '14px',
                      fontWeight: '500'
                    }}>
                      {value}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100%',
            textAlign: 'center'
          }}>
            <div style={{ fontSize: '64px', marginBottom: '20px' }}>🧠</div>
            <p style={{ color: '#666', marginBottom: '10px', fontSize: '18px', fontWeight: '500' }}>
              Upload a plant image to detect diseases
            </p>
            <p style={{ fontSize: '14px', color: '#999' }}>
              AI-powered plant health analysis and treatment recommendations will appear here
            </p>
          </div>
        )}
      </div>

      {/* Analysis Button */}
      <button
        onClick={onAnalyze}
        disabled={!selectedFile || isAnalyzing}
        style={{
          width: '100%',
          padding: '15px',
          background: selectedFile && !isAnalyzing 
            ? 'linear-gradient(45deg, #2196F3, #1976D2)' 
            : '#ccc',
          color: 'white',
          border: 'none',
          borderRadius: '10px',
          fontSize: '16px',
          fontWeight: 'bold',
          cursor: selectedFile && !isAnalyzing ? 'pointer' : 'not-allowed',
          transition: 'all 0.3s ease',
          boxShadow: selectedFile && !isAnalyzing ? '0 4px 15px rgba(33, 150, 243, 0.3)' : 'none'
        }}
      >
        {isAnalyzing ? (
          <>🔄 Analyzing... {Math.round(analysisProgress)}%</>
        ) : (
          <>✨ Analyze Plant Health</>
        )}
      </button>

      {/* Progress Bar */}
      {isAnalyzing && (
        <div style={{
          width: '100%',
          background: '#e0e0e0',
          borderRadius: '10px',
          height: '8px',
          overflow: 'hidden'
        }}>
          <div 
            style={{
              height: '100%',
              background: 'linear-gradient(45deg, #4CAF50, #45a049)',
              width: `${analysisProgress}%`,
              transition: 'width 0.3s ease'
            }}
          ></div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}

export default AnalysisComponent;
