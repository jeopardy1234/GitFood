import { useNavigate } from "react-router-dom";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import LoginIcon from '@mui/icons-material/Login';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import RestaurantIcon from '@mui/icons-material/Restaurant';

const Navbar0 = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography
            variant="h6"
            component="div"
            sx={{ cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Canteen Portal
          </Typography>
          <RestaurantIcon></RestaurantIcon>
          <Box sx={{ flexGrow: 1 }} />
          <LoginIcon></LoginIcon>
          <Button color="inherit" onClick={() => navigate("/login")}>
            Login
          </Button>
          <AppRegistrationIcon></AppRegistrationIcon>
          <Button color="inherit" onClick={() => navigate("/register")}>
            Register
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar0;
