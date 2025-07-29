import React, { useState } from 'react';
import UploadComponent from './UploadComponent';
import AnalysisComponent from './AnalysisComponent';

function Body() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [analysis, setAnalysis] = useState(null);

  const handleFileInput = (e) => {
    const file = e.target.files[0];
    handleFileSelect(file);
  };

  const clearFile = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setErrorMessage('');
    setAnalysis(null);
    setAnalysisProgress(0);
  };

  const validateFile = (file) => {
    const allowedTypes = [
      'image/jpeg',
      'image/jpg',
      'image/png',
      'image/webp',
      'image/gif',
      'image/bmp',
      'image/tiff',
      'image/svg+xml'
    ];
    const maxFileSize = 10 * 1024 * 1024;
    if (!file) return false;
    if (!allowedTypes.includes(file.type.toLowerCase())) {
      setErrorMessage(`Unsupported file type: ${file.type}`);
      return false;
    }
    if (file.size > maxFileSize) {
      setErrorMessage(`File size too large: ${(file.size / 1024 / 1024).toFixed(2)}MB`);
      return false;
    }
    setErrorMessage('');
    return true;
  };

  const handleFileSelect = (file) => {
    if (file && validateFile(file)) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = (e) => setImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setAnalysisProgress(0);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    try {
      const formData = new FormData();
      formData.append('image', selectedFile);
      formData.append(
        'prompt',
        `You are a plant pathologist. Identify the plant species and diagnose the disease visible in the uploaded image. Return:
1. Plant name
2. Disease name
3. Severity (Mild/Moderate/Severe)
4. Cause of disease
5. Treatment recommendations
6. Whether it’s contagious to other nearby plants.
7. Add extra details: affected area, urgency, recovery time, and common tags.`
      );

      const res = await fetch('https://your-backend.com/api/gemini-diagnose', {
        method: 'POST',
        body: formData
      });

      const data = await res.json();
      setAnalysis(data);
    } catch (error) {
      console.error('Error fetching diagnosis:', error);
      setAnalysis({ error: 'Failed to diagnose. Try again later.' });
    }

    clearInterval(progressInterval);
    setAnalysisProgress(100);
    setIsAnalyzing(false);
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
      padding: '20px',
      fontFamily: 'Arial, sans-serif'
    }}>
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ 
            fontSize: '36px', 
            fontWeight: 'bold', 
            color: '#333',
            marginBottom: '10px'
          }}>
            🌱 AI PLANT DISEASE DETECTION
          </h1>
          <p style={{ fontSize: '18px', color: '#666' }}>
            Advanced plant health analysis powered by artificial intelligence
          </p>
        </div>
        
        <div style={{ 
          background: 'white', 
          borderRadius: '20px', 
          padding: '40px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px' }}>
            <UploadComponent
              onFileSelect={handleFileSelect}
              selectedFile={selectedFile}
              imagePreview={imagePreview}
              errorMessage={errorMessage}
              clearFile={clearFile}
              handleFileInput={handleFileInput}
            />
            <AnalysisComponent
              analysis={analysis}
              isAnalyzing={isAnalyzing}
              analysisProgress={analysisProgress}
              imagePreview={imagePreview}
              onAnalyze={handleAnalyze}
              selectedFile={selectedFile}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
