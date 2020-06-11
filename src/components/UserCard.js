import React from 'react';
import ImageShower from '../components/ImageShower';
import { Link } from 'react-router-dom';

const UserCard = ({ user: { username, images, bio } }) => {
    return (
        <div className="card text-center" style={{ maxHeight: '375px' }}>
            <div className="card-body">
                <ImageShower image={images[0]} />
                <Link to={`/user/${username}`} style={{ textDecoration: "none"}}>
                    <h4 className="text-primary">@{username}</h4>
                </Link>
                <hr />
                <small className="text-center">{bio}</small>
            </div>
        </div>
    );
};

export default UserCard;
