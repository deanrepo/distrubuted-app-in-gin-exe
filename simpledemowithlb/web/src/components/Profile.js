import React from 'react';
import './Profile.css'
import { Link } from 'react-router-dom';

const Profile = () => {
    return (
        <div class="nav-item dropdown">
            <div class="logout">
                <Link to="/newRecipe">New a recipe</Link>
            </div>
        </div>
    )
}

export default Profile;