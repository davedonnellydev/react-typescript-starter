import { renderHook, act } from '@testing-library/react';
import { useApi } from '../hooks/useApi';

// Mock the apiService
jest.mock('../services/api', () => ({
  apiService: {
    get: jest.fn(),
    post: jest.fn(),
    put: jest.fn(),
    delete: jest.fn(),
  },
}));

describe('useApi Hook', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('initializes with default values', () => {
    const { result } = renderHook(() => useApi('get', '/test'));

    expect(result.current.data).toBeNull();
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(typeof result.current.execute).toBe('function');
    expect(typeof result.current.reset).toBe('function');
  });

  test('execute function calls the correct API method', async () => {
    const mockGet = jest.fn().mockResolvedValue({ data: 'test data' });
    const { apiService } = require('../services/api');
    apiService.get = mockGet;

    const { result } = renderHook(() => useApi('get', '/test'));

    await act(async () => {
      await result.current.execute({ param: 'value' });
    });

    expect(mockGet).toHaveBeenCalledWith('/test', { param: 'value' });
  });

  test('reset function clears state', () => {
    const { result } = renderHook(() => useApi('get', '/test'));

    act(() => {
      result.current.reset();
    });

    expect(result.current.data).toBeNull();
    expect(result.current.error).toBeNull();
    expect(result.current.isLoading).toBe(false);
  });
});