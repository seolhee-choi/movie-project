import React, { FC } from 'react';
import UseAuth from "./UseAuth";

interface DashboardProps {
    code: string | null
}
// const Dashboard : FC<DashboardProps> = ({code}) => {
const Dashboard : FC<DashboardProps> = ({code}) => {
    // const accessToken = UseAuth({code})
    const accessToken = UseAuth(code);
    return(
        <div>
            {accessToken}
        </div>
    )
};

export default Dashboard;
