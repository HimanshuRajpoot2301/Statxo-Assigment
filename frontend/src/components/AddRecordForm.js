

import React, { useState } from 'react';
import axios from 'axios';
import { Input, Select, Button, VStack } from '@chakra-ui/react';

const AddRecordForm = ({ setRecords }) => {
    const [formData, setFormData] = useState({
        id: '',
        quantity: '',
        amount: '',
        postingYear: new Date().getFullYear(),
        postingMonth: new Date().toLocaleString('default', { month: 'long' }),
        actionType: 'Type1',
        actionNumber: '001',
        actionName: 'Action1',
        status: 'Pending',
        impact: 'Low'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await axios.post('http://localhost:3000/records', formData);
        setRecords(records => [...records, response.data]);
        setFormData({
            id: '',
            quantity: '',
            amount: '',
            postingYear: new Date().getFullYear(),
            postingMonth: new Date().toLocaleString('default', { month: 'long' }),
            actionType: 'Type1',
            actionNumber: '001',
            actionName: 'Action1',
            status: 'Pending',
            impact: 'Low'
        });
    };

    return (
        <VStack as="form" onSubmit={handleSubmit} spacing={4} w="100%">
            <Input
                type="number"
                name="id"
                value={formData.id}
                onChange={handleChange}
                placeholder="ID"
                size="md"
                isRequired
            />
            <Input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Quantity"
                size="md"
                isRequired
            />
            <Input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                placeholder="Amount"
                size="md"
                isRequired
            />
            <Select name="actionName" value={formData.actionName} onChange={handleChange} size="md">
                <option value="Action1">Action1</option>
                <option value="Action2">Action2</option>
                <option value="Action3">Action3</option>
            </Select>
            <Select name="actionType" value={formData.actionType} onChange={handleChange} size="md">
                <option value="Type1">Type1</option>
                <option value="Type2">Type2</option>
                <option value="Type3">Type3</option>
            </Select>
            <Select name="impact" value={formData.impact} onChange={handleChange} size="md">
                <option value="Low">Low</option>
                <option value="Mid">Mid</option>
                <option value="High">High</option>
            </Select>
            <Button type="submit" w="50%">Add Record</Button>
        </VStack>
    );
};

export default AddRecordForm;