import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from "@mui/material/Button";
import axios from "axios";


export default function UserProfile() {
    var X = JSON.parse(localStorage.getItem("ProfileDetails"))
    var Y = {
        email: X.email,
        MyArray: [],
        utype: 2,
    }
    const [state, setState] = React.useState(
        {
            'name': X.name,
            'email': X.email,
            'contact': X.contact,
            'manager': X.manager,
            'canteen': X.canteen,
            'otime': X.otime,
            'ctime': X.ctime,
        }
    )
    const [buttonState, setButtonState] = React.useState("EDIT")

    console.log(state)

    function onChangeState(event)
    {
        setState({
            ...state,
            [event.target.name]: event.target.value
        })
    }

    function DisplayTextbox(label, text, ind) {
        var setName = {
            '0': "name",
            '1': "manager",
            '2': "email",
            '3': "contact",
            '4': "canteen",
            '5': "otime",
            '6': "ctime",
        }

        return (
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete="off"
            >
                <div style={{

                    justifyContent: 'center',
                    alignItems: 'center',
                    textAlign: 'center',
                    margin: '20px',

                }}>
                    <TextField
                        id="standard-read-only-input"
                        label={label}
                        style={{
                            width: '20%',
                        }}
                        defaultValue={text}
                        InputProps={{
                            readOnly: true,
                        }}
                        onChange={(event) => onChangeState(event)}
                        variant="standard"
                        name = {setName[ind]}
                        
                    />
                </div>
            </Box>
        )
    }
    return (
        <div style={{
            marginTop: '8%',
        }}>
            {DisplayTextbox("Name", X.name, 0)}
            {DisplayTextbox("Manager", X.manager, 1)}
            {DisplayTextbox("Email", X.email, 2)}
            {DisplayTextbox("Contact Number", X.cnum, 3)}
            {DisplayTextbox("Canteen", X.canteen, 4)}
            {DisplayTextbox("Opening Time", X.otime, 5)}
            {DisplayTextbox("Closing Time", X.ctime, 6)}

            <div style={{

                justifyContent: 'center',
                alignItems: 'center',
                textAlign: 'center',
                margin: '20px',

            }}>
                <Button variant="contained" id="myButton"
                    onClick={() => {
                        var els = document.getElementsByClassName("MuiInput-input MuiInputBase-input css-1x51dt5-MuiInputBase-input-MuiInput-input")
                        for (var i = 0; i < els.length; i++) {
                            els[i].readOnly = !els[i].readOnly
                        }
                        if (els[0].readOnly == true) {
                            setButtonState("EDIT")
                            X.name = state.name
                            X.manager = state.manager
                            X.email = state.email
                            X.cnum = state.cnum
                            X.canteen = state.canteen
                            X.otime = state.otime
                            X.ctime = state.ctime
                            Y.MyArray = [X.name, X.manager, X.email, X.cnum, X.canteen, X.otime, X.ctime]
                            console.log(Y)
                            localStorage.setItem("ProfileDetails", JSON.stringify(X))
                            alert("Profile Updated")


                            axios
                                .post("/api/user/update", Y)
                                .then((response) => {
                                    alert("Created\t" + response.data.name);
                                    console.log(response.data);
                                });
                        }
                        else {
                            setButtonState("SAVE")
                        }

                    }}
                >
                    {buttonState}
                </Button>
            </div>
        </div>
    );
}

