import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Flex, Center } from '@chakra-ui/react';

const Login = () => {
    const navigate = useNavigate();

    const loginAsUser = () => {
        localStorage.setItem('role', 'user');
        navigate('/dashboard');
    };

    const loginAsAdmin = () => {
        localStorage.setItem('role', 'admin');
        navigate('/dashboard');
    };

    return (
        <Flex height="100vh" alignItems="center" justifyContent="center">
            <Center>
                <Flex direction="column" alignItems="center">
                    <Button onClick={loginAsUser} m={2}>
                        Login as User
                    </Button>
                    <Button onClick={loginAsAdmin} m={2}>
                        Login as Admin
                    </Button>
                </Flex>
            </Center>
        </Flex>
    );
};

export default Login;