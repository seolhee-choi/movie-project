import {FC, useState} from 'react';
import UseAuth from './music/UseAuth';
import {Container, Form} from 'react-bootstrap';

interface DashboardProps {
    code: string | null
}
// const Dashboard : FC<DashboardProps> = ({code}) => {
const Dashboard : FC<DashboardProps> = ({code}) => {
    const [ search, setSearch ] =  useState('');

    // const accessToken = UseAuth({code})
    const accessToken = UseAuth(code);
    return <Container className='d-flex flex-column py-2'>
        <Form.Control
            type='search'
            placeholder='Search Songs/Artists'
            value={search}
            onChange={e => setSearch(e.target.value)}
        />
            {/*{accessToken}*/}
    </Container>

};

export default Dashboard;
