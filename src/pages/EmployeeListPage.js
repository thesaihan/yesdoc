import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './EmployeeListPage.css';

import Axio from 'axios';
import { API_ENDPOINT } from '../utils/Constants';

const EmployeeListPage = () => {

    const [ empList, setEmpList ] = useState([]);

    const fetchEmpList = async () => {
        try {
            const res = await Axio.get( API_ENDPOINT + '/employee');
            setEmpList(res.data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchEmpList();
    }, []);

    return (
        <div className="EmployeeListPage">
            <h1>Employee List Page</h1>
            {
                empList.map(emp => (
                <div className="rounded bg-secondary m-3">
                    <Link to={`/employee/${emp._id}`}>{emp._id}</Link>
                    <h4>{emp.name}</h4>
                </div>
                ))
            }
        </div>
    );
};

export default EmployeeListPage;