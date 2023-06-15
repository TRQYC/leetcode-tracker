import { useEffect, useContext, useState } from "react";
import AuthContext from "../shared/context/auth-context";
import useAuth from "../shared/hooks/auth-hook";
import { Navigate, useNavigate } from "react-router-dom";
import useHttpClient from "../shared/hooks/http-hook";
const Todo = () => {
    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();
    const [data, setData] = useState(null);
  useEffect(() => { 
    sendRequest('/api/exercise_records', 'GET', undefined, {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + auth.token
      })
   .then(data => setData(data.data))
 }, []);
  return (
      <div>
           <p> Todo list App</p>
           {data && data.map(row => <p> {JSON.stringify(row)}</p>)}
      </div>
  )
};

const TodoWrong = () => {
    useEffect(() => {
      Navigate("/", true);
    }, []);
    return <p> Todo list App</p>;
  };

export default Todo;
