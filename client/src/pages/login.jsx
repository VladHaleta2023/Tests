import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export const Login = () => {
    const [user, setUser] = useState("");

    function getUser() {
        if (user === "admin")
            localStorage.setItem("teacher", true)
        else
            localStorage.setItem("teacher", false)
    }

    return <div className="body">
        <input type="text" name="username" id="username" value={user} onChange={(e) => setUser(e.target.value)}/>
        <br></br>
        <br></br>
        <Link to='/tests' className='btnLogin' onClick={getUser()}>Sign in</Link>
    </div>
};