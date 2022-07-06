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
import { FormControlLabel } from "@material-ui/core";
import yearsToMonths from "date-fns/fp/yearsToMonths/index";

const BuyOrder = (props) => {
    var X = JSON.parse(localStorage.getItem("CurrentOrder"));

    const [TagName, setTagName] = React.useState([]);
    const [netCost, setNetCost] = React.useState(0);
    const [Quantity, setQuantity] = useState(0);
    const [Addons, setAddons] = useState({
        'Cheese': false,
        'Mayo': false,
        'Oregano': false,
        'Butter': false,
        'Egg': false,
    });
    console.log(Quantity)
    function CalcNet(){
        console.log("Hello");
        var net = 0;
        if(Addons.Cheese){
            net = net + X.addons.cheese
        }
        if(Addons.Mayo){
            net = net + X.addons.mayo
        }
        if(Addons.Oregano){
            net = net + X.addons.oregano
        }
        if(Addons.Butter){
            net = net + X.addons.butter
        }
        if(Addons.Egg){
            net = net + X.addons.egg
        }
        setNetCost((net + X.price)*Quantity);
    }

    function changeQuantity(event) {
        setQuantity(event.target.value)
    }

    function OnChangeTag(event){
        setAddons({
            ...Addons,
            [event.target.name]: !Addons[event.target.name]
        })
    }

    React.useEffect(() => {
        CalcNet();
    }, [Addons, Quantity]);

    function submit(){
        var X = JSON.parse(localStorage.getItem("CurrentOrder"));
        var Y = JSON.parse(localStorage.getItem("ProfileDetails"));
        if(Quantity == 0){
            swal("Quantity cannot be 0", "", "error");
            return;
        }
        if(netCost > Y.wallet){
            swal("Git Some Money", "", "error");
            return ;
        }

        var data = {
            email: Y.email,
            orders:{
                "quantity": Quantity,
                "addons": Addons,
                "netCost": netCost,
                "vendor": X.vendor,
                "foodID": X._id,
                "time": new Date(),
                "vendorEmail": X.email,
                "foodName": X.product,
                "status": "Pending",
                "rated": false
            }
        }
        data.orders.timeStr = data.orders["time"].getHours() + ":" + data.orders["time"].getMinutes() + ":" + data.orders["time"].getSeconds();
        console.log(data);
        axios.post("/api/order/buyBuyer", data)
        .then(res => {
            console.log(res.data);
            var data1 = data;
            delete data1.orders.vendorEmail;
            data1.email = X.email;
            data1.orders.buyerEmail = Y.email;
            data1.orders.orderID = res.data;
            data1.rating = 0;
            console.log(data1);
            axios.post("/api/order/buyVendor", data1)
            .then(res => {
                console.log(res.data);

                Y.wallet = Number(Y.wallet) - Number(netCost);
                localStorage.setItem("ProfileDetails", JSON.stringify(Y));
                var data1 = { email: Y.email, wallet: Y.wallet };
                axios .post("/api/user/updateKash", data1)
                .then(res => {
                    swal({
                        title: "Order Placed Successfully",
                        icon: "success"
                    }).then(function() {
                        window.location = "/account/buyer/searchresult";
                    });
                })
                .catch(err => {
                });
                    
            })
            .catch(err => {
                console.log(err);
            })
        })
        .catch(err => {
            console.log(err);
        })

        return ;
    }

    return (

        <Grid container align={"center"} spacing={2}>
            <Grid item xs={12}>
                <h4>Food Item</h4>
                <TextField
                    label="Food Item"
                    variant="outlined"
                    defaultValue={X.product}
                    InputProps={{readOnly: true}}
                />
            </Grid>
            <Grid item xs={12}>
                <h4>Addons</h4>
                <FormControlLabel control={<Checkbox disabled={X.addons.cheese <= 0} name='Cheese' checked={Addons['Cheese']} color='warning' onChange={OnChangeTag} />} label={"Cheese(" + String(X.addons.cheese) + ')'} />
                <FormControlLabel control={<Checkbox disabled={X.addons.mayo <= 0} name='Mayo' checked={Addons['Mayo']} color='warning' onChange={OnChangeTag} />} label={"Mayo(" + String(X.addons.mayo) + ')'} />
                <FormControlLabel control={<Checkbox disabled={X.addons.oregano <= 0} name='Oregano' checked={Addons['Oregano']} color='warning' onChange={OnChangeTag} />} label={"Oregano(" + String(X.addons.oregano) + ')'} />
            </Grid>
            <Grid item xs={12}>
                <FormControlLabel control={<Checkbox disabled={X.addons.butter <= 0} name='Butter' checked={Addons['Butter']} color='warning' onChange={OnChangeTag} />} label={"Butter(" + String(X.addons.butter) + ')'} />
                <FormControlLabel control={<Checkbox disabled={X.addons.egg <= 0} name='Egg' checked={Addons['Egg']} color='warning' onChange={OnChangeTag} />} label={"Egg(" + String(X.addons.egg) + ')'} />
            </Grid>
            <Grid item xs={12}>
                <h4>Quantity</h4>
                <TextField
                    label="Food Item"
                    variant="outlined"
                    value={Quantity}
                    onChange={changeQuantity}
                />
            </Grid>
            <Grid item xs={12}>
                <h3>Net Price: {netCost}</h3>
            </Grid>
            <Grid item xs={12}>
                <Button variant="contained" color="success" onClick={submit}>Order</Button>
            </Grid>
        </Grid>
    );
};

export default BuyOrder;
