export const handleApiError = (error: any): boolean => {
    const response = error?.response;
  
    // If 401, global interceptorwill handle it
    if (response?.status === 401) {
      return true; // handled
    }
  
    return false; // not handled, continue error flow
  };