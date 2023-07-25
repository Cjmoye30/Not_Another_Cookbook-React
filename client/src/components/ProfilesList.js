import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_ALL_USERS } from '../utils/queries';

const ProfilesList = () => {
    const { loading, data } = useQuery(GET_ALL_USERS);
    const users = data?.getAllUsers || [];
    console.log("GET ALL USERS Data: ", users)

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <>
            <div className='usersWrapper'>

                {/* conditional to check if there is any data - returning a message if no data */}
                {users.length === 0 ?
                    (
                        <p>No users in the database yet</p>
                    )
                    :
                    (
                        users.map((user) => (
                            <div>
                                <h1>{user.username}</h1>
                                <h3>{user.firstName} {user.lastName}</h3>
                                <p>{user.email}</p>
                            </div>
                        ))
                    )}
            </div>
        </>
    )
}

export default ProfilesList;