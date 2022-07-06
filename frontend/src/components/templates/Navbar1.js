import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import { useState, useEffect } from 'react';
import { TextField } from "@mui/material";
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RestaurantIcon from '@mui/icons-material/Restaurant';



const Navbar1 = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    const [anchorEl, setAnchorEl] = useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
    function onChangeSearchText(event) {
        setSearchText(event.target.value);
    }
    var X = JSON.parse(localStorage.getItem("ProfileDetails"));
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/account/buyer/profile")}
                    >
                        Canteen Portal
                    </Typography>
                    <RestaurantIcon></RestaurantIcon>
                    <Box sx={{ flexGrow: 1 }} />
                    <DashboardCustomizeIcon></DashboardCustomizeIcon>
                    <Button color="inherit" onClick={() => navigate("/account/buyer/searchresult")}>
                        Dashboard
                    </Button>
                    <AccountBoxIcon></AccountBoxIcon>
                    <Button color="inherit" onClick={() => navigate("/account/buyer/profile")}>
                        Profile
                    </Button>
                    <BookmarkBorderIcon></BookmarkBorderIcon>
                    <Button color="inherit" onClick={() => navigate("/account/buyer/olist")}>
                        Orders
                    </Button>
                    <ExitToAppIcon></ExitToAppIcon>
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Signout
                    </Button>
                    <AccountBalanceIcon></AccountBalanceIcon>
                    <Button color="inherit" onClick={() => navigate("/account/buyer/bank")}>
                        GitBank
                    </Button>
                    <Button
                        id="basic-button"
                        aria-controls={open ? 'basic-menu' : undefined}
                        aria-haspopup="true"
                        aria-expanded={open ? 'true' : undefined}
                        color="success"
                        style={{backgroundColor: '#00bcd4'}}
                    >
                        Wallet: {X.wallet}
                    </Button>
                </Toolbar>
            </AppBar>
        </Box >
    );
};

export default Navbar1;
