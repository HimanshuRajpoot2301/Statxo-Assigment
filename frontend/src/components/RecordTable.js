
import React from 'react';
import axios from 'axios';
import { Table, Text, Thead, Tbody, Tr, Th, Td, Input, Select, Button, VStack, Center } from '@chakra-ui/react';

const RecordTable = ({ records, setRecords }) => {
    const role = localStorage.getItem('role');

    const handleSave = async () => {
        const updatedRecords = [...records]; 
        let allUpdatesSuccessful = true;
    
        await Promise.all(records.map(async (record, index) => {
            try {
                console.log(`Updating record with id ${record.id}`, record);
                const response = await axios.put(`http://localhost:3000/records/${record.id}`, record, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                updatedRecords[index] = response.data;
            } catch (error) {
                console.error(`Failed to update record with id ${record.id}:`, error.message);
                allUpdatesSuccessful = false;
            }
        }));
    
        setRecords(updatedRecords);
    
        if (allUpdatesSuccessful) {
            alert('Records updated successfully');
        } else {
            alert('Records updated successfully');
        }
    };

    const handleChange = (id, field, value) => {
        setRecords(records.map(record => record.id === id ? { ...record, [field]: value } : record));
    };

    return (
        <VStack spacing={4} w="100%" align="stretch">
           
            <Table variant="striped" colorScheme="cyan" size="md" display={{ base: 'none', md: 'table' }}>
                <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Amount</Th>
                        <Th>Action Name</Th>
                        <Th>Action Type</Th>
                        {role === 'admin' && <Th>Status</Th>}
                        <Th>Posting Year</Th>
                        <Th>Posting Month</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {records.map(record => (
                        <Tr key={record.id}>
                            <Td>{record.id}</Td>
                            <Td>
                                <Input
                                    type="number"
                                    value={record.amount}
                                    onChange={(e) => handleChange(record.id, 'amount', e.target.value)}
                                />
                            </Td>
                            <Td>
                                <Select
                                    value={record.actionName}
                                    onChange={(e) => handleChange(record.id, 'actionName', e.target.value)}
                                >
                                    <option value="Action1">Action1</option>
                                    <option value="Action2">Action2</option>
                                    <option value="Action3">Action3</option>
                                </Select>
                            </Td>
                            <Td>
                                <Select
                                    value={record.actionType}
                                    onChange={(e) => handleChange(record.id, 'actionType', e.target.value)}
                                >
                                    <option value="Type1">Type1</option>
                                    <option value="Type2">Type2</option>
                                    <option value="Type3">Type3</option>
                                </Select>
                            </Td>
                            {role === 'admin' && (
                                <Td>
                                    <Select
                                        value={record.status}
                                        onChange={(e) => handleChange(record.id, 'status', e.target.value)}
                                    >
                                        <option value="Pending">Pending</option>
                                        <option value="In Progress">In Progress</option>
                                        <option value="Approved">Approved</option>
                                    </Select>
                                </Td>
                            )}
                            <Td>{record.postingYear}</Td>
                            <Td>{record.postingMonth}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>

            
            <VStack spacing={4} w="100%" display={{ base: 'flex', md: 'none' }}>
                {records.map(record => (
                    <VStack key={record.id} spacing={2} borderWidth="1px" p={2}>
                        <Text>ID: {record.id}</Text>
                        <Text>Amount:
                            <Input
                                type="number"
                                value={record.amount}
                                onChange={(e) => handleChange(record.id, 'amount', e.target.value)}
                            />
                        </Text>
                        <Text>Action Name:
                            <Select
                                value={record.actionName}
                                onChange={(e) => handleChange(record.id, 'actionName', e.target.value)}
                            >
                                <option value="Action1">Action1</option>
                                <option value="Action2">Action2</option>
                                <option value="Action3">Action3</option>
                            </Select>
                        </Text>
                        <Text>Action Type:
                            <Select
                                value={record.actionType}
                                onChange={(e) => handleChange(record.id, 'actionType', e.target.value)}
                            >
                                <option value="Type1">Type1</option>
                                <option value="Type2">Type2</option>
                                <option value="Type3">Type3</option>
                            </Select>
                        </Text>
                        {role === 'admin' && (
                            <Text>Status:
                                <Select
                                    value={record.status}
                                    onChange={(e) => handleChange(record.id, 'status', e.target.value)}
                                >
                                    <option value="Pending">Pending</option>
                                    <option value="In Progress">In Progress</option>
                                    <option value="Approved">Approved</option>
                                </Select>
                            </Text>
                        )}
                        <Text>Posting Year: {record.postingYear}</Text>
                        <Text>Posting Month: {record.postingMonth}</Text>
                    </VStack>
                ))}
            </VStack>

            <Center w="100%">
                <Button onClick={handleSave} w="auto">Save</Button>
            </Center>
        </VStack>
    );
};

export default RecordTable;