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
        utype: 1,
    }
    const [state, setState] = React.useState(
        {
            'name': X.name,
            'email': X.email,
            'contact': X.contact,
            'age': X.age,
            'batch': X.batch,
            'wallet': X.wallet,
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
            '1': "email",
            '2': "contact",
            '3': "age",
            '4': "batch",
            '5': "wallet",
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
            {DisplayTextbox("Email", X.email, 1)}
            {DisplayTextbox("Contact Number", X.contact, 2)}
            {DisplayTextbox("Age", X.age, 3)}
            {DisplayTextbox("Batch", X.batch, 4)}
            {DisplayTextbox("Wallet", X.wallet, 5)}
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
                            X.email = state.email
                            X.contact = state.contact
                            X.age = state.age
                            X.batch = state.batch
                            X.wallet = state.wallet
                            Y.MyArray = [X.name, X.email, X.contact, X.age, X.batch, X.wallet]
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

