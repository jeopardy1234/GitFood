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
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import QueryStatsIcon from '@mui/icons-material/QueryStats';

const Navbar1 = () => {
    const navigate = useNavigate();
    const [searchText, setSearchText] = useState("");
    function onChangeSearchText(event) {
        setSearchText(event.target.value);
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ cursor: "pointer" }}
                        onClick={() => navigate("/account/vendor/profile")}
                    >
                        Canteen Portal
                    </Typography>
                    <RestaurantIcon></RestaurantIcon>
                    <Box sx={{ flexGrow: 1 }} />
                    <DashboardCustomizeIcon></DashboardCustomizeIcon>
                    <Button color="inherit" onClick={() => navigate("/account/vendor/searchresult")}>
                        Dashboard
                    </Button>
                    <AccountBoxIcon></AccountBoxIcon>
                    <Button color="inherit" onClick={() => navigate("/account/vendor/profile")}>
                        Profile
                    </Button>
                    <BookmarkBorderIcon></BookmarkBorderIcon>
                    <Button color="inherit" onClick={() => navigate("/account/vendor/olist")}>
                        Orders
                    </Button>
                    <QueryStatsIcon></QueryStatsIcon>
                    <Button color="inherit" onClick={() => navigate("/account/vendor/stats")}>
                        Stats
                    </Button>
                    <ExitToAppIcon></ExitToAppIcon>
                    <Button color="inherit" onClick={() => navigate("/")}>
                        Signout
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
};

export default Navbar1;
