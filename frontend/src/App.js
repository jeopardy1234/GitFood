import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import "./App.css";

import UsersList from "./components/users/UsersList";
import Home from "./components/common/Home";
import Register from "./components/common/Register";
import Navbar0 from "./components/templates/Navbar0";
import Navbar1 from "./components/templates/Navbar1";
import Navbar2 from "./components/templates/Navbar2";
import UserProfile from "./components/users/Buyer";
import VendorProfile from "./components/users/Vendor";
import VendorDashboard from "./components/dashboard/vendor";
import BuyerDashboard from "./components/dashboard/buyer";
import BuyerSearch from "./components/search/buyerSearch";
import VendorSearch from "./components/search/vendorSearch";
import BuyerOrders from "./components/orders/buyer";
import LoginPage from "./components/common/login";
import AddItem from "./components/fooditems/additem";
import EditItem from "./components/fooditems/edititem";
import BuyerOlist from "./components/olist/buyer";
import VendorOlist from "./components/olist/vendor";
import VendorStats from "./components/stats/vendorStats";
import Bank from "./components/bank/buyerMoney";


let ProfileDetails = {
    name: "",
    email: "",
    contact: "",
    otime: "",
    ctime: "",
    age: "",
    canteen: "",
    batch: "",
    utype: "",
    manager: "",
    wallet: "0",
    loggedin: "0",
};

let currentFood = {
    _id: "",
    product: "",
    price: "",
    cheese: "",
    mayo: "",
    oregano: "",
    butter: "",
    egg: "",
    ftype: "",
    tags: {
        beverage: false,
        sweet: false,
        spicy: false,
        sour: false,
        salty: false,
    },
    addons: {
        cheese: 0,
        oregano: 0,
        mayo: 0,
        butter: 0,
        egg: 0,
    },
    canteen: "",
    rating: "",
    vendor: "",
};

if(!localStorage.getItem('ProfileDetails'))
    window.localStorage.setItem("ProfileDetails", JSON.stringify(ProfileDetails));
if(!localStorage.getItem('ItemEdit'))
    window.localStorage.setItem("ItemEdit", JSON.stringify(currentFood));

const Layout = () => {
  return (
    <div>
      <Navbar0 />
      <div className="container">
        <Outlet />
      </div>
    </div>
  );
};

const Layout1 = () => {
    return (
      <div>
        <Navbar1 />
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
  };

  const Layout2 = () => {
    return (
      <div>
        <Navbar2 />
        <div className="container">
          <Outlet />
        </div>
      </div>
    );
  };

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="users" element={<UsersList />} />
          <Route path="register" element={<Register />} />
          <Route path="vendor" element={<VendorProfile />} />
          <Route path="dashboard/vendor" element={<VendorDashboard />} />
          <Route path="dashboard/buyer" element={<BuyerDashboard />} />
          <Route path="login" element={<LoginPage />} />
        </Route>
        <Route path="/account/buyer" element={<Layout1 />}>
            <Route path="dashboard/buyer" element={<BuyerDashboard />} />
            <Route path="profile" element={<UserProfile />} />
            <Route path="searchresult" element={<BuyerSearch />} />
            <Route path="orders" element={<BuyerOrders />} />
            <Route path="olist" element={<BuyerOlist />} />
            <Route path="bank" element={<Bank />} />
        </Route>
        <Route path="/account/vendor" element={<Layout2 />}>
            <Route path="vendorprofile" element={<VendorProfile />} />
            <Route path="dashboard/buyer" element={<VendorDashboard />} />
            <Route path="profile" element={<VendorProfile />} />
            <Route path="searchresult" element={<VendorSearch />} />
            <Route path="orders" element={<BuyerOrders />} />
            <Route path="additem" element={<AddItem />} />
            <Route path="edititem" element={<EditItem />} />
            <Route path="olist" element={<VendorOlist />} />
            <Route path="stats" element={<VendorStats />} />
        </Route>
      </Routes>

    </BrowserRouter>
  );
}

export default App;
