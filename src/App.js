import { createUserWithEmailAndPassword, getAuth, sendEmailVerification, sendPasswordResetEmail, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import app from './firebase.init';
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { useState } from "react";

const auth = getAuth(app);
function App() {

  const [validated, setValidated] = useState(false);
  const [registered,setRegistered] = useState(false);
  const [error , setError] = useState('');
  const [name,setName] = useState('');
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  const handleUserNameBlur = (event) =>{
    setName(event.target.value);
  }

  const handleEmailBlur = (e) => {
    setEmail(e.target.value);
  }

  const handlePasswordBlur = (e) => {
    setPassword(e.target.value);
  }

  const handleRegisteredChange=(event)=>{
    setRegistered(event.target.checked);
  }

  const submitButton = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
     
      event.stopPropagation();
      return;
    }

    if(!/(?=.*?[#!?@$%^&*-])/.test(password)){
      setError('please should at least one special charecter');
      return;
    }
    setValidated(true);
    setError ('successfully signin');

    if(registered){
      signInWithEmailAndPassword(auth,email,password)
      .then(result =>{
        const user = result.user;
        console.log(user);
      })
      .catch(error=>{
        console.log(error);
        setError(error.message);
      })
    }
    else{
      createUserWithEmailAndPassword(auth,email,password)
      .then(result =>{
        const user = result.user;
        console.log(user);
        setEmail('');
        setPassword('');
        verifyEmail();
        setUserName();
      })
      .catch(error =>{
        console.error(error);
        setError(error.message);
      })
    }
   
    event.preventDefault();
  }

  const setUserName = () =>{
    updateProfile(auth.currentUser,{
      displayName: name
    })
    .then(()=>{
      console.log('update user name');
    }).catch(error=>{
      setError(error.message);
    })
  }

  const verifyEmail = ()=>{
    sendEmailVerification(auth.currentUser)
    .then(()=>{
      console.log('send email verification in your mail!!!');
    })
  }

  const passwordReset =()=>{
    sendPasswordResetEmail(auth,email)
    .then(()=>{
      console.log('send email');
    })
  }
  return (
    <div>
      <div className="register w-50 mx-auto mt-2">
        <h2 className="text-primary">Please {registered ?'Login' : 'Registration'}</h2>
        <Form noValidate validated={validated} onSubmit={submitButton}>
          { !registered && <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>User Name</Form.Label>
            <Form.Control onBlur={handleUserNameBlur} type="text" placeholder="user name" required />
            <Form.Control.Feedback type="invalid">
            Please provide your name.
          </Form.Control.Feedback>
          </Form.Group>}
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control onBlur={handleEmailBlur} type="email" placeholder="Enter email" required />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
            <Form.Control.Feedback type="invalid">
            Please provide a valid email.
          </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control onBlur={handlePasswordBlur} type="password" placeholder="Password" required />
            <Form.Control.Feedback type="invalid">
            Please provide a valid password.
          </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicCheckbox">
            <Form.Check onChange={handleRegisteredChange} type="checkbox" label="Already registered!!" />
          </Form.Group>
          <Button onClick={passwordReset} variant="link">Reset Password</Button>
          <br />
          <Button variant="primary" type="submit">
           {registered ? 'Login' : ' Registration'}
          </Button>
          <p>{error}</p>
        </Form>
      </div>

    </div>
  );
}

export default App;
