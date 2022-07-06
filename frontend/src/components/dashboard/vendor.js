import React, { Component } from "react";
import NumericInput from 'react-numeric-input';
import axios from "axios";
import Nav from "react-bootstrap/Nav";
import Form from "react-bootstrap/Form";
import FormControl from "react-bootstrap/FormControl";
import Button from 'react-bootstrap/Button'
import Navbar from 'react-bootstrap/Navbar'
import Table from 'react-bootstrap/Table'


export default class VendorView extends Component {
    // constructor(props) {
    //     super(props);
    //     this.state = {
    //         prods: [],
    //         search: "",
    //         quantity: 0,
    //         rating: 0,
    //         review: ""
    //     };
    //     this.onChangeRating = this.onChangeRating.bind(this);
    //     this.onChangeReview = this.onChangeReview.bind(this);

    // }

    // componentDidMount() {
    //     const x = {
    //         username: localStorage.getItem("username")
    //     };
    //     //   if(localStorage.getItem("type")!=="customer")
    //     //   {
    //     //     alert("You do not have permission to access this page")
    //     //     this.props.history.push("/");
    //     //   }
    //     // this.setState({ username: newUser.username });
    //     axios
    //         .post("/api/showmyproducts", x)
    //         .then(response => {
    //             console.log(response.data);
    //             this.setState({ prods: response.data });
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    // onchange = e => {
    //     this.setState({ search: e.target.value });
    // }
    // onChangeRating(event) {
    //     this.setState({ rating: event.target.value });
    // }
    // onChangeReview(event) {
    //     this.setState({ review: event.target.value });
    // }

    // editorder(e) {
    //     const newProd = {
    //         _id: e._id,
    //         username: localStorage.getItem("username"),
    //         productid: e.productid,
    //         quantity_ordered: e.quantity,
    //         newquantity: 0,
    //         status: e.status,
    //         productname: e.productname,
    //         seller: e.username
    //     };
    //     const quantity = prompt('Please enter New the quantity')
    //     if (!isNaN(quantity) && quantity) {
    //         this.setState({ quantity: quantity })
    //         console.log(this.state.quantity);
    //         newProd.newquantity = parseFloat(quantity)
    //         axios
    //             .post("/api/editCustomerProduct", newProd)
    //             .then(response => {
    //                 // this.setState({ prods: response.data });
    //                 if (response.data == "1")
    //                     alert("Sorry, insuficient quantity available");
    //                 else
    //                     alert("Order success!")
    //                 console.log(response.data);
    //             })
    //             .catch(function (error) {
    //                 console.log(error);
    //             });
    //     }
    //     else {
    //         alert("Invalid Quantity")
    //     }
    // }

    // ratereviewvendor(e) {
    //     const newProd = {
    //         username: e.username,
    //         rating: this.state.rating,
    //         review: this.state.review,
    //         seller: e.seller,
    //     };
    //     console.log(newProd);

    //     axios
    //         .post("/api/ratereviewvendor", newProd)
    //         .then(response => {
    //             // this.setState({ prods: response.data });
    //             if (response.data == "1")
    //                 alert("Order success!")
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    //     this.setState({
    //         rating: "",
    //         review: ""
    //     })
    // }
    // ratereviewproduct(e) {
    //     const newProd = {
    //         productname: e.productname,
    //         productid: e.productid,
    //         rating: this.state.rating,
    //         review: this.state.review,
    //         seller: e.seller,
    //     };
    //     console.log(newProd);

    //     axios
    //         .post("/api/ratereviewproduct", newProd)
    //         .then(response => {
    //             // this.setState({ prods: response.data });
    //             if (response.data == "1")
    //                 alert("Order success!")
    //             console.log(response.data);
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });

    //     this.setState({
    //         rating: "",
    //         review: ""
    //     })
    // }


    render() {
        return (
            <div>
                {/* <Navbar bg="dark" variant="dark">
                    <Navbar.Brand href="/CustomerHome">HOME</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="/CustomerView">Add to Cart</Nav.Link>
                        <Nav.Link href="/CustomerCart">Orders</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" onChange={this.onchange} />
                        <Button variant="outline-info">Search</Button>
                    </Form>
                    <Nav>
                        <Nav.Link href="/">Logout</Nav.Link>
                    </Nav>
                </Navbar> */}
                {/* <br />
                <br />
                <h1>Your Orders: </h1> */}
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Username</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>1</td>
                            <td>Mark</td>
                            <td>Otto</td>
                            <td>@mdo</td>
                        </tr>
                        <tr>
                            <td>2</td>
                            <td>Jacob</td>
                            <td>Thornton</td>
                            <td>@fat</td>
                        </tr>
                        <tr>
                            <td>3</td>
                            <td colSpan={2}>Larry the Bird</td>
                            <td>@twitter</td>
                        </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}