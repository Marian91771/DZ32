import Form from 'react-bootstrap/Form';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signInAsync } from '../store/AuthSlice';

export default function AuthPage() {
    const loginRef = useRef();
    const passRef = useRef();
    const dispatch = useDispatch();
    const error = useSelector(state => state.auth.error);

    const handleSubmit = async (event) => {
        event.preventDefault();
        dispatch(signInAsync({
            username: loginRef.current.value,
            password: passRef.current.value
        }));
    };

    return (
        <Form onSubmit={handleSubmit}>
            <Form.Group className='mb-3' controlId="loginForm.login">
                <Form.Label>Enter your login:</Form.Label>
                <Form.Control type='text' placeholder='login...' ref={loginRef} />
            </Form.Group>
            <Form.Group className='mb-3' controlId="loginForm.password">
                <Form.Label>Enter your password:</Form.Label>
                <Form.Control type='password' placeholder='password...' ref={passRef} />
            </Form.Group>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <Button type="submit">Login</Button>
        </Form>
    );
}
