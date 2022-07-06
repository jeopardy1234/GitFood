import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import FormGroup from "react-bootstrap/esm/FormGroup";
import { FormControlLabel } from "@material-ui/core";
import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import { useState, useEffect } from "react";
import axios from "axios";
import Button from "@mui/material/Button";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import SearchIcon from "@mui/icons-material/Search";
import Autocomplete from "@mui/material/Autocomplete";
import List from "@mui/material/List";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel'
import Select from '@mui/material/Select';
import OutlinedInput from '@mui/material/OutlinedInput';
import MenuItem from '@mui/material/MenuItem';
import ListItemText from '@mui/material/ListItemText';
import swal from "sweetalert";
import {send} from "emailjs-com";

const VendorList = (props) => {

    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState({});
    var X = JSON.parse(localStorage.getItem('ProfileDetails'));
    var data = {
        email: X.email,
    }
    console.log(orders);
    const [toSend, setToSend] = useState({
        from_name: '',
        to_email: ''
      });
    useEffect(() => {
        axios
            .post("/api/order/vendor", data)
            .then((response) => {
                //console.log(response.data[0]);
                setOrders(response.data[0].orders);
            })
            .catch((error) => {
                console.log(
                    error);
            });
    }, []);

    const sendEmail = (e) => {
        e.preventDefault();
        send(
          'service_rxrq7yk',
          'template_2txvoay',
          toSend,
          'user_F6VbGEQI3YsWsLAyI8xLL'
        )
          .then((response) => {
            console.log('SUCCESS!', response.status, response.text);
          })
          .catch((err) => {
            console.log('FAILED...', err);
          });
      };

    function changeStatus(item, index, new_status, event) {
        if(new_status === "Accepted"){
            var NumCooking = orders.filter(order => order.status === "Cooking").length;
            var NumAccepted = orders.filter(order => order.status === "Accepted").length;
            console.log(NumCooking);
            console.log(NumAccepted);
            if(NumCooking + NumAccepted > 10){
                swal("You can only have 10 orders in Cooking and Accepted status at a time");
                return ;
            }
        }
        if(new_status === "Rejected"){
            var data = {
                email: item.buyerEmail,
                cash: item.netCost,
            }
            axios.post("/api/user/addCash", data).then(res => {
                console.log(res);
            }).catch(err => {
                console.log(err);
            })
        }
            
        var data = {
            email: X.email,
            orderID: item.orderID,
            status: new_status,
            index: index,
        }
        console.log(data)
        console.log(data);
        axios
            .post("/api/order/change", data)
            .then((response) => {
                axios
                    .post("/api/order/vendor", data)
                    .then((response1) => {
                        console.log(response1.data[0])
                        //console.log(response1.data[0]);
                        setOrders(response1.data[0].orders);
                        axios
                            .post("/api/order/change1", data)
                            .then((response2) => {
                                console.log(response2.data)
                                if(new_status == "Accepted"){
                                    setToSend({
                                        from_name: X.name,
                                        to_email: item.buyerEmail,
                                    });
                                    console.log(toSend);
                                    sendEmail(event)
                                }
                            })

                    })
                    .catch((error) => {
                        console.log(
                            error);
                    });


            })
            .catch((error) => {
                console.log(
                    error);
            });
    }

    function DisplayStatus(item, index) {
        if (item.status == "Pending") {
            return (
                <div>
                    <Button variant="contained" color="success" onClick={(event) => { changeStatus(item,index,"Accepted", event) }} style={{ margin: '10px' }}>Accept</Button>
                    <Button variant="contained" color="warning" onClick={(event) => { changeStatus(item,index,"Rejected", event) }} style={{ margin: '10px' }}>Reject</Button>
                </div>
            )
        }
        else if (item.status == "Rejected") {
            return (
                <div>
                    <text style={{ color: 'red' }}>Rejected</text>
                </div>
            )
        }
        else if(item.status == "Accepted"){
            return(
                <div>
                    <Button variant="contained" color="secondary" onClick={(event) => { changeStatus(item,index,"Cooking", event) }} style={{ margin: '10px' }}>Cook</Button>
                </div>
            )
        }
        else if(item.status == "Cooking"){
            return(
                <div>
                    <Button variant="contained" color="secondary" onClick={(event) => { changeStatus(item,index,"Ready", event) }} style={{ margin: '10px' }}>Set Ready</Button>
                </div>
            )
        }
        else if (item.status == "Ready") {
            return (
                <text style={{ color: 'orange' }}>Ready for Pickup</text>
            )
        }
        else{
            return(
                <div>
                    <text style={{ color: 'green' }}>Completed</text>
                </div>
            )
        }

    }

    return (
        <div>
            <h1> Check Your Orders! </h1>
            <br></br>
            <br></br>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Placed Time</th>
                        <th>Food Item</th>
                        <th>Buyer Email</th>
                        <th>Quantity</th>
                        <th>Cost(V/N)</th>
                        <th>Change Status</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        orders.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{item.timeStr}</td>
                                <td>{item.foodName}</td>
                                <td>{item.buyerEmail}</td>
                                <td>{item.quantity}</td>
                                <td>{item.netCost}</td>
                                <td width="250px">{DisplayStatus(item, index)}</td>
                            </tr>
                        ))}
                </tbody>
            </Table>
        </div>


    );
};

export default VendorList;