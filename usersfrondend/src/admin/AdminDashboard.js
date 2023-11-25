import React from "react";

import Header from "../components/Header";
function AdminDashboard(){
    let user = JSON.parse(localStorage.getItem('user'));
    return(
        <> <Header />
        <h5>Welcome {user && user.name}</h5>
        </>
    )
}
export default AdminDashboard