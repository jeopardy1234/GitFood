import React, { Component } from "react";
import Table from 'react-bootstrap/Table'
import Checkbox from '@mui/material/Checkbox';
import TextField from '@mui/material/TextField';
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
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Rating from '@mui/material/Rating';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

const labels = {
    0.5: 'Useless',
    1: 'Useless+',
    1.5: 'Poor',
    2: 'Poor+',
    2.5: 'Ok',
    3: 'Ok+',
    3.5: 'Good',
    4: 'Good+',
    4.5: 'Excellent',
    5: 'Excellent+',
};


const BuyerList = (props) => {
    const [value, setValue] = React.useState(2);
    const [hover, setHover] = React.useState(-1);

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = (event, item) => {
        localStorage.setItem('rateID', JSON.stringify(item.foodID));
        localStorage.setItem('item_id', JSON.stringify(item._id))
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleCloseAccept = () => {
        var Y = JSON.parse(localStorage.getItem('rateID'));
        var Z = JSON.parse(localStorage.getItem("item_id"));
        var x = {
            _id: Y,
            rating: value,
            item_id: Z,
        }
        //console.log(x);
        axios
            .post("/api/food/rating", x)
            .then((response) => {
                //console.log(response.data);
                setOpen(false);
            })
            .catch((error) => {
                // //console.log(
                //     error);
            });
        axios
            .post("/api/order/rated", x)
            .then((response1) => {
                console.log(response1.data)
            })
            .catch((error) => {
            });
        var z = document.getElementById(Z).style.visibility = "hidden";
    };


    const [orders, setOrders] = useState([]);
    const [status, setStatus] = useState({});
    var X = JSON.parse(localStorage.getItem('ProfileDetails'));
    var data = {
        email: X.email,
    }
    const [ratings, setRatings] = useState({});
    useEffect(() => {
        axios
            .post("/api/order/buyer", data)
            .then((response) => {
                console.log(response.data[0]);
                setOrders(response.data[0].orders).then(() => {
                    // for (const [key, value] of Object.entries(response.data[0].orders)) {
                    //     var x = {
                    //         _id: value.foodID,
                    //         rating: value.rating,
                    //     }
                    //     console.log(x);
                    //     axios
                    //         .post("/api/food/getRating", x)
                    //         .then((response) => {
                    //             //console.log(response.data);
                    //             setRatings({
                    //                 ...ratings,
                    //                 [value.foodID]: response.data[0].rating,
                    //             });
                    //         })
                    //         .catch((error) => {
                    //             //console.log(error);
                    //         });
                    // }
                });

            })
            .catch((error) => {
                // console.log(
                //     error);
            });
    }, []);
    //console.log(orders);

    function pickup(event, item) {
        var data = {
            email: X.email,
            orderID: item._id,
            rating: event.target.value,
            status: "Completed",
        }

        axios
            .post("/api/order/change1", data)
            .then((response) => {
                //console.log(response);
                axios
                    .post("/api/order/buyer", data)
                    .then((response) => {
                        //console.log(response.data[0]);
                        setOrders(response.data[0].orders)
                    })
                    .catch((error) => {
                        //console.log(
                        //    error);
                    });
                axios
                    .post("/api/order/change", data)
                    .then((response) => {
                        //console.log(response);
                        setStatus(
                            response.data
                        )
                    })
                    .catch((error) => {
                        // console.log(
                        //     error);
                    });
            })
            .catch((error) => {
                // console.log(
                //     error);
            });
    }

    function DisplayStatus(item, index) {
        // console.log(item);
        if (item.status == "Pending") {
            return (
                <div>
                    <text style={{ color: 'grey' }}>Placed</text>
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
        else if (item.status == "Accepted") {
            return (
                <text style={{ color: 'green' }}>Accepted</text>
            )
        }
        else if (item.status == "Cooking") {
            return (
                <div>
                    <text style={{ color: 'orange' }}>Cooking</text>
                </div>
            )
        }
        else if (item.status == "Ready") {
            return (
                <div>
                    <Button variant="contained" color="success" onClick={(event) => { pickup(event, item) }} style={{ margin: '10px' }}>Pickup</Button>
                </div>
            )
        }
        else {

            if (item.rated == false) {
                return (
                    <div>
                        <text style={{ color: 'green' }}>Completed</text>
                        <Button variant="contained" id={item._id} color="primary" onClick={(event) => { handleClickOpen(event, item) }} style={{ margin: '10px' }}>Rate</Button>
                    </div>
                )
            }
            else {
                return (
                    <div>
                        <text style={{ color: 'green' }}>Completed</text>
                    </div>
                )
            }
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
                    <th>Vendor</th>
                    <th>Quantity</th>
                    <th>Cost</th>
                    <th>Rating</th>
                    <th>Status</th>
                </tr>
            </thead>
            <tbody>
                {
                    orders.map((item, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.timeStr}</td>
                            <td>{item.foodName}</td>
                            <td>{item.vendor}</td>
                            <td>{item.quantity}</td>
                            <td>{item.netCost}</td>
                            <td>{ratings[item]}</td>
                            <td width='250px'>{DisplayStatus(item, index)}</td>
                        </tr>
                    ))}
            </tbody>
        </Table>
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
                {"Drop a Rating?"}
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    Hope You Enjoyed The Meal! Please Drop a Rating!
                </DialogContentText>
            </DialogContent>
            <DialogContent>
                <Box
                    sx={{
                        width: 200,
                        display: 'flex',
                        alignItems: 'center',
                    }}
                >
                    <Rating
                        name="hover-feedback"
                        value={value}
                        precision={0.5}
                        onChange={(event, newValue) => {
                            setValue(newValue);
                        }}
                        onChangeActive={(event, newHover) => {
                            setHover(newHover);
                        }}
                        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
                    />
                    {value !== null && (
                        <Box sx={{ ml: 2 }}>{labels[hover !== -1 ? hover : value]}</Box>
                    )}
                </Box>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Ignore</Button>
                <Button onClick={handleCloseAccept} autoFocus>
                    Rate
                </Button>
            </DialogActions>
        </Dialog>
    </div>


);
};

export default BuyerList;