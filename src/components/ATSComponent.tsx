import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Loader2 } from 'lucide-react';

interface MatchResult {
  score: number;
  matched_skills: string[];
  fuzzy_matched_skills: string[];
  missing_jd_skills: string[];
  extra_resume_skills: string[];
  total_required: number;
  total_resume: number;
  total_matched: number;
}

interface ApiResponse {
  match_result: MatchResult;
  status: string;
}

const ATSComponent: React.FC = () => {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<MatchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJdFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setJdFile(file);
    setError(null);
    setMatchResult(null);
  };

  const handleResumeFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setResumeFile(file);
    setError(null);
    setMatchResult(null);
  };

  const handleCompare = async () => {
    if (!jdFile || !resumeFile) {
      setError('Please select both Job Description and Resume files');
      return;
    }

    setLoading(true);
    setError(null);
    setMatchResult(null);

    try {
      const formData = new FormData();
      formData.append('jd_file', jdFile);
      formData.append('resume_file', resumeFile);

      const response = await fetch('http://localhost:5001/api/ats/match', {
        method: 'POST',
        body: formData,
      });

      const data: ApiResponse | { error: string; status: string } = await response.json();

      if (response.ok && data.status === 'success' && 'match_result' in data) {
        setMatchResult(data.match_result);
      } else {
        setError('error' in data ? data.error : 'An unexpected error occurred');
      }
    } catch (err) {
      setError('Network error: Unable to connect to the server');
    } finally {
      setLoading(false);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBgColor = (score: number) => {
    if (score >= 80) return 'bg-green-100';
    if (score >= 60) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">ATS Resume Matcher</h1>
        <p className="text-gray-600">
          Compare your resume against a job description to see how well they match
        </p>
        <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <AlertCircle className="inline w-4 h-4 mr-1" />
            Note: Your uploaded Job Description and Resume files are processed immediately for matching and are not stored on our servers.
          </p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="grid md:grid-cols-2 gap-6 mb-8">
        {/* Job Description Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Job Description</h3>
            <p className="text-sm text-gray-500 mb-4">Upload PDF, DOCX, or TXT file</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleJdFileChange}
              className="hidden"
              id="jd-file-input"
            />
            <label
              htmlFor="jd-file-input"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            {jdFile && (
              <p className="mt-2 text-sm text-green-600">
                <CheckCircle className="inline w-4 h-4 mr-1" />
                {jdFile.name}
              </p>
            )}
          </div>
        </div>

        {/* Resume Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <FileText className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Resume</h3>
            <p className="text-sm text-gray-500 mb-4">Upload PDF, DOCX, or TXT file</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleResumeFileChange}
              className="hidden"
              id="resume-file-input"
            />
            <label
              htmlFor="resume-file-input"
              className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 cursor-pointer"
            >
              <Upload className="w-4 h-4 mr-2" />
              Choose File
            </label>
            {resumeFile && (
              <p className="mt-2 text-sm text-green-600">
                <CheckCircle className="inline w-4 h-4 mr-1" />
                {resumeFile.name}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Compare Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleCompare}
          disabled={!jdFile || !resumeFile || loading}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-green-600 hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Processing...
            </>
          ) : (
            'Compare Files'
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Results Display */}
      {matchResult && (
        <div className="space-y-6">
          {/* Overall Score */}
          <div className={`p-6 rounded-lg ${getScoreBgColor(matchResult.score)}`}>
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Match Score</h2>
              <div className={`text-4xl font-bold ${getScoreColor(matchResult.score)}`}>
                {matchResult.score}%
              </div>
              <p className="text-gray-600 mt-2">
                {matchResult.total_matched} out of {matchResult.total_required} required skills found
              </p>
            </div>
          </div>

          {/* Skills Breakdown */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Matched Skills */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Matched Skills ({matchResult.matched_skills.length})
              </h3>
              <div className="space-y-1">
                {matchResult.matched_skills.length > 0 ? (
                  matchResult.matched_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-green-600 text-sm">No matching skills found</p>
                )}
              </div>
            </div>

            {/* Missing Skills */}
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-red-800 mb-3 flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Missing Skills ({matchResult.missing_jd_skills.length})
              </h3>
              <div className="space-y-1">
                {matchResult.missing_jd_skills.length > 0 ? (
                  matchResult.missing_jd_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-red-100 text-red-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-red-600 text-sm">All required skills found!</p>
                )}
              </div>
            </div>

            {/* Extra Resume Skills */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Additional Skills ({matchResult.extra_resume_skills.length})
              </h3>
              <div className="space-y-1">
                {matchResult.extra_resume_skills.length > 0 ? (
                  matchResult.extra_resume_skills.slice(0, 10).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded mr-1 mb-1"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-blue-600 text-sm">No additional skills found</p>
                )}
                {matchResult.extra_resume_skills.length > 10 && (
                  <p className="text-blue-600 text-xs mt-2">
                    +{matchResult.extra_resume_skills.length - 10} more skills
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSComponent;