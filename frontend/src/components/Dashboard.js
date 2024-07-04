
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RecordTable from './RecordTable';
import AddRecordForm from './AddRecordForm';
import { Flex, Box, Text, Spacer, VStack } from '@chakra-ui/react';

const Dashboard = () => {
    const [records, setRecords] = useState([]);

    useEffect(() => {
        const fetchRecords = async () => {
            const response = await axios.get('http://localhost:3000/records');
            setRecords(response.data);
        };
        fetchRecords();
    }, []);

    return (
        <Flex flexWrap="wrap">
           
            <Box
                w={{ base: '100%', md: '20%' }}
                minH="100vh"
                bgGradient="linear(to-b, gray.200, gray.400)"
                p={4}
                color="black"
            >
                <VStack spacing={4} align="stretch">
                    <Text fontSize="lg" fontWeight="bold">Create Record</Text>
                    <AddRecordForm setRecords={setRecords} />
                </VStack>
            </Box>

            <Box flex="1" p={8} bgGradient="linear(to-b, white, gray.100)">
              
                <Flex bgGradient="linear(to-r, teal.500, cyan.500)" p={4} align="center">
                    <Spacer />
                    <Text fontSize="2xl" fontWeight="bold" color="white">Statxo</Text>
                    <Spacer />
                </Flex>

                
                <RecordTable records={records} setRecords={setRecords} />
            </Box>
        </Flex>
    );
};

export default Dashboard;