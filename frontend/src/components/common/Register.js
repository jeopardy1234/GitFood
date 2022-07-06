import { useState } from "react";
import axios from "axios";
import Grid from "@mui/material/Grid";
import LocalizationProvider from '@mui/lab/LocalizationProvider';
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
import TimePicker from '@mui/lab/TimePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';



const Register = (props) => {
    const [name, setName] = useState("");
    const [manager, setManager] = useState("");
    const [email, setEmail] = useState("");
    const [age, setAge] = useState("");
    const [utype, setUtype] = useState("");
    const [batch, setBatch] = useState("");
    const [contact, setContact] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [canteen, setCanteen] = useState("");
    const [canteenOpeningTime, setCanteenOpeningTime] = React.useState(new Date('2014-08-18T21:11:54'));
    const [canteenClosingTime, setCanteenClosingTime] = React.useState(new Date('2014-08-18T21:11:54'));

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const onChangeUsername = (event) => {
        setName(event.target.value);
    };

    const onChangeEmail = (event) => {
        setEmail(event.target.value);
    };

    const onChangeAge = (event) => {
        setAge(event.target.value);
    };

    const onChangeUtype = (event) => {
        setUtype(event.target.value);
    };

    const onChangeBatch = (event) => {
        setBatch(event.target.value);
    };

    const onChangeContact = (event) => {
        setContact(event.target.value);
    };

    const onChangePassword = (event) => {
        setPassword(event.target.value);
    };

    const onChangeConfirmPassword = (event) => {
        setConfirmPassword(event.target.value);
    };

    const onChangeCanteen = (event) => {
        setCanteen(event.target.value);
    };

    const onChangeManager = (event) => {
        setManager(event.target.value);
    };

    const OnOpenTimeChange = (newValue) => {
        setCanteenOpeningTime(newValue);
    };

    const onCloseTimeChange = (newValue) => {
        setCanteenClosingTime(newValue);
    };
    
    const resetInputs = () => {
        setName("");
        setEmail("");
        setAge("");
        setUtype("");
        setBatch("");
        setContact("");
        setPassword("");
        setConfirmPassword("");
        setCanteen("");Canteen
        setManager("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const newUser = {
            name: name,
            email: email,
            date: Date.now(),
            age: age,
            utype: utype,
            batch: batch,
            contact: contact,
            password: password,
            confirmPassword: confirmPassword,
            manager: manager,
            canteen: canteen,
            canteenOpeningTime: canteenOpeningTime,
            canteenClosingTime: canteenClosingTime
        };

        axios
            .post("/api/user/register", newUser)
            .then((response) => {
                alert("Created\t" + response.data.name);
                console.log(response.data);
            });

        resetInputs();
    };


    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel id="demo-simple-select-label">User</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={utype}
                        label="USER"
                        onChange={onChangeUtype}
                    >
                        <MenuItem value={"1"}>Buyer</MenuItem>
                        <MenuItem value={"2"}>Vendor</MenuItem>

                    </Select>
                </FormControl>
            </Grid>
            {utype == '1' &&
                <>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contact Number"
                            variant="outlined"
                            value={contact}
                            onChange={onChangeContact}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Age"
                            variant="outlined"
                            value={age}
                            onChange={onChangeAge}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel id="demo-simple-select-label">Batch</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={batch}
                                label="Batch"
                                onChange={onChangeBatch}
                            >
                                <MenuItem value={"UG1"}>UG1</MenuItem>
                                <MenuItem value={"UG2"}>UG2</MenuItem>
                                <MenuItem value={"uG3"}>UG3</MenuItem>
                                <MenuItem value={"UG4"}>UG4</MenuItem>
                                <MenuItem value={"UG5"}>UG5</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={onChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Register
                        </Button>
                    </Grid>

                </>
            }

            {utype == '2' &&
                <>
                    <Grid item xs={12}>
                        <TextField
                            label="Name"
                            variant="outlined"
                            value={name}
                            onChange={onChangeUsername}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Manager"
                            variant="outlined"
                            value={manager}
                            onChange={onChangeManager}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel id="demo-simple-select-label">Shop Name</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={canteen}
                                label="Batch"
                                onChange={onChangeCanteen}
                            >
                                <MenuItem value={"JC"}>JC</MenuItem>
                                <MenuItem value={"VC"}>VC</MenuItem>
                                <MenuItem value={"BBC"}>BBC</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Email"
                            variant="outlined"
                            value={email}
                            onChange={onChangeEmail}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Contact Number"
                            variant="outlined"
                            value={contact}
                            onChange={onChangeContact}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider width="25ch" dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Opening Time"
                                    value={canteenOpeningTime}
                                    onChange={OnOpenTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <LocalizationProvider  dateAdapter={AdapterDateFns}>
                                <TimePicker
                                    label="Closing Time"
                                    variant="outlined"
                                    value={canteenClosingTime}
                                    onChange={onCloseTimeChange}
                                    renderInput={(params) => <TextField {...params} />}
                                />
                        </LocalizationProvider>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                            <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                            <OutlinedInput
                                id="outlined-adornment-password"
                                type={values.showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={onChangePassword}
                                endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                            aria-label="toggle password visibility"
                                            onClick={handleClickShowPassword}
                                            onMouseDown={handleMouseDownPassword}
                                            edge="end"
                                        >
                                            {values.showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    </InputAdornment>
                                }
                                label="Password"
                            />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            type="password"
                            label="Confirm Password"
                            variant="outlined"
                            value={confirmPassword}
                            onChange={onChangeConfirmPassword}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button variant="contained" onClick={onSubmit}>
                            Register
                        </Button>
                    </Grid>

                </>
            }

        </Grid>
    );
};

export default Register;
