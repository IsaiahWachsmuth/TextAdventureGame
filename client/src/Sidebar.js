import React, { useState } from 'react';

const Sidebar = () => {
    const [isLogin, setIsLogin] = useState(true);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    return (
        <div className='d-flex flex-column main-sidebar'>
            <div>
                <button onClick={toggleForm}>{isLogin ? "Register" : "Login"}</button>
            </div>
            <form>
                <div>
                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" name="password" required />
                </div>
                {isLogin ? (
                    <div>
                        <button type="submit">Login</button>
                    </div>
                ) : (
                    <>
                        <div>
                            <label htmlFor="confirmPassword">Confirm Password:</label>
                            <input type="password" id="confirmPassword" name="confirmPassword" required />
                        </div>
                        <div>
                            <button type="submit">Register</button>
                        </div>
                    </>
                )}
            </form>
        </div>
    );
};

export default Sidebar;
