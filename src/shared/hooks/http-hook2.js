
import {useEffect } from 'react';
const useData = (fetchFn, dep) => {
    useEffect(() => {
        fetchFn()
        .then(resp => resp.json())
        .then(json => {
            return {
                data: json, 
                error: null, 
            } 
        })
        .catch(err => {
            return {
                error: err 
            }
        })
    }, dep)
}


export default useData