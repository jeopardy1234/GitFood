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
    const [kash, setKash] = useState("");
    function onChangeKash(e) {
        setKash(e.target.value);
    }
    function addCash(kash){
        if(kash < 0){
            swal("Error", "You can't enter negative value", "error");
            return ;
        }
        var X = JSON.parse(localStorage.getItem("ProfileDetails"));
        X.wallet = String(Number(X.wallet) + Number(kash));
        var data = {
            "email": X.email,
            "wallet": Number((Number)(X.wallet) + Number(kash))
        }
        localStorage.setItem("ProfileDetails", JSON.stringify(X));
        axios.post("/api/user/updateKash", X).then(res => {
        swal("Success", "Your wallet has been updated", "success").then(() => {
        window.location.reload();
        });
        }).catch(err => {
            console.log(err);
        }
)
    }
    return (
        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <h1>Welcome To GitRich</h1>
            </Grid>
            <Grid item xs={12}>
                <h4>Enter an amount to GitCash</h4>
            </Grid>
            <Grid item xs={12}>
                <TextField
                    label="Free Money"
                    variant="outlined"
                    value={kash}
                    onChange={onChangeKash}
                />
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="primary" onClick={(e) => { addCash(kash) }}> GitCash </Button>
            </Grid>
        </Grid>

    )
};

export default loginPage;
