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

const BuyerSearch = (props) => {
    function AddItem(event) {
        window.open("/account/vendor/additem", "_self");
    }

    const [foodItems, setFoodItems] = React.useState([]);
    useEffect(() => {
        axios
            .get("/api/food")
            .then((response) => {
                setFoodItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    function VNitem(item) {
        if (item.type === 'veg')
            return "Veg";
        else
            return "Non-Veg";
    }

    function DisplayAddons(item){
        var str = "";
        for (var [key, value] of Object.entries(item.addons)) {
            if(key=="_id")continue;
            if(value){
                str += String(key) + ": " + String(value) + ", ";
            }
        }
        console.log(str);
        if(str)
            return str;
        else
            return "None";
    }

    function editItem(item){
        console.log(item);
        localStorage.setItem("ItemEdit", JSON.stringify(item));
        window.open("/account/vendor/edititem", "_self");
    }
    function deleteItem(item){
        let y = window.confirm("Are you sure you want to delete this item?");
        if(y){
            console.log(item);
            axios
            .post("/api/food/delete" ,item)
            .then((response) => {
                axios
                    .get("/api/food")
                    .then((response) => {
                        setFoodItems(response.data);
                    })
                    .catch((error) => {
                        console.log(error);
                    });

            });
        }
    }
    return (
        <div>
            <h1> Add Your Meals! </h1>
            <Button variant="contained" onClick={(event) => AddItem(event)}>Add Item</Button>
            <br></br>
            <br></br>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Product</th>
                        <th>Addons</th>
                        <th>Price</th>
                        <th>Type(V/N)</th>
                        <th>Edit/Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {foodItems.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.product}</td>
                            <td>{DisplayAddons(item)}</td>
                            <td>{item.price}</td>
                            <td>{VNitem(item)}</td>
                            <td width='200px'>
                                <Button variant="contained" color="success" onClick={(event) => {editItem(item)}} style={{margin: '10px'}}>Edit</Button>
                                <Button variant="contained" color="warning" onClick={(event) => {deleteItem(item)}}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>

            </Table>
        </div>


    );
};

export default BuyerSearch;