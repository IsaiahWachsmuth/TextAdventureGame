import React, { useState } from 'react';

const Sidebar = () => {
    const [isLogin, setIsLogin] = useState(true);


    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    // this is to control the user type toggle
    const [activeView, setActiveView] = useState('educator');
    const userTypeToggle = (view) => {
        setActiveView(view);
    };
    

    const [responseMessage, setResponseMessage] = useState('');

    const handleCreateEducator = async () => {
        try {
            const username = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            const response = await fetch('http://localhost:3002/create-educator', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: username,
                email: username,
                password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(`Educator created: ${data.educator.name}`);
            } else {
                const errorMessage = await response.text();
                setResponseMessage(`Failed to create educator: ${errorMessage}`);
                alert("This username is already in use!");
            }
        } 
        
        catch (error) {
            setResponseMessage(`Error creating educator: ${error.message}`);
        }
    };

    const attemptLogin = async () => {
        try {
            const username = document.getElementById("email").value;
            const password = document.getElementById("password").value;
            
            const response = await fetch('http://localhost:3002/login', {
                method: 'POST',
                headers: {
                'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                name: username,
                password: password,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setResponseMessage(`Logged In: ${data.educator.name}`);
            } else {
                const errorMessage = await response.text();
                setResponseMessage(`Failed to login: ${errorMessage}`);
                alert("The username or password does not match!");
            }
        } 
        
        catch (error) {
            setResponseMessage(`Error creating educator: ${error.message}`);
        }
    };

    const validate = () => {

        var username = document.getElementById("email")
        var password = document.getElementById("password");
        var password2 = document.getElementById("confirmPassword");


        var lowerCaseLetters = /[a-z]/g;
        
        if(username.value.length < 3){
            alert("Username must be at least 3 characters long!");
            return;
        }

        if(!password.value.match(lowerCaseLetters)) {
            alert("You need at least 1 lowercase letter in your new password!");
            return;
        }


        // Validate capital letters
        var upperCaseLetters = /[A-Z]/g;
        if(!password.value.match(upperCaseLetters)) {
            alert("You need at least 1 capital letter in your new password!");
            return;
        }

        // Validate numbers
        var numbers = /[0-9]/g;
        if(!password.value.match(numbers)) {
            alert("You need at least 1 number in your new password!");
            return;
        }

        // Validate length
        if(!(password.value.length >= 8)) {
            alert("Your new password must have at least 8 characters!");
            return;
        }
        
        // Validate match
        if(password.value !== password2.value) {
            alert("Your passwords do not match!");
            return;
        }
        

        else{
            handleCreateEducator();
        }
    }

    return (
        <div className='d-flex flex-column main-sidebar'>
                <div className='login-wrapper'>
                    
                    <div id='top'>
                        <button id='teacher-button' className={`button ${activeView === 'educator' ? 'active' : ''}`} onClick={() => userTypeToggle("educator")}>Teacher</button>
                        <button id='student-button' className={`button ${activeView === 'student' ? 'active' : ''}`} onClick={() => userTypeToggle("student")}>Student</button>
                    </div>
                    <div id='educator-logReg' style={{ display: activeView === 'educator' ? "flex" : "none" }}>
                        
                            
                        <form>
                            <div>
                                <input type="email" id="email" name="email" placeholder="Email" required />
                            </div>
                                
                            <div>
                                <input type="password" id="password" name="password" placeholder='Password' required />
                            </div>
                                
                            {isLogin ? (
                                <div className='login-register-submit'>
                                    <button type="submit" onClick={() => attemptLogin()}>Login</button>
                                </div>
                                
                                ) : (
                                    <>
                                        <div> 
                                            <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm Password'required />
                                        </div>
                                        <div className='login-register-submit'>
                                            <button type="submit" onClick={() => validate()}>Register</button>
                                        </div>
                                    </>
                                )}
                        </form>
                        <div id='login-toggle'>
                                <button onClick={toggleForm}>{isLogin ? "Need an account? Register" : "Have an account? Login"}</button>
                        </div>
                    </div>
                    <div id='student-log' style={{ display: activeView === 'student' ? "flex" : "none" }}>
                        <form>
                            <div>
                                
                                <input type="name" id="name" name="name" placeholder='Name' required />
                            </div>
                                    
                            <div>
                                
                                <input type="code" id="code" name="code" placeholder='Class Code' required />
                            </div>

                            <div className='login-register-submit'>
                                    <button type="submit">Login</button>
                            </div>
                        </form>
                    </div>
                    
                </div>

            </div>
    
    );
};

export default Sidebar;
