import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { users } from './data'
import { useNavigate } from 'react-router-dom';
import axios from '../../axiosAuth/api/axios'; 

const LoginForm = () => {

  const [loggedInState, setLoggedInState] = useState(false)
  const LOGIN_URL = '/api/auth/login'
  const [user, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  let navigate = useNavigate()

  const submitHandler = (e) => {
    e.preventDefault()
    
    // refactor form inputs: email & password
    let user = e.target[0]
    let password = e.target[1]
    console.log(email.value)
    console.log(password.value)

    // condition to check against data
    if (user.value == users[0].name && password.value == users[0].password || user.value == users[1].name && password.value == users[1].password) {
        console.log(true)
        setLoggedInState(true)
      
    } else {
        alert('Wrong details!')
        console.log(false)
        setLoggedInState(false)
        
    }    
  }
//axios front end 
/* try {
            const response = await axios.post(LOGIN_URL,
                JSON.stringify({ user, password }),
                {
                    headers: { 'Content-Type': 'application/json' },
                    withCredentials: true
                }
            );

           
            console.log(response.data);
            
           
            setAuth({ user, password});
            setUser('');
            setPassword('');
            setSuccess(true);
            setLoggedInState(true)
        } catch (err) {
            if (!err?.response) {
                alert('Wrong details!')
                console.log(false)
                setLoggedInState(false)
                setErrMsg('No Server Response');
            } else if (err.response?.status === 400) {
                alert('Wrong details!')
                console.log(false)
                setLoggedInState(false)
                setErrMsg('Missing Username or Password');
            } else if (err.response?.status === 401) {
                alert('Wrong details!')
                console.log(false)
                setLoggedInState(false)
                setErrMsg('Unauthorized');
            } else {
                setErrMsg('Login Failed');
                alert('Wrong details!')
                console.log(false)
                setLoggedInState(false)
            }
            errRef.current.focus();
        } */
  return (
    <>
        {loggedInState ? (
            navigate('/')
        ) : (
            <Container style={{paddingTop:'1rem'}}>
                <Form onSubmit={submitHandler}>
                    <Row>
                        <Col sm></Col>
                        <Col sm>
                            <Form.Group className="mb-3" >
                            <Form.Label >Email address</Form.Label>
                            <Form.Control type="text" placeholder="Enter username" name="user" required/>
                            <Form.Text className="text-muted">
                                We'll never share your email with anyone else.
                            </Form.Text>
                            </Form.Group>
                        </Col>
                        <Col sm></Col>
                    </Row>
                    <Row>
                        <Col sm></Col>
                        <Col sm>
                            <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" placeholder="Password" name="password" required/>
                            </Form.Group>
                        </Col>
                        <Col sm></Col>
                    </Row>
                    <Row>
                        <Col sm></Col>
                        <Col sm>
                            <Button variant="danger" type="submit">
                            Log In
                            </Button>
                        </Col>
                        <Col sm></Col>
                    </Row>
                </Form>
            </Container>
        )}
    </>
  )
}

export default LoginForm
