import React, { useState } from 'react';

const Sidebar = () => {
    const [isLogin, setIsLogin] = useState(true);


    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const userButtonClick = (prev, current, currentbutton, prevbutton) => {
        var removeselection = document.getElementsByClassName(prev);
        for (var i = 0; i < removeselection.length; i++) {
            removeselection[i].style.display = "none";
          }

        var addselection = document.getElementsByClassName(current);
        for (var z = 0; z < addselection.length; z++) {
            addselection[z].style.display = "block";
          }
        
          var addbutton = document.getElementById(currentbutton);
          addbutton.style.fontWeight = "bold";
          addbutton.style.textDecoration = "underline";
          addbutton.style.backgroundColor = "#3367d6";
        
          var removebutton =  document.getElementById(prevbutton);
          removebutton.style.fontWeight = "normal";
          removebutton.style.textDecoration = "none";
          removebutton.style.backgroundColor = "#4285f4";

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
            alert("AQUI");
            handleCreateEducator();
            alert("HERE Now");
        }
    }

    return (
        <div className='d-flex flex-column main-sidebar'>
            <h3> I am a...</h3>
                <div class="usertype-container">
                    <div class="usertype-buttons">
                        <button id='teacher-button' onClick={() => userButtonClick("student-wrapper", "login-wrapper", "teacher-button", "student-button")}>Teacher</button>
                        <button id='student-button' onClick={() => userButtonClick("login-wrapper", "student-wrapper", "student-button", "teacher-button")}>Student</button>
                    </div>
                </div>
                <div className='login-wrapper'>

                    <div id='login-toggle'>
                            <button onClick={toggleForm}>{isLogin ? "Register" : "Login"}</button>
                    </div>
                        
                    <form>
                        <div>
                            <label htmlFor="email">Email: </label>
                            <input type="email" id="email" name="email" required />
                        </div>
                            
                        <div>
                            <label htmlFor="password">Password: </label>
                            <input type="password" id="password" name="password" required />
                        </div>
                            
                        {isLogin ? (
                            <div className='login-wrapper'>
                                <button type="submit">Login</button>
                            </div>
                            
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password: </label>
                                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                                    </div>
                                    <div className='login-register-submit'>
                                        <button type="submit" onClick={() => validate()}>Register</button>
                                    </div>
                                </>
                            )}
                        </form>
                        </div>

                    <div className = 'student-wrapper'> 
                        <form>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="name" id="name" name="name" required />
                        </div>
                            
                        <div>
                            <label htmlFor="code">Class Code: </label>
                            <input type="code" id="code" name="code" required />
                        </div>

                        <div className='login-register-submit'>
                                <button type="submit"> Login</button>
                        </div>
                        </form>
                    </div>            
                </div>
    
    );
};

export default Sidebar;
