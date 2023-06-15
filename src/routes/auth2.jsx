// import React, { useState, useContext, useEffect } from "react";
// import Input from "../shared/components/Input";
// import Button from "../shared/components/Button";
// import useForm from "../shared/hooks/form-hook";
// import useHttpClient from '../shared/hooks/http-hook';
// import AuthContext from "../shared/context/auth-context";
// import useTest from '../shared/hooks/test-hook';
// const Auth = () => {
//   const [isLoginMode, setIsLoginMode] = useState(true)
//   const auth = useContext(AuthContext);
//   const [formState, inputHandler, setFormData] = useForm(
//       {
//           email: {
//               value: '', 
//               isValid: true 
//           },
//           password: {
//               value: '',
//               isValid: true, 
//           }
//       },
//       false 
//   ); 
//   const { isLoading, error, sendRequest, clearError } = useHttpClient();
//   const switchModeHandler =  () => {
//       setIsLoginMode(prevMode => !prevMode);
//   }

//   const authSubmitHandler = async event => {
//       event.preventDefault();
//         if (isLoginMode) {
//             try {
//                 const responseData = await sendRequest(
//                     '/api/users/login', 
//                     'POST', 
//                     JSON.stringify({
//                         email: formState.inputs.email.value, 
//                         password: formState.inputs.password.value
//                     }), {
//                         'Content-Type': 'application/json'
//                     }); 
//                 //todo 
//                 auth.login(responseData.userId, responseData.token)
//                 console.log("response Data", responseData)
//             } catch (err) {
//                 console.log("err", err)
//             }
//         } else {
//             try {
//                 const responseData = await sendRequest(
//                     '/api/users/signup',
//                     'POST',
//                     JSON.stringify({
//                         email: formState.inputs.email.value, 
//                         name: formState.inputs.name.value,
//                         password: formState.inputs.password.value
//                     }), {
//                         'Content-Type': 'application/json'
//                     }); 
//                     auth.login(responseData.userId, responseData.token)
//                   console.log("response Data", responseData)
//             } catch (err) {
//                 console.log("err", err)
//             }
//         }
//   }
//   return (
//     <React.Fragment>
//       <h2>Login Required</h2>
//       <hr></hr>
//       <form onSubmit={authSubmitHandler}>
//       {!isLoginMode && <Input
//           element="input"
//           id="name"
//           type="text"
//           label="Name"
//           errorText="Please enter a name"
//           onInput={inputHandler}
//         />}
//         <Input
//           element="input"
//           id="email"
//           type="text"
//           label="Email"
//           errorText="Please enter a valid email"
//           onInput={inputHandler}
//         />
//         <Input
//           element="input"
//           id="password"
//           type="text"
//           label="Password"
//           errorText="Please enter a valid email"
//           onInput={inputHandler}
//         />
//         <Button type="submit">
//             {isLoginMode? 'LOGIN': 'SignUp'}
//         </Button>
//       </form>
//       <hr></hr>
//       <Button onClick={switchModeHandler}>
//         SWITCH To {isLoginMode ? 'SIGNUP': 'LOGIN'}
//     </Button>
//     </React.Fragment>
//   );
// };

// export default Auth;
