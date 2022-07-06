import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import Table from 'react-bootstrap/Table'
import Button from "@mui/material/Button";
import * as React from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import swal from 'sweetalert';
import { TableSortLabel } from "@mui/material";


const vendorStats = (props) => {
    const X = JSON.parse(localStorage.getItem('ProfileDetails'));
    const [DisplayTop, setDisplayTop] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    React.useEffect(() => {
        var data = {
            email: X.email
        }
        axios.post(`/api/food/getVendorItems`, data)
            .then(res => {
                console.log(res.data)
                res.data.sort((a, b) => (a.buyerCount < b.buyerCount) ? 1 : -1);
                console.log(res.data)
                setDisplayTop(res.data.slice(0, 5));
            })
            .catch(err => {
                console.log(err);
            })
        axios.post(`/api/order/vendor`, data)
            .then(res => {
                setOrderDetails(res.data[0].orders);
            })
            .catch(err => {
                console.log(err);
            })
    }, [])

    function getNumOrders(){
        return orderDetails.length;
    }

    function getNumPending(){
        return orderDetails.filter(order => order.status === "Pending").length;
    }

    function getNumCompleted(){
        return orderDetails.filter(order => order.status === "Completed").length;
    }

    return (
        <div>
            <Grid container align={"center"} spacing={2}>
                <Grid item xs={12}>
                    <h1>Statistics:</h1>
                </Grid>
                <Grid item xs={12}>
                    <h3>Top Sellers</h3>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Table striped bordered hover>
                        <thead>
                            <th>Food Item</th>
                            <th>Quantity Sold</th>
                        </thead>
                        <tbody>
                            {DisplayTop.map((item, index) => {
                                return (
                                    <tr key={index}>
                                        <td>{item.product}</td>
                                        <td>{item.buyerCount}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={12}>
                    <h3>Live Stats</h3>
                </Grid>
                <Grid item xs={3}></Grid>
                <Grid item xs={6}>
                    <Table striped bordered hover>
                        <thead>
                            <th>Type</th>
                            <th>Quantity</th>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Orders Placed</td>
                                <td>{getNumOrders()}</td>
                            </tr>
                            <tr>
                                <td>Orders Pending</td>
                                <td>{getNumPending()}</td>
                            </tr>
                            <tr>
                                <td>Orders Completed</td>
                                <td>{getNumCompleted()}</td>
                            </tr>
                        </tbody>
                    </Table>
                </Grid>
                <Grid item xs={3}></Grid>
            </Grid>
        </div>
    );
};

export default vendorStats;
