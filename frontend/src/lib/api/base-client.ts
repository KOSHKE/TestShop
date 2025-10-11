function getApiBaseUrl(): string {
  // Check if running on server (SSR) or client (browser)
  const isServer = typeof window === 'undefined';
  
  if (isServer) {
    // Server-side (Docker): use internal Docker service name
    return process.env.API_URL_SERVER || 'http://api-gateway:4000';
  } else {
    // Client-side (browser): use localhost
    return process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  }
}

export class BaseApiClient {
  protected baseUrl: string;

  constructor(baseUrl: string = getApiBaseUrl()) {
    this.baseUrl = baseUrl;
  }

  protected async request<T>(
    endpoint: string,
    options?: RequestInit,
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;

    // Get JWT token from localStorage
    const token = typeof window !== 'undefined' 
      ? localStorage.getItem('accessToken') 
      : null;

    // Add Authorization header if token exists
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      ...(options?.headers as Record<string, string>),
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      if (!response.ok) {
        // Try to get detailed error message from server
        let errorMessage = `API Error ${response.status}: ${response.statusText}`;
        
        try {
          const errorData = await response.json();
          if (errorData.message) {
            errorMessage = errorData.message;
          }
        } catch {
          // If JSON parsing fails, use default message
        }

        const error = new Error(errorMessage);
        (error as any).status = response.status;
        throw error;
      }

      return response.json();
    } catch (error) {
      // Re-throw network or other errors
      if (error instanceof Error) {
        throw error;
      }
      throw new Error('Network error');
    }
  }

  protected async get<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint);
  }

  protected async post<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  protected async put<T>(endpoint: string, data: unknown): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  protected async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>(endpoint, {
      method: 'DELETE',
    });
  }
}

