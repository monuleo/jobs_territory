import React, { useState } from 'react';
import { Upload, FileText, CheckCircle, XCircle, AlertCircle, Loader2, TrendingUp, User, DollarSign, GraduationCap, Target, Award, BarChart3 } from 'lucide-react';

interface ScoreBreakdown {
  skills_score: number;
  experience_score: number;
  ctc_score: number;
  role_alignment_score: number;
  soft_skills_score: number;
  academic_score: number;
}

interface TopMatchingRole {
  job_title: string;
  company: string;
  semantic_similarity_score: number;
}

interface ResponsibilityMatch {
  responsibility: string;
  found_in_cv: boolean;
  relevant_snippet: string;
  confidence_score: number;
}

interface SoftSkillMatch {
  skill: string;
  cv_context: string;
  jd_context: string;
}

interface EnhancedMatchResult {
  overall_score: number;
  matched_skills: string[];
  missing_jd_skills: string[];
  extra_resume_skills: string[];
  experience_feedback: string;
  ctc_feedback: string;
  academic_feedback: string;
  role_alignment_summary: string;
  top_matching_cv_roles: TopMatchingRole[];
  jd_responsibilities_matched_in_cv: ResponsibilityMatch[];
  inferred_soft_skills_match: SoftSkillMatch[];
  quantifiable_achievements_summary: string[];
  score_breakdown: ScoreBreakdown;
}

interface ProcessingInfo {
  jd_title: string;
  cv_skills_count: number;
  jd_skills_count: number;
  processing_timestamp: string;
}

interface ApiResponse {
  match_result: EnhancedMatchResult;
  processing_info: ProcessingInfo;
  status: string;
}

const ATSComponent: React.FC = () => {
  const [jdFile, setJdFile] = useState<File | null>(null);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [matchResult, setMatchResult] = useState<EnhancedMatchResult | null>(null);
  const [processingInfo, setProcessingInfo] = useState<ProcessingInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleJdFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setJdFile(file);
    setError(null);
    setMatchResult(null);
    setProcessingInfo(null);
  };

  const handleCvFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setCvFile(file);
    setError(null);
    setMatchResult(null);
    setProcessingInfo(null);
  };

  const handleCompare = async () => {
    if (!jdFile || !cvFile) {
      setError('Please select both Job Description and CV files');
      return;
    }

    setLoading(true);
    setError(null);
    setMatchResult(null);
    setProcessingInfo(null);

    try {
      const formData = new FormData();
      formData.append('jd_file', jdFile);
      formData.append('resume_file', cvFile);

      const response = await fetch('http://localhost:5001/api/ats/match', {
        method: 'POST',
        body: formData,
      });

      const data: ApiResponse | { error: string; status: string } = await response.json();

      if (response.ok && data.status === 'success' && 'match_result' in data) {
        setMatchResult(data.match_result);
        setProcessingInfo(data.processing_info);
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
    if (score >= 80) return 'bg-green-100 border-green-200';
    if (score >= 60) return 'bg-yellow-100 border-yellow-200';
    return 'bg-red-100 border-red-200';
  };

  const CircularProgress = ({ score, size = 120 }: { score: number; size?: number }) => {
    const radius = (size - 20) / 2;
    const circumference = 2 * Math.PI * radius;
    const strokeDasharray = circumference;
    const strokeDashoffset = circumference - (score / 100) * circumference;

    return (
      <div className="relative inline-flex items-center justify-center">
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            className="text-gray-200"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth="8"
            fill="transparent"
            strokeDasharray={strokeDasharray}
            strokeDashoffset={strokeDashoffset}
            className={getScoreColor(score)}
            strokeLinecap="round"
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className={`text-2xl font-bold ${getScoreColor(score)}`}>
            {score}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-7xl mx-auto p-6 bg-white">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">Advanced ATS CV Matcher</h1>
        <p className="text-lg text-gray-600 mb-4">
          AI-powered CV analysis with ChatGPT-level accuracy for recruitment professionals
        </p>
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg max-w-2xl mx-auto">
          <p className="text-sm text-blue-800">
            <AlertCircle className="inline w-4 h-4 mr-1" />
            Your CV and JD files are processed in real-time for immediate matching and are never stored on our servers. All data is ephemeral.
          </p>
        </div>
      </div>

      {/* File Upload Section */}
      <div className="grid md:grid-cols-2 gap-8 mb-8">
        {/* Job Description Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <FileText className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Job Description</h3>
            <p className="text-sm text-gray-500 mb-6">Upload PDF, DOCX, or TXT file</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleJdFileChange}
              className="hidden"
              id="jd-file-input"
            />
            <label
              htmlFor="jd-file-input"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose JD File
            </label>
            {jdFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {jdFile.name}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* CV Upload */}
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-blue-400 transition-colors">
          <div className="text-center">
            <User className="mx-auto h-16 w-16 text-gray-400 mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Candidate CV</h3>
            <p className="text-sm text-gray-500 mb-6">Upload PDF, DOCX, or TXT file</p>
            <input
              type="file"
              accept=".pdf,.docx,.txt"
              onChange={handleCvFileChange}
              className="hidden"
              id="cv-file-input"
            />
            <label
              htmlFor="cv-file-input"
              className="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 cursor-pointer transition-colors"
            >
              <Upload className="w-5 h-5 mr-2" />
              Choose CV File
            </label>
            {cvFile && (
              <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {cvFile.name}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Compare Button */}
      <div className="text-center mb-8">
        <button
          onClick={handleCompare}
          disabled={!jdFile || !cvFile || loading}
          className="inline-flex items-center px-8 py-4 border border-transparent text-lg font-medium rounded-lg text-white bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-all duration-200 shadow-lg"
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 mr-3 animate-spin" />
              Analyzing with AI...
            </>
          ) : (
            <>
              <Target className="w-6 h-6 mr-3" />
              Analyze Match
            </>
          )}
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-8 p-4 bg-red-50 border border-red-200 rounded-lg">
          <div className="flex items-center">
            <XCircle className="w-5 h-5 text-red-500 mr-2" />
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Results Display */}
      {matchResult && processingInfo && (
        <div className="space-y-8">
          {/* Processing Info */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between text-sm text-gray-600">
              <span>Job Title: <strong>{processingInfo.jd_title}</strong></span>
              <span>CV Skills: <strong>{processingInfo.cv_skills_count}</strong></span>
              <span>JD Skills: <strong>{processingInfo.jd_skills_count}</strong></span>
            </div>
          </div>

          {/* Overall Score with Circular Progress */}
          <div className={`p-8 rounded-xl border-2 ${getScoreBgColor(matchResult.overall_score)}`}>
            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Overall Match Score</h2>
              <CircularProgress score={matchResult.overall_score} size={150} />
              <p className="text-lg text-gray-700 mt-4">
                Comprehensive AI-powered analysis complete
              </p>
            </div>
          </div>

          {/* Score Breakdown */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <BarChart3 className="w-6 h-6 mr-2" />
              Detailed Score Breakdown
            </h3>
            <div className="grid md:grid-cols-3 gap-6">
              {Object.entries(matchResult.score_breakdown).map(([key, score]) => (
                <div key={key} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700 capitalize">
                      {key.replace('_', ' ')}
                    </span>
                    <span className={`text-lg font-bold ${getScoreColor(score)}`}>
                      {score}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full ${score >= 80 ? 'bg-green-500' : score >= 60 ? 'bg-yellow-500' : 'bg-red-500'}`}
                      style={{ width: `${score}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience, CTC, and Academic Analysis */}
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
                <TrendingUp className="w-5 h-5 mr-2" />
                Experience Analysis
              </h4>
              <p className="text-blue-700 text-sm">{matchResult.experience_feedback}</p>
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-green-800 mb-3 flex items-center">
                <DollarSign className="w-5 h-5 mr-2" />
                CTC Alignment
              </h4>
              <p className="text-green-700 text-sm">{matchResult.ctc_feedback}</p>
            </div>

            <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
              <h4 className="text-lg font-semibold text-purple-800 mb-3 flex items-center">
                <GraduationCap className="w-5 h-5 mr-2" />
                Academic Fit
              </h4>
              <p className="text-purple-700 text-sm">{matchResult.academic_feedback}</p>
            </div>
          </div>

          {/* Role Alignment */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Contextual Role Alignment</h3>
            <p className="text-gray-700 mb-6">{matchResult.role_alignment_summary}</p>
            
            {matchResult.top_matching_cv_roles.length > 0 && (
              <div>
                <h4 className="text-lg font-semibold text-gray-800 mb-4">Top Matching Previous Roles</h4>
                <div className="space-y-3">
                  {matchResult.top_matching_cv_roles.map((role, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="font-medium text-gray-900">{role.job_title}</p>
                        <p className="text-sm text-gray-600">{role.company}</p>
                      </div>
                      <div className={`text-lg font-bold ${getScoreColor(role.semantic_similarity_score)}`}>
                        {role.semantic_similarity_score}%
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* JD Core Responsibilities Matched */}
          <div className="bg-white border border-gray-200 rounded-xl p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">JD Core Responsibilities Found in CV</h3>
            <div className="space-y-4">
              {matchResult.jd_responsibilities_matched_in_cv.map((resp, index) => (
                <div key={index} className={`p-4 rounded-lg border-2 ${resp.found_in_cv ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mr-3 mt-1">
                      {resp.found_in_cv ? (
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      ) : (
                        <XCircle className="w-5 h-5 text-red-600" />
                      )}
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 mb-2">{resp.responsibility}</p>
                      {resp.found_in_cv && resp.relevant_snippet && (
                        <div className="bg-white p-3 rounded border">
                          <p className="text-sm text-gray-700 italic">"{resp.relevant_snippet}"</p>
                          <p className="text-xs text-gray-500 mt-1">
                            Confidence: {resp.confidence_score}%
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Skills Analysis */}
          <div className="grid md:grid-cols-3 gap-6">
            {/* Matched Skills */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-green-800 mb-4 flex items-center">
                <CheckCircle className="w-5 h-5 mr-2" />
                Matched Skills ({matchResult.matched_skills.length})
              </h3>
              <div className="space-y-2">
                {matchResult.matched_skills.length > 0 ? (
                  matchResult.matched_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-green-100 text-green-800 text-xs px-3 py-1 rounded-full mr-2 mb-2"
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
            <div className="bg-red-50 border border-red-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-red-800 mb-4 flex items-center">
                <XCircle className="w-5 h-5 mr-2" />
                Missing Skills ({matchResult.missing_jd_skills.length})
              </h3>
              <div className="space-y-2">
                {matchResult.missing_jd_skills.length > 0 ? (
                  matchResult.missing_jd_skills.map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-red-100 text-red-800 text-xs px-3 py-1 rounded-full mr-2 mb-2"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-red-600 text-sm">All required skills found!</p>
                )}
              </div>
            </div>

            {/* Additional Skills */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-blue-800 mb-4 flex items-center">
                <AlertCircle className="w-5 h-5 mr-2" />
                Additional Skills ({matchResult.extra_resume_skills.length})
              </h3>
              <div className="space-y-2">
                {matchResult.extra_resume_skills.length > 0 ? (
                  matchResult.extra_resume_skills.slice(0, 10).map((skill, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full mr-2 mb-2"
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

          {/* Soft Skills and Achievements */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Soft Skills Match */}
            {matchResult.inferred_soft_skills_match.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Inferred Soft Skills Match</h3>
                <div className="space-y-3">
                  {matchResult.inferred_soft_skills_match.map((skill, index) => (
                    <div key={index} className="p-3 bg-gray-50 rounded">
                      <p className="font-medium text-gray-900 capitalize">{skill.skill}</p>
                      <p className="text-xs text-gray-600 mt-1">CV: "{skill.cv_context}"</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Quantifiable Achievements */}
            {matchResult.quantifiable_achievements_summary.length > 0 && (
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2" />
                  Key Quantifiable Achievements
                </h3>
                <div className="space-y-2">
                  {matchResult.quantifiable_achievements_summary.map((achievement, index) => (
                    <div key={index} className="p-2 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-sm text-gray-700">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ATSComponent;