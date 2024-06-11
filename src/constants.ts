export const API_URL = 'http://localhost:3001/dev'; // 'https://api.biosymbolics.ai';

// Report APIs
export const CHARACTERISTIC_API_URL = `${API_URL}/reports/characteristics`;
export const OVER_TIME_API_URL = `${API_URL}/reports/time`;
export const SUMMARY_API_URL = `${API_URL}/reports/summarize`;

// Support APIs
export const AUTOCOMPLETE_API_URL = `${API_URL}/autocomplete`;
export const TERM_DESCRIPTION_API_URL = `${API_URL}/terms/describe`;

// Document APIs
export const ENTITY_SEARCH_API_URL = `${API_URL}/entities/search`;
export const PATENT_SEARCH_API_URL = `${API_URL}/patents/search`;
export const REGULATORY_APPROVAL_SEARCH_API_URL = `${API_URL}/approvals/search`;
export const TRIAL_SEARCH_API_URL = `${API_URL}/trials/search`;

// Chat/GPT related APIs
export const CHAT_URL = 'http://localhost:3001/dev/chat';
export const PREDICT_CLINDEV_API_URL = `${API_URL}/clindev/predict/timelines`;

// Other stuff
export const FIND_COMPANIES_URL = 'http://localhost:3001/dev/patents/companies';
export const DEFAULT_PATHNAME = '/core/dashboard';
