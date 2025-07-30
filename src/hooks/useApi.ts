import { useState, useCallback } from 'react';
import { apiService } from '../services/api';
import { ApiResponse, LoadingState } from '../types/common';

interface UseApiReturn<T> extends LoadingState {
  data: T | null;
  execute: (...args: any[]) => Promise<void>;
  reset: () => void;
}

export function useApi<T = any>(
  method: 'get' | 'post' | 'put' | 'delete',
  url: string
): UseApiReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const execute = useCallback(
    async (...args: any[]) => {
      setIsLoading(true);
      setError(null);

      try {
        let response: ApiResponse<T>;

        switch (method) {
          case 'get':
            response = await apiService.get<T>(url, args[0]); // params
            break;
          case 'post':
            response = await apiService.post<T>(url, args[0]); // data
            break;
          case 'put':
            response = await apiService.put<T>(url, args[0]); // data
            break;
          case 'delete':
            response = await apiService.delete<T>(url);
            break;
          default:
            throw new Error(`Unsupported method: ${method}`);
        }

        setData(response.data);
      } catch (err: any) {
        setError(err.message || 'An error occurred');
        setData(null);
      } finally {
        setIsLoading(false);
      }
    },
    [method, url]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return {
    data,
    isLoading,
    error,
    execute,
    reset,
  };
}