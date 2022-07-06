import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';



const Register = (props) => {
    return (
        <div>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Price</th>
                        <th>Canteen</th>
                        <th>Vendor</th>
                        <th>Rating</th>
                    </tr>
                </thead>
            </Table>
        </div>


    );
};

export default Register;