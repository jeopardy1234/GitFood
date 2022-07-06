import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import { Button } from "@mui/material";
const Home = (props) => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    useEffect(() => {
        setName("Dass TAs");
    }, []);
    function loginpage(){
        window.open("/login", "_self");
    }
    function registerpage(){
        window.open("/register", "_self");
    }
    return (
        <Grid container align={"center"} spacing={2}>
        <Grid item xs={12}>
            <br></br>
            <br></br>
            <br></br>
            <br></br>
           <h1>Welcome To GitFood</h1>
        </Grid>
        <Grid item xs = {12}>
            <Button variant="contained" color="success" onClick={loginpage}> Login </Button>
        </Grid>
        <Grid item xs = {12}>
            <Button variant="contained" color="success" onClick={registerpage}> Register </Button>
        </Grid>

    </Grid>
    )
};

export default Home;
