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
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif', 'image/bmp', 'image/tiff', 'image/svg+xml'];
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

  const handleAnalyze = () => {
    if (!selectedFile) return;
    setIsAnalyzing(true);
    setAnalysisProgress(0);
    const interval = setInterval(() => {
      setAnalysisProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 200);

    setTimeout(() => {
      const results = [
        {
          confidence: 92,
          category: 'Leaf Spot Disease',
          severity: 'Moderate',
          plantType: 'Tomato Plant',
          description: 'The plant shows signs of bacterial leaf spot disease, characterized by dark brown spots with yellow halos on the leaves. This is a common bacterial infection that affects tomato plants, especially in humid conditions.',
          treatment: 'Remove affected leaves immediately. Apply copper-based fungicide spray. Ensure proper air circulation and avoid overhead watering.',
          prevention: 'Use drip irrigation, maintain plant spacing, apply mulch, and rotate crops annually.',
          tags: ['Bacterial Disease', 'Leaf Spot', 'Tomato', 'Treatable'],
          details: {
            'Disease Type': 'Bacterial Leaf Spot',
            'Affected Area': 'Leaves and stems',
            'Severity Level': 'Moderate (60-70% affected)',
            'Treatment Urgency': 'Within 2-3 days',
            'Recovery Time': '2-3 weeks with treatment',
            'Contagious': 'Yes - isolate plant'
          }
        },
        {
          confidence: 88,
          category: 'Powdery Mildew',
          severity: 'Mild',
          plantType: 'Rose Plant',
          description: 'Early signs of powdery mildew infection detected. White, powdery fungal growth is visible on leaf surfaces.',
          treatment: 'Apply neem oil or baking soda solution. Prune affected areas and improve air circulation.',
          prevention: 'Water at soil level, ensure good air circulation, avoid overcrowding.',
          tags: ['Fungal Disease', 'Powdery Mildew', 'Rose', 'Early Stage'],
          details: {
            'Disease Type': 'Powdery Mildew (Fungal)',
            'Affected Area': 'Upper leaf surfaces',
            'Severity Level': 'Mild (20-30% affected)',
            'Treatment Urgency': 'Within 1 week',
            'Recovery Time': '1-2 weeks with treatment',
            'Contagious': 'Moderately - monitor nearby plants'
          }
        },
        {
          confidence: 95,
          category: 'Healthy Plant',
          severity: 'None',
          plantType: 'Garden Plant',
          description: 'Congratulations! Your plant appears to be healthy with no visible signs of disease or pest damage.',
          treatment: 'Continue current care routine. No treatment needed.',
          prevention: 'Maintain regular watering schedule, ensure adequate sunlight, and monitor for changes.',
          tags: ['Healthy', 'No Disease', 'Good Care', 'Thriving'],
          details: {
            'Disease Type': 'None - Healthy plant',
            'Affected Area': 'No affected areas detected',
            'Severity Level': 'Excellent condition',
            'Treatment Urgency': 'No treatment required',
            'Recovery Time': 'N/A - Plant is healthy',
            'Contagious': 'No - Plant is disease-free'
          }
        }
      ];
      setAnalysis(results[Math.floor(Math.random() * results.length)]);
      setIsAnalyzing(false);
      clearInterval(interval);
      setAnalysisProgress(100);
    }, 3000);
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
