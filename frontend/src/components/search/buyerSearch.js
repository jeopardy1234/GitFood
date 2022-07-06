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
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const [searchText, setSearchText] = useState("");
    const [ftype, setFtype] = React.useState(
        {
            'veg': false,
            'nonveg': false,
        }
    );
    const [canteen, setCanteen] = React.useState(
        {
            'JC': false,
            'VC': false,
            'BBC': false,
        }
    );
    const [tag, setTag] = React.useState(
        {
            'salty': false,
            'sweet': false,
            'spicy': false,
            'sour': false,
        }
    );

    const [sortValue, setSortValue] = React.useState(
        {
            'price': false,
            'rating': false,
        }
    );

    const [priceRange, setPriceRange] = React.useState(
        {
            'min': 0,
            'max': 10000,
        }
    );
    const [sortName, setSortName] = React.useState(0);
    const [foodItems, setFoodItems] = React.useState([]);
    const [FinalFoodItems, setFinalFoodItems] = React.useState([]);
    // console.log(FinalFoodItems);
    const customFunction = (event) => {
        console.log(event.target.value);
        setSearchText(event.target.value);
      };

    function FinalStateDisplay() {
        let temp = [...foodItems];
        if (sortValue['price'] === true) {
            if (sortName === 0) {
                temp.sort((a, b) => (a.price > b.price) ? 1 : -1);
            } else {
                temp.sort((a, b) => (a.price < b.price) ? 1 : -1);
            }
        }
        else if (sortValue['rating'] === true) {
            if (sortName === 0) {
                temp.sort((a, b) => (a.rating > b.rating) ? 1 : -1);
            } else {
                temp.sort((a, b) => (a.rating < b.rating) ? 1 : -1);
            }
        }

        var y = [];
        for (let i = 0; i < temp.length; i++) {
            var poss = true
            var fnd = false
            if (temp[i].price < priceRange['min'] || temp[i].price > priceRange['max']) {
                poss = false
                continue;
            }
            if (temp[i].type === 'veg' && ftype['nonveg'] === true) {
                poss = false;
                continue;
            }
            else if (temp[i].type === 'nveg' && ftype['veg'] === true) {
                poss = false;
                continue;
            }

            if (temp[i].canteen === 'JC' && canteen['JC'] === false) {
                poss = false;
            }
            else if (temp[i].canteen === 'VC' && canteen['VC'] === false) {
                poss = false;
            }
            else if (temp[i].canteen === 'BBC' && canteen['BBC'] === false) {
                poss = false;
            }

            if (canteen['JC'] === false && canteen['VC'] === false && canteen['BBC'] === false) {
                poss = true;
            }

            if ((temp[i].tags.sweet === true && tag['sweet'] === true) || (temp[i].tags.salty === true && tag['salty'] === true) || (temp[i].tags.spicy === true && tag['spicy'] === true) || (temp[i].tags.sour === true && tag['sour'] === true)) {
                fnd = true;
            }
            if (tag['sweet'] === false && tag['salty'] === false && tag['spicy'] === false && tag['sour'] === false) {
                fnd = true;
            }

            if (poss && fnd)
                y.push(temp[i]);
        }
        setFinalFoodItems([...y]);
    }


    function OnChangeFtype(event) {
        var x = ftype['veg'];
        var y = ftype['nonveg'];
        var z = event.target.name;
        if (z === 'veg') { if (y === true) { x = !x; y = !y; } else { x = !x; } }
        else { if (x === true) { y = !y; x = !x; } else { y = !y; } }
        setFtype({ 'veg': x, 'nonveg': y, });
    }

    function OnChangeSort(event) {
        var x = sortValue['price'];
        var y = sortValue['rating'];
        var z = event.target.name;
        if (z === 'price') { if (y === true) { x = !x; y = !y; } else { x = !x; } }
        else { if (x === true) { y = !y; x = !x; } else { y = !y; } }
        setSortValue({ 'price': x, 'rating': y, });
    }

    function OnChangeCanteen(event) {
        setCanteen({
            ...canteen,
            [event.target.name]: !canteen[event.target.name]
        })
    }

    function OnChangeTag(event) {
        setTag({
            ...tag,
            [event.target.name]: !tag[event.target.name]
        })
    }

    function VNitem(item) {
        if (item.type === 'veg')
            return "Veg";
        else
            return "Non-Veg";
    }

    function sortChange(event) {
        if (sortName === 0)
            setSortName(1);
        else
            setSortName(0);
    }
    console.log(priceRange['min']);
    function OnChangePriceRange(event) {
        var z = event.target.name;
        console.log(z);
        if (z === 'min') {
            setPriceRange({
                ...priceRange,
                [z]: event.target.value
            })
        }
        else {
            setPriceRange({
                ...priceRange,
                [z]: event.target.value
            })
        }
    }

    useEffect(() => {
        axios
            .get("/api/food")
            .then((response) => {
                setFoodItems(response.data);
                setFinalFoodItems(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const [personName, setPersonName] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function GotoOrder(event, item) {
        localStorage.setItem('CurrentOrder', JSON.stringify(item));
        window.open("/account/buyer/orders", "_self");
    }
    
    function buttonYN(item) {
        var poss = true;
        var currentDate = new Date().toLocaleTimeString();
        var startTime = new Date(item.otime).toLocaleTimeString();
        var endTime = new Date(item.ctime).toLocaleTimeString();

        console.log(currentDate);
        console.log(startTime);
        console.log(endTime);
        currentDate = new Date()

        var startDate = new Date(currentDate.getTime());
        startDate.setHours(startTime.split(":")[0]);
        startDate.setMinutes(startTime.split(":")[1]);
        startDate.setSeconds(startTime.split(":")[2]);

        var endDate = new Date(currentDate.getTime());
        endDate.setHours(endTime.split(":")[0]);
        endDate.setMinutes(endTime.split(":")[1]);
        endDate.setSeconds(endTime.split(":")[2]);

        if(startDate < endDate)
            poss = startDate < currentDate && endDate > currentDate
        else
        {
            var endTime1 = "23:59:59";
            var endDate1 = new Date(currentDate.getTime());
            endDate1.setHours(endTime1.split(":")[0]);
            endDate1.setMinutes(endTime1.split(":")[1]);
            endDate1.setSeconds(endTime1.split(":")[2]);

            var poss1 = startDate < currentDate && endDate1 > currentDate

            var startTime1 = "00:00:00";
            var startDate1 = new Date(currentDate.getTime());
            startDate1.setHours(startTime1.split(":")[0]);
            startDate1.setMinutes(startTime1.split(":")[1]);
            startDate1.setSeconds(startTime1.split(":")[2]);

            var poss2 = startDate1 < currentDate && endDate > currentDate

            poss = poss1 || poss2
        }
        console.log(poss)
            if(poss){
                console.log("Hello from success")
                return(<Button variant="contained" color="success" onClick={(event) => GotoOrder(event, item)}>Order</Button>)
            }
            else{
                return(<text style={{color: 'red'}}>Not Available</text>)
            }
    }

    return (
        <div>
            <h1> Select Your Meal! </h1>
            <br></br>
            <br></br>
            <br></br>
            <Grid container spacing="2">
                <Grid item xs={12} md={3} lg={3} justifyContent="flex-end">
                    <table>
                        <tbody>
                            <h5>Type:</h5>
                            <tr>
                                <td><FormControlLabel control={<Checkbox name='veg' checked={ftype['veg']} color='warning' onChange={OnChangeFtype} />} label="Veg" /></td>
                                <td><FormControlLabel control={<Checkbox name='nonveg' checked={ftype['nonveg']} color='warning' onChange={OnChangeFtype} />} label="Non-Veg" /></td>
                            </tr>
                            <br></br>
                            <h5>Canteen:</h5>
                            <tr>
                                <td><FormControlLabel control={<Checkbox name='JC' checked={canteen['JC']} color='warning' onChange={OnChangeCanteen} />} label="JC" /></td>
                                <td><FormControlLabel control={<Checkbox name='VC' checked={canteen['VC']} color='warning' onChange={OnChangeCanteen} />} label="VC" /></td>
                            </tr>
                            <tr>
                                <td><FormControlLabel control={<Checkbox name='BBC' checked={canteen['BBC']} color='warning' onChange={OnChangeCanteen} />} label="BBC" /></td>
                            </tr>
                            <br></br>
                            <h5>Tags:</h5>
                            <tr>
                                <td><FormControlLabel control={<Checkbox name='salty' checked={tag['salty']} color='warning' onChange={OnChangeTag} />} label="Salty" /></td>
                                <td><FormControlLabel control={<Checkbox name='sweet' checked={tag['sweet']} color='warning' onChange={OnChangeTag} />} label="Sweet" /></td>
                            </tr>
                            <tr>
                                <td><FormControlLabel control={<Checkbox name='spicy' checked={tag['spicy']} color='warning' onChange={OnChangeTag} />} label="Spicy" /></td>
                                <td><FormControlLabel control={<Checkbox name='sour' checked={tag['sour']} color='warning' onChange={OnChangeTag} />} label="Sour" /></td>
                            </tr>
                            <br></br>
                            <h5>Sort By:</h5>
                            <tr>
                                <td><FormControlLabel control={<Checkbox name='price' checked={sortValue['price']} color='warning' onChange={OnChangeSort} />} label="Price" /></td>
                                <td><FormControlLabel control={<Checkbox name='rating' checked={sortValue['rating']} color='warning' onChange={OnChangeSort} />} label="Rating" /></td>
                                <Button onClick={sortChange}>
                                    {sortName ? <ArrowDownwardIcon /> : <ArrowUpwardIcon />}
                                </Button>
                            </tr>
                            <br></br>
                            <h5>Price Range:</h5>
                            <br></br>
                            <tr>
                                <td>
                                    <TextField
                                        name="min"
                                        label="Min-Price"
                                        variant="outlined"
                                        defaultValue={String(priceRange['min'])}
                                        onChange={OnChangePriceRange}
                                    />
                                </td>
                                <td>
                                    <TextField
                                        name="max"
                                        label="Max-Price"
                                        variant="outlined"
                                        defaultValue={priceRange['max']}
                                        onChange={OnChangePriceRange}
                                    />
                                </td>
                            </tr>
                            <br></br>
                        </tbody>
                    </table>
                    <Button variant="contained" onClick={FinalStateDisplay}>
                        Apply Filters
                    </Button>
                </Grid>
                <Grid item xs={12} md={9} lg={9}>
                    <Grid item xs={12} md={9} lg={9}>
                        <List component="nav" aria-label="mailbox folders">
                            <TextField
                                id="standard-basic"
                                label="Search"
                                fullWidth={true}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment>
                                            <IconButton>
                                                <SearchIcon />
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }}
                            onChange={customFunction}
                            />
                        </List>
                    </Grid>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>Product</th>
                                <th>Price</th>
                                <th>Canteen</th>
                                <th>Rating</th>
                                <th>Type(V/N)</th>
                                {/* <th>Quantity</th>
                                <th>Addons</th> */}
                                <th>Order</th>
                            </tr>
                        </thead>
                        <tbody>

                            {FinalFoodItems.map((item, index)  => {
                                if(item.product.includes(searchText))return (
                                <tr key={index}>
                                    <td>{index + 1}</td>
                                    <td>{item.product}</td>
                                    <td>{item.price}</td>
                                    <td>{item.canteen}</td>
                                    <td>{item.rating.toFixed(2)}</td>
                                    <td>{VNitem(item)}</td>
                                    {/* <td width="100px"><Button variant="contained" color="success" onClick={(event) => GotoOrder(event, item)}>Order</Button></td> */}
                                    <td>{buttonYN(item)}</td>
                                </tr>);}
                            )}
                        </tbody>
                    </Table>
                </Grid>
            </Grid>
        </div>


    );
};

export default BuyerSearch;