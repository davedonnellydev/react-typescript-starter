// Common API response types
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
  success: boolean;
}

export interface ApiError {
  message: string;
  status: number;
  code?: string;
}

// Common component prop types
export interface BaseComponentProps {
  className?: string;
  children?: React.ReactNode;
}

// Loading and error states
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Form types
export interface FormField {
  value: string;
  error?: string;
  touched: boolean;
}

// Environment variables type
export interface Environment {
  API_KEY: string;
  API_BASE_URL: string;
  APP_NAME: string;
  VERSION: string;
  ENABLE_DEBUG: boolean;
}