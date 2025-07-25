import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, User, Briefcase, DollarSign, GraduationCap, Target, Loader2 } from 'lucide-react';
import axios from 'axios';

interface MatchResult {
  score: number;
  matched_skills: string[];
  missing_jd_skills: string[];
  extra_cv_skills: string[];
  experience_feedback: string;
  ctc_feedback: string;
  academic_alignment_feedback: string;
  jd_responsibilities_matched_in_cv: Array<{
    responsibility: string;
    found_in_cv: boolean;
    relevant_snippet: string;
    confidence: number;
  }>;
  metadata: {
    jd_filename: string;
    cv_filename: string;
    jd_skills_count: number;
    cv_skills_count: number;
    jd_experience_years: number;
    cv_experience_years: number;
    jd_responsibilities_count: number;
    processing_note: string;
  };
}

const ATSComponent: React.FC = () => {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<MatchResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File, type: 'jd' | 'resume') => {
    const supportedTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'text/plain'];
    
    if (!supportedTypes.includes(file.type) && !file.name.toLowerCase().endsWith('.docx')) {
      setError(`Unsupported file type for ${type}. Please upload PDF, DOCX, or TXT files.`);
      return;
    }

    if (file.size > 10 * 1024 * 1024) {
      setError(`File size too large for ${type}. Maximum 10MB allowed.`);
      return;
    }

    setError(null);
    if (type === 'jd') {
      setJdFile(file);
    } else {
      setResumeFile(file);
    }
  };

  const handleMatch = async () => {
    if (!jdFile || !resumeFile) {
      setError('Please upload both Job Description and Resume files.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('jd_file', jdFile);
      formData.append('resume_file', resumeFile);

      const response = await axios.post<MatchResult>('http://localhost:8000/api/ats/match', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        timeout: 60000, // 60 second timeout
      });

      setResult(response.data);
    } catch (err: any) {
      console.error('Match error:', err);
      if (err.response?.data?.detail) {
        setError(`Error: ${err.response.data.detail}`);
      } else if (err.code === 'ECONNABORTED') {
        setError('Request timeout. Please try again with smaller files.');
      } else {
        setError('Failed to process files. Please check your connection and try again.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent Match';
    if (score >= 60) return 'Good Match';
    if (score >= 40) return 'Fair Match';
    return 'Poor Match';
  };

  return (
    <div className="max-w-6xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Advanced CV-to-JD Matching</h1>
        <p className="text-gray-600 mb-4">
          Upload your Job Description and Resume for comprehensive matching analysis
        </p>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 inline-block">
          <p className="text-sm text-blue-800 flex items-center">
            <AlertCircle className="w-4 h-4 mr-2" />
            Your files are processed on-the-fly and not stored on our servers
          </p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Job Description Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <Briefcase className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description</h3>
            <p className="text-sm text-gray-500 mb-4">Upload JD file (PDF, DOCX, TXT)</p>
            
            <input
              type="file"
              id="jd-upload"
              className="hidden"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'jd')}
            />
            <label
              htmlFor="jd-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            
            {jdFile && (
              <div className="mt-3 flex items-center justify-center text-sm text-green-600">
                <FileText className="w-4 h-4 mr-1" />
                {jdFile.name}
              </div>
            )}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <User className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Resume/CV</h3>
            <p className="text-sm text-gray-500 mb-4">Upload CV file (PDF, DOCX, TXT)</p>
            
            <input
              type="file"
              id="resume-upload"
              className="hidden"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => e.target.files?.[0] && handleFileUpload(e.target.files[0], 'resume')}
            />
            <label
              htmlFor="resume-upload"
              className="cursor-pointer inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            
            {resumeFile && (
              <div className="mt-3 flex items-center justify-center text-sm text-green-600">
                <FileText className="w-4 h-4 mr-1" />
                {resumeFile.name}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Match Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleMatch}
          disabled={!jdFile || !resumeFile || isLoading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Target className="w-5 h-5 mr-2" />
              Analyze Match
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Results Display */}
      {result && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className={`rounded-lg border-2 p-6 ${getScoreColor(result.score)}`}>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">{result.score}%</div>
              <div className="text-lg font-medium">{getScoreLabel(result.score)}</div>
              <div className="text-sm mt-2 opacity-75">
                Overall compatibility between CV and Job Description
              </div>
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Target className="w-5 h-5 mr-2 text-blue-600" />
              Skills Analysis
            </h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              {/* Matched Skills */}
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-800 mb-2 flex items-center">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Matched Skills ({result.matched_skills.length})
                </h4>
                <div className="space-y-1">
                  {result.matched_skills.length > 0 ? (
                    result.matched_skills.map((skill, index) => (
                      <span key={index} className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-green-600">No matching skills found</p>
                  )}
                </div>
              </div>

              {/* Missing Skills */}
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-800 mb-2 flex items-center">
                  <XCircle className="w-4 h-4 mr-1" />
                  Missing Skills ({result.missing_jd_skills.length})
                </h4>
                <div className="space-y-1">
                  {result.missing_jd_skills.length > 0 ? (
                    result.missing_jd_skills.map((skill, index) => (
                      <span key={index} className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-red-600">All required skills found</p>
                  )}
                </div>
              </div>

              {/* Extra Skills */}
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-800 mb-2 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-1" />
                  Additional Skills ({result.extra_cv_skills.length})
                </h4>
                <div className="space-y-1">
                  {result.extra_cv_skills.length > 0 ? (
                    result.extra_cv_skills.slice(0, 10).map((skill, index) => (
                      <span key={index} className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1">
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-sm text-blue-600">No additional skills</p>
                  )}
                  {result.extra_cv_skills.length > 10 && (
                    <p className="text-xs text-blue-600 mt-1">+{result.extra_cv_skills.length - 10} more</p>
                  )}
                </div>
              </div>
            </div>
          </div> 
         {/* Experience Analysis */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <Briefcase className="w-5 h-5 mr-2 text-purple-600" />
              Experience Analysis
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">{result.experience_feedback}</p>
              <div className="mt-3 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">JD Requirement:</span>
                  <span className="ml-2 text-gray-800">{result.metadata.jd_experience_years}+ years</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">CV Experience:</span>
                  <span className="ml-2 text-gray-800">{result.metadata.cv_experience_years} years</span>
                </div>
              </div>
            </div>
          </div>

          {/* CTC Alignment */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <DollarSign className="w-5 h-5 mr-2 text-green-600" />
              CTC Alignment
            </h3>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="text-gray-700">{result.ctc_feedback}</p>
            </div>
          </div>

          {/* Academic Alignment */}
          {result.academic_alignment_feedback && (
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2 text-indigo-600" />
                Academic Alignment
              </h3>
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                <p className="text-gray-700">{result.academic_alignment_feedback}</p>
              </div>
            </div>
          )}

          {/* Core Responsibilities Matched */}
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <h3 className="text-xl font-semibold text-gray-900 mb-4 flex items-center">
              <CheckCircle className="w-5 h-5 mr-2 text-orange-600" />
              Core Responsibilities Matched
            </h3>
            
            <div className="space-y-3">
              {result.jd_responsibilities_matched_in_cv.length > 0 ? (
                result.jd_responsibilities_matched_in_cv.map((item, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex-1">
                        <p className="text-gray-800 font-medium">{item.responsibility}</p>
                      </div>
                      <div className="ml-4 flex items-center">
                        {item.found_in_cv ? (
                          <div className="flex items-center text-green-600">
                            <CheckCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">Found</span>
                          </div>
                        ) : (
                          <div className="flex items-center text-red-600">
                            <XCircle className="w-4 h-4 mr-1" />
                            <span className="text-sm font-medium">Not Found</span>
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {item.found_in_cv && item.relevant_snippet && (
                      <div className="mt-2 bg-green-50 border border-green-200 rounded p-3">
                        <p className="text-sm text-green-800 font-medium mb-1">Relevant CV snippet:</p>
                        <p className="text-sm text-green-700 italic">"{item.relevant_snippet}"</p>
                        <div className="mt-1 text-xs text-green-600">
                          Confidence: {Math.round(item.confidence * 100)}%
                        </div>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <AlertCircle className="w-8 h-8 mx-auto mb-2 opacity-50" />
                  <p>No specific responsibilities could be extracted from the Job Description</p>
                </div>
              )}
            </div>
          </div>

          {/* Processing Metadata */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <h4 className="font-medium text-gray-800 mb-3">Processing Summary</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">JD Skills:</span>
                <span className="ml-2 font-medium text-gray-800">{result.metadata.jd_skills_count}</span>
              </div>
              <div>
                <span className="text-gray-600">CV Skills:</span>
                <span className="ml-2 font-medium text-gray-800">{result.metadata.cv_skills_count}</span>
              </div>
              <div>
                <span className="text-gray-600">JD Responsibilities:</span>
                <span className="ml-2 font-medium text-gray-800">{result.metadata.jd_responsibilities_count}</span>
              </div>
              <div>
                <span className="text-gray-600">Files:</span>
                <span className="ml-2 font-medium text-gray-800">Processed</span>
              </div>
            </div>
            <div className="mt-3 text-xs text-gray-500 bg-blue-50 border border-blue-200 rounded p-2">
              <AlertCircle className="w-3 h-3 inline mr-1" />
              {result.metadata.processing_note}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center space-x-4 pt-4">
            <button
              onClick={() => {
                setResult(null);
                setJdFile(null);
                setResumeFile(null);
                setError(null);
              }}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Start New Analysis
            </button>
            <button
              onClick={() => {
                const dataStr = JSON.stringify(result, null, 2);
                const dataBlob = new Blob([dataStr], { type: 'application/json' });
                const url = URL.createObjectURL(dataBlob);
                const link = document.createElement('a');
                link.href = url;
                link.download = `ats-match-result-${Date.now()}.json`;
                link.click();
                URL.revokeObjectURL(url);
              }}
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
            >
              Export Results
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSComponent;