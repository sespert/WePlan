import React from "react";
import "./formLogin.css";

// This file exports the Input, TextArea, and FormBtn components

function FormLogin() {
    return(
        <form1 id="form1">
        <div className="form-group">
        <label for="exampleInputEmail1">Login</label>
        <input type="email" className="form-control" aria-describedby="emailHelp" placeholder="Enter email"/>

      </div>
<div className="form-group">
<label for="exampleInputPassword1">Password</label>
<input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password"/>
</div>

<button type="submit" class="btn btn-primary">Submit</button>
</form1>

);
}

export default FormLogin;