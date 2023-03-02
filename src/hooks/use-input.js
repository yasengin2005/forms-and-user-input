import { useReducer } from "react";

const initialInputState = {
    value: "",
    isTouched: false,
};

const inputStateReducer = (state, action) => {
    switch (action.type) {
        case "CHANGE":
          return { value: action.value };
        case "BLUR":
          return { ...state, isTouched: true };
        case "RESET":
          return { value: "", isTouched: false };
        default:
          return inputStateReducer;
      }
    };

const useInput = (validateValue) => {
    const [inputState, dispatch] = useReducer(
        inputStateReducer,
        initialInputState
    );

  const valueIsValid = validateValue(inputState.value);
  const hasError = !valueIsValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: "CHANGE", value: event.target.value });
  };

  const inputBlurHandler = (event) => {
    dispatch({ type: "BLUR" });
  };

  const reset = () => {
    dispatch({ type: "RESET" });
  };

  return {
    value: inputState.value,
    isValid: valueIsValid,
    hasError,
    valueChangeHandler,
    inputBlurHandler,
    reset,
  };
};

export default useInput;
