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


const loginPage = (props) => {
    const [email, setEmail] = useState("");
    const [password, setPass] = useState("");
    const [goodLogin, setgoodLogin] = useState(false);

    const onChangegoodLogin = (e) => {
        setgoodLogin(e.target.value);
    }

    const [values, setValues] = React.useState({
        showPassword: false,
    });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({
            ...values,
            showPassword: !values.showPassword,
        });
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };


    const changeEmail = (event) => {
        setEmail(event.target.value);
    };

    const changePass = (event) => {
        setPass(event.target.value);
    };

    const resetInputs = () => {
        setEmail("");
        setPass("");
    };

    const onSubmit = (event) => {
        event.preventDefault();

        const UserCreds = {
            email: email,
            password: password,
        };
        axios
            .post("/api/user/login", UserCreds)
            .then((response) => {
                console.log(response.data.name);
                var ProfileDetails = JSON.parse(localStorage.getItem("ProfileDetails")); 
                console.log(ProfileDetails)
                ProfileDetails.name = response.data.name;
                ProfileDetails.email = response.data.email;
                ProfileDetails.contact = response.data.cnum;
                if(response.data.utype == "1"){
                    ProfileDetails.utype = "1";
                    ProfileDetails.age = response.data.age;
                    ProfileDetails.batch = response.data.bname;
                    ProfileDetails.loggedin = "1";
                    ProfileDetails.wallet = response.data.wallet;
                    localStorage.setItem("ProfileDetails", JSON.stringify(ProfileDetails));
                    window.open("/account/buyer/profile", "_self");
                }
                else{
                    ProfileDetails.otime = response.data.otime;
                    ProfileDetails.ctime = response.data.ctime;
                    ProfileDetails.canteen = response.data.canteen;
                    ProfileDetails.utype = "2";
                    ProfileDetails.loggedin = "1"
                    ProfileDetails.manager = response.data.manager;
                    localStorage.setItem("ProfileDetails", JSON.stringify(ProfileDetails));
                    window.open("/account/vendor/profile", "_self");
                }
                console.log(ProfileDetails)
              })
              .catch((error) => {
                console.log(error)
                swal({
                    title: "Oops!",
                    text: "Invalid Credentials",
                    icon: "error",
                    button: "Close!",
                });
            });
                
        
            resetInputs();
    };

    return (

        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <TextField
                    label="Email"
                    variant="outlined"
                    value={email}
                    onChange={changeEmail}
                />
            </Grid>
            <Grid item xs={12}>
                <FormControl sx={{ m: 1, width: '25ch' }} variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={values.showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={changePass}
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
                <Button variant="contained" onClick={onSubmit}>
                    Login
                </Button>
            </Grid>
   
        </Grid>
    );
};

export default loginPage;
