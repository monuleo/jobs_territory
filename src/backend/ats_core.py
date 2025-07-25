import io
import string
import re
from typing import List, Dict
from docx import Document
from PyPDF2 import PdfReader
from difflib import SequenceMatcher

# ----------------------------
# STOPWORDS
# ----------------------------
STOPWORDS = {
    'i', 'me', 'my', 'myself', 'we', 'our', 'ours', 'ourselves', 'you', 'your', 'yours',
    'yourself', 'yourselves', 'he', 'him', 'his', 'himself', 'she', 'her', 'hers',
    'herself', 'it', 'its', 'itself', 'they', 'them', 'their', 'theirs', 'themselves',
    'what', 'which', 'who', 'whom', 'this', 'that', 'these', 'those', 'am', 'is', 'are',
    'was', 'were', 'be', 'been', 'being', 'have', 'has', 'had', 'having', 'do', 'does',
    'did', 'doing', 'a', 'an', 'the', 'and', 'but', 'if', 'or', 'because', 'as', 'until',
    'while', 'of', 'at', 'by', 'for', 'with', 'through', 'during', 'before', 'after',
    'above', 'below', 'up', 'down', 'in', 'out', 'on', 'off', 'over', 'under', 'again',
    'further', 'then', 'once', 'here', 'there', 'when', 'where', 'why', 'how', 'all',
    'any', 'both', 'each', 'few', 'more', 'most', 'other', 'some', 'such', 'no', 'nor',
    'not', 'only', 'own', 'same', 'so', 'than', 'too', 'very', 's', 't', 'can', 'will',
    'just', 'don', 'should', 'now'
}

# ----------------------------
# FILE EXTRACTORS
# ----------------------------

def extract_text_from_pdf(pdf_bytes: bytes) -> str:
    pdf_file = io.BytesIO(pdf_bytes)
    reader = PdfReader(pdf_file)
    return "\n".join(page.extract_text() for page in reader.pages if page.extract_text())

def extract_text_from_docx(docx_bytes: bytes) -> str:
    doc = Document(io.BytesIO(docx_bytes))
    return "\n".join(p.text for p in doc.paragraphs)

def extract_text_from_txt(txt_bytes: bytes) -> str:
    for enc in ['utf-8', 'latin-1', 'cp1252']:
        try:
            return txt_bytes.decode(enc)
        except UnicodeDecodeError:
            continue
    return txt_bytes.decode('utf-8', errors='replace')

def parse_document(file_bytes: bytes, file_type: str) -> str:
    file_type = file_type.lower()
    if file_type == 'pdf':
        return clean_text(extract_text_from_pdf(file_bytes))
    elif file_type == 'docx':
        return clean_text(extract_text_from_docx(file_bytes))
    elif file_type == 'txt':
        return clean_text(extract_text_from_txt(file_bytes))
    else:
        raise Exception(f"Unsupported file type: {file_type}")

# ----------------------------
# CLEANING
# ----------------------------

def clean_text(text: str) -> str:
    text = text.lower()
    text = text.translate(str.maketrans('', '', string.punctuation + string.digits))
    text = ' '.join(text.split())
    words = [w for w in text.split() if w not in STOPWORDS and len(w) > 2]
    return ' '.join(words)

# ----------------------------
# SKILL EXTRACTION
# ----------------------------

def extract_skills(text: str) -> List[str]:
    """Extract skills from cleaned text using pattern matching."""
    
    # Comprehensive skill patterns and keywords
    skill_patterns = {
        'programming': [
            'python', 'java', 'javascript', 'typescript', 'react', 'angular', 'vue', 'node', 'nodejs',
            'express', 'django', 'flask', 'spring', 'html', 'css', 'sql', 'mongodb', 'postgresql', 
            'mysql', 'php', 'ruby', 'rails', 'laravel', 'jquery', 'bootstrap', 'sass', 'less',
            'webpack', 'babel', 'npm', 'yarn', 'git', 'github', 'gitlab', 'bitbucket', 'c++', 'c#',
            'dotnet', '.net', 'asp.net', 'swift', 'kotlin', 'go', 'rust', 'scala', 'perl', 'r',
            'matlab', 'shell', 'bash', 'powershell', 'xml', 'json', 'yaml', 'rest', 'api', 'graphql'
        ],
        'cloud': [
            'aws', 'azure', 'gcp', 'google cloud', 'docker', 'kubernetes', 'terraform', 'jenkins',
            'ci/cd', 'devops', 'ansible', 'puppet', 'chef', 'vagrant', 'nginx', 'apache', 'linux',
            'ubuntu', 'centos', 'redhat', 'windows server', 'microservices', 'serverless', 'lambda'
        ],
        'data': [
            'machine learning', 'data science', 'artificial intelligence', 'deep learning', 
            'tensorflow', 'pytorch', 'pandas', 'numpy', 'scikit-learn', 'keras', 'opencv',
            'tableau', 'power bi', 'excel', 'spark', 'hadoop', 'kafka', 'elasticsearch',
            'data analysis', 'statistics', 'analytics', 'big data', 'etl', 'data mining',
            'data visualization', 'jupyter', 'r studio', 'sas', 'spss'
        ],
        'management': [
            'project management', 'agile', 'scrum', 'kanban', 'leadership', 'team management',
            'product management', 'stakeholder management', 'risk management', 'change management',
            'pmp', 'prince2', 'safe', 'jira', 'confluence', 'trello', 'asana', 'monday.com',
            'waterfall', 'lean', 'six sigma', 'itil', 'cobit'
        ],
        'design': [
            'ui design', 'ux design', 'user experience', 'user interface', 'figma', 'sketch', 
            'adobe', 'photoshop', 'illustrator', 'indesign', 'xd', 'after effects', 'premiere',
            'wireframing', 'prototyping', 'usability testing', 'design thinking', 'responsive design',
            'mobile design', 'web design', 'graphic design', 'branding', 'typography'
        ],
        'business': [
            'business analysis', 'requirements gathering', 'process improvement', 'business intelligence',
            'financial analysis', 'market research', 'strategic planning', 'consulting', 'sales',
            'marketing', 'digital marketing', 'seo', 'sem', 'social media', 'content marketing',
            'email marketing', 'crm', 'salesforce', 'hubspot', 'google analytics', 'excel',
            'powerpoint', 'word', 'office 365', 'sharepoint'
        ],
        'testing': [
            'testing', 'qa', 'quality assurance', 'automation testing', 'manual testing',
            'selenium', 'cypress', 'jest', 'mocha', 'junit', 'testng', 'cucumber', 'postman',
            'load testing', 'performance testing', 'security testing', 'api testing'
        ],
        'databases': [
            'database', 'sql server', 'oracle', 'mysql', 'postgresql', 'mongodb', 'redis',
            'cassandra', 'dynamodb', 'firebase', 'sqlite', 'mariadb', 'nosql', 'database design',
            'data modeling', 'stored procedures', 'triggers', 'indexing', 'query optimization'
        ]
    }
    
    # Flatten skill patterns into a single list
    known_skills = []
    for category_skills in skill_patterns.values():
        known_skills.extend(category_skills)
    
    # Convert text to lowercase for matching
    text_lower = text.lower()
    
    # Extract potential skills
    extracted_skills = set()
    
    # Method 1: Look for known skills in text
    for skill in known_skills:
        if skill in text_lower:
            extracted_skills.add(skill)
    
    # Method 2: Extract technical terms using regex patterns
    tech_patterns = [
        r'\b[a-z]+\.js\b',  # JavaScript libraries
        r'\b[a-z]+sql\b',   # SQL variants
        r'\b[a-z]+db\b',    # Database names
        r'\b[a-z]+\+\+\b',  # Languages with ++
        r'\b[a-z]+#\b',     # Languages with #
    ]
    
    for pattern in tech_patterns:
        matches = re.findall(pattern, text_lower)
        for match in matches:
            if len(match) > 2:
                extracted_skills.add(match)
    
    # Clean and normalize skills
    excluded_words = {
        'experience', 'years', 'work', 'job', 'role', 'position', 'company', 'team', 
        'project', 'time', 'way', 'day', 'year', 'month', 'week', 'good', 'great',
        'excellent', 'strong', 'solid', 'extensive', 'proven', 'demonstrated',
        'ability', 'skills', 'knowledge', 'understanding', 'background', 'expertise'
    }
    
    normalized_skills = []
    for skill in extracted_skills:
        skill = skill.strip().lower()
        if (len(skill) > 2 and 
            skill not in excluded_words and 
            skill not in STOPWORDS and
            re.search(r'[a-zA-Z]', skill)):
            normalized_skills.append(skill)
    
    return list(set(normalized_skills))

# ----------------------------
# SKILL MATCHING
# ----------------------------

def similar(a: str, b: str) -> float:
    return SequenceMatcher(None, a, b).ratio()

def calculate_match_score(jd_skills: List[str], resume_skills: List[str], fuzzy_threshold: float = 0.85) -> Dict:
    jd_skills_set = set(skill.lower().strip() for skill in jd_skills)
    resume_skills_set = set(skill.lower().strip() for skill in resume_skills)

    matched_skills = set()
    fuzzy_matched_skills = set()

    for jd_skill in jd_skills_set:
        if jd_skill in resume_skills_set:
            matched_skills.add(jd_skill)
        else:
            for res_skill in resume_skills_set:
                if similar(jd_skill, res_skill) >= fuzzy_threshold:
                    fuzzy_matched_skills.add(jd_skill)
                    break

    total_matched = matched_skills.union(fuzzy_matched_skills)
    missing = jd_skills_set - total_matched
    extra = resume_skills_set - jd_skills_set
    score = round((len(total_matched) / len(jd_skills_set)) * 100, 1) if jd_skills_set else 0.0

    return {
        "score": score,
        "matched_skills": sorted(matched_skills),
        "fuzzy_matched_skills": sorted(fuzzy_matched_skills),
        "missing_jd_skills": sorted(missing),
        "extra_resume_skills": sorted(extra),
        "total_required": len(jd_skills_set),
        "total_resume": len(resume_skills_set),
        "total_matched": len(total_matched)
    }

# ----------------------------
# USAGE EXAMPLE (for testing)
# ----------------------------

if __name__ == "__main__":
    # Example usage
    jd_skills = [
        'html', 'css', 'javascript', 'vue', 'react', 'git',
        'code', 'debug', 'deploy', 'leadership', 'user interface', 'written', 'links'
    ]

    resume_skills = [
        'html', 'css', 'javascript', 'react', 'nodejs', 'firebase', 'deployment',
        'git', 'github', 'team management', 'ui', 'code', 'writing', 'linkedin'
    ]

    result = calculate_match_score(jd_skills, resume_skills)
    print("\n---- Match Result ----")
    for k, v in result.items():
        print(f"{k}: {v}")
