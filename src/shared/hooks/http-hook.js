
import { useCallback, useRef, useState } from 'react';
const useHttpClient = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(); 
    const activeHttpRequests = useRef([]); 
    const clearError = () => {
        setError(null);
      };
    const sendRequest = useCallback(
        async (url, method = 'GET', body = null, headers = {}) => {
            url = 'http://13.210.46.166' + url  
            setIsLoading(true);
            const httpAbortCtrl = new AbortController();
             activeHttpRequests.current.push(httpAbortCtrl);
             try {
                  const response = await fetch(url, {
                    method, 
                    body, 
                    headers, 
                    signal: httpAbortCtrl.signal
                });
                 const responseData = await response.json()
                 activeHttpRequests.current = activeHttpRequests.current.filter(
                    reqCtrl => reqCtrl !== httpAbortCtrl
                  );
                  if (!response.ok ) {
                      console.log("response status not ok ")
                      setError(responseData.message);
                  }
                  setIsLoading(false);
                  return responseData; 
             } catch(err) {
                setIsLoading(false);
                console.log("sendRequest ", url, "error is", err.code, err.message)
                setError(err.message);
             }
        }
    )
    return { isLoading, error, sendRequest, clearError };
}





export default useHttpClient