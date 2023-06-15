import { useEffect, useReducer } from "react";

function reducer(state, action) {
console.log("input reducer", action)
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: true,
      };
    case "TOUCH":
      return {
        ...state,
        isTouched: true,
      };
    default:
      throw Error("Unknown action.");
  }
}

const Input = (props) => {
  const [inputState, dispatch] = useReducer(reducer, {
      value: props.initialValue || '', 
      isTouched: false, 
      isValid: props.initialValid || false 
  });
  const changeHandler = event => {
      dispatch({
          type: "CHANGE",
          val: event.target.value, 
      });
  }
  const touchHandler = event => {
      dispatch({
          type:"TOUCH"
      })
  }
  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);
  
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        rows={props.rows || 3}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    );
  return (
    <div>
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.isTouched && <p>{props.errorText}</p>}
    </div>
  );
};

export default Input;
