
import { useCallback, useState } from 'react';
const useHttpClient = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const clearError = () => {
    setError(null);
  };
  const sendRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
      //url = 'http://13.210.46.166' + url  
      try {
        setIsLoading(true)
        const response = await fetch(url, {
          method,
          body,
          headers,
        });

        const responseData = await response.json();
        if (!response.ok) {
          throw new Error(responseData.message);
        }
        setIsLoading(false);
        return responseData;
      } catch (err) {
        setError(err.message);
        setIsLoading(false);
        throw err;
      }
    }
  )
  return { isLoading, error, sendRequest, clearError };
}





export default useHttpClient