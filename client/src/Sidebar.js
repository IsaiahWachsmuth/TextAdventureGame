import React, { useState } from 'react';

const Sidebar = () => {
    const [isLogin, setIsLogin] = useState(true);


    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const studentButtonClick = (prev, current, currentbutton, prevbutton) => {
        var removeselection = document.getElementsByClassName(prev);
        for (var i = 0; i < removeselection.length; i++) {
            removeselection[i].style.display = "none";
          }

        var addselection = document.getElementsByClassName(current);
        for (var z = 0; z < addselection.length; z++) {
            addselection[z].style.display = "block";
          }
        
          var addbutton = document.getElementById("student-button");
          addbutton.style.fontWeight = "bold";
          addbutton.style.textDecoration = "underline";
          addbutton.style.backgroundColor = "#3367d6";
        
          var removebutton =  document.getElementById(prevbutton);
          removebutton.style.fontWeight = "normal";
          removebutton.style.textDecoration = "none";
          removebutton.style.backgroundColor = "#4285f4";

    };

    return (
        <div className='d-flex flex-column main-sidebar'>
            <h3> I am a...</h3>
                <div class="usertype-container">
                    <div class="usertype-buttons">
                        <button id='teacher-button'>Teacher</button>
                        <button id='student-button' onClick={() => studentButtonClick("login-wrapper", "student-wrapper", "student-button", "teacher-button")}>Student</button>
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
                                <button type="submit">Login as Teacher</button>
                            </div>
                            
                            ) : (
                                <>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password: </label>
                                        <input type="password" id="confirmPassword" name="confirmPassword" required />
                                    </div>
                                    <div className='login-register-submit'>
                                        <button type="submit">Register as Teacher</button>
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
                                <button type="submit"> Login as Student</button>
                        </div>
                        </form>
                    </div>            
                </div>
    
    );
};

export default Sidebar;
