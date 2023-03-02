import useInput from '../hooks/use-input';

const isNotEmpty = value => value.trim() !== '';
const isEmail = value => value.includes('@')

const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    isValid: firstNameIsValid,
    hasError: firstNameInputHasError,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: firstNameResetHandler, 
  } = useInput(isNotEmpty)

  const {
    value: enteredLastName,
    isValid: lastNameIsValid,
    hasError: lastNameInputHasError,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: lastNameResetHandler, 
  } = useInput(isNotEmpty)

  const {
    value: enteredEmail,
    isValid: emailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: emailResetHandler, 
  } = useInput(isEmail)

  let formIsValid = false;
  
  if (firstNameIsValid && lastNameIsValid && emailIsValid) {
    formIsValid = true;
  }

  const formSubmissionHandler = (event) => {
    event.preventDefault();

    if (!formIsValid) {
      return;
    }

    console.log('Submitted: ', enteredFirstName, enteredLastName, enteredEmail)

    firstNameResetHandler();
    lastNameResetHandler();
    emailResetHandler();
  }

  const firstNameClasses = firstNameInputHasError ? 'form-controlinvalid' : 'form-control';
  const lastNameClasses = lastNameInputHasError ? 'form-controlinvalid' : 'form-control'
  const emailClasses = emailInputHasError ? 'form-controlinvalid' : 'form-control'


  return (
    <form onSubmit={formSubmissionHandler}>
      <div className='control-group'>
        <div className={firstNameClasses}>
          <label htmlFor='name'>First Name</label>
          <input type='text' id='name' value={enteredFirstName} onChange={firstNameChangeHandler} onBlur={firstNameBlurHandler} />
          {firstNameInputHasError && (<p className="error-text">First name must not be empty</p>)}
        </div>
        <div className={lastNameClasses}>
          <label htmlFor='lname'>Last Name</label>
          <input type='text' id='lname'  value={enteredLastName} onChange={lastNameChangeHandler} onBlur={lastNameBlurHandler} />
          {lastNameInputHasError && (<p className='error-text'>Last name must not be empty</p>)}
        </div>
      </div>
      <div className={emailClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input type='email' id='name'  value={enteredEmail} onChange={emailChangeHandler} onBlur={emailBlurHandler} />
        {emailInputHasError && (<p className='error-text'>Please enter a valid email</p>)}
      </div>
      <div className='form-actions'>
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
