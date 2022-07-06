import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";

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
import Checkbox from '@mui/material/Checkbox';
import ListItemText from '@mui/material/ListItemText';
import { ta } from "date-fns/locale";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names = [
    'Beverage',
    'Sweet',
    'Salty',
    'Spicy',
    'Sour',
  ];

const editItem = (props) => {

    var X = JSON.parse(localStorage.getItem("ItemEdit"));
    console.log(X);
    const [food, setFood] = useState(X.product);
    const [price, setPrice] = useState(X.price);
    const [cheese, setCheese] = useState(X.addons.cheese);
    const [mayo, setMayo] = useState(X.addons.mayo);
    const [oregano, setOregano] = useState(X.addons.oregano);
    const [butter, setButter] = useState(X.addons.butter);
    const [egg, setEgg] = useState(X.addons.egg);
    const [ftype, setFtype] = useState(X.type);

    function changeFood(event) {
        setFood(event.target.value);
    }

    const [TagName, setTagName] = React.useState([]);

    const resetInputs = () => {
        setFood("");
        setPrice("0");
        setCheese("0");
        setMayo("0");
        setOregano("0");
        setButter("0");
        setEgg("0");
        setFtype("");
        setTagName([]);
    };


    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setTagName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    function cheesePrice(event) {
        setCheese(event.target.value);
    }

    function mayoPrice(event) {
        setMayo(event.target.value);
    }

    function oreganoPrice(event) {
        setOregano(event.target.value);
    }

    function butterPrice(event) {
        setButter(event.target.value);
    }

    function eggPrice(event) {
        setEgg(event.target.value);
    }

    function amt(event) {
        setPrice(event. target.value);
    }

    function changeFoodType(event){
        setFtype(event.target.value);
    }

    function onSubmit(event){
        if(food == "" || price == "" || ftype == ""){
            swal("Missing Some Fields");
            return;
        }
        const X = JSON.parse(localStorage.getItem("ProfileDetails"));
        const Y = JSON.parse(localStorage.getItem("ItemEdit"));

        console.log(TagName)
        var data = {
            _id: Y._id,
            food: food,
            price: price,
            cheese: cheese,
            mayo: mayo,
            oregano: oregano,
            butter: butter,
            egg: egg,
            ftype: ftype,
            tags: TagName,
            email: X.email,
            vendor: X.name,
            canteen: X.canteen,
        }
        console.log(data)
        axios
            .post("/api/order/edit", data)
            .then((response) => {
                alert("Data Updated Successfully");
                window.open("/account/vendor/searchresult","_self")
            });
        resetInputs();
    }


    return (

        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <h4>Food Item</h4>
                <TextField
                    label="Food Item"
                    variant="outlined"
                    defaultValue={food}
                    onChange={changeFood}
                />
            </Grid>
            <Grid item xs={12}>
                <h4>Food Type</h4>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel id="demo-simple-select-label">Type</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={ftype}
                        label="Food Type"
                        onChange={changeFoodType}
                    >
                        <MenuItem value={"veg"}>Veg</MenuItem>
                        <MenuItem value={"nveg"}>Non-Veg</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <h4>Food Tags</h4>
                <FormControl sx={{ m: 1, width: '25ch' }}>
                    <InputLabel id="demo-multiple-checkbox-label">Tag</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={TagName}
                        onChange={handleChange}
                        input={<OutlinedInput label="Tag" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {names.map((name) => (
                            <MenuItem key={name} value={name}>
                                <Checkbox checked={TagName.indexOf(name) > -1} />
                                <ListItemText primary={name} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Grid>
            <Grid item xs={12}>
                <h4>Addons(Price)</h4>
                <TextField
                    label="Cheese"
                    variant="outlined"
                    defaultValue={cheese}
                    onChange={cheesePrice}
                />
                <TextField
                    label="Oregano"
                    variant="outlined"
                    defaultValue={oregano}
                    onChange={oreganoPrice}
                />
                <TextField
                    label="Mayonnaise"
                    variant="outlined"
                    defaultValue={mayo}
                    onChange={mayoPrice}
                />
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Egg"
                    variant="outlined"
                    defaultValue={egg}
                    onChange={eggPrice}
                />
                <TextField
                    label="Butter"
                    variant="outlined"
                    defaultValue={butter}
                    onChange={butterPrice}
                />
            </Grid>
            <Grid item xs={12}>
                <h4>Price</h4>
                <TextField
                    label="Price"
                    variant="outlined"
                    defaultValue={price}
                    onChange={amt}
                />
            </Grid>
            <Grid item xs={12}>
            <Button variant="contained" onClick={onSubmit}>
                            Edit
                        </Button>
            </Grid>

        </Grid>
    );
};

export default editItem;
