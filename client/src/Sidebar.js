import React, { useState } from 'react';

const Sidebar = () => {
    const [isLogin, setIsLogin] = useState(true);

    const [isTeacher, setIsTeacher] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const setUserType = () => {
        setIsTeacher(!isTeacher);
    };

    return (
        <div className='d-flex flex-column main-sidebar'>
            <div id='teacher-toggle'>
                        <button onClick={setUserType}>{isTeacher ? "Go to Student Login" : "Go to Teacher Login"}</button>
            </div>

            {isTeacher ? (
                <div className='login-wrapper'>
                    <div className = 'teacher-title'> Teacher Login/Registration </div>
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
                            <div className='login-register-submit'>
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
                ) : (
                    <div className = 'studentLogin'> 
                        <div> Student Login </div>
                        <form>
                        <div>
                            <label htmlFor="name">Name: </label>
                            <input type="name" id="name" name="name" required />
                        </div>
                            
                        <div>
                            <label htmlFor="code">Class Code: </label>
                            <input type="code" id="code" name="code" required />
                        </div>

                        <div className='student-login'>
                                            <button type="submit">Login as Student</button>
                        </div>
                        </form>
                    </div>
                )}
                
                </div>
    
    );
};

export default Sidebar;
