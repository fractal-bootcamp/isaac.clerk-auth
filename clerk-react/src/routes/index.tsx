import { Link } from 'react-router-dom'
import { useAuth } from '@clerk/clerk-react'
import React from 'react';

export default function IndexPage() {
    const { getToken } = useAuth();

    // Get the token asynchronously
    const [token, setToken] = React.useState(null);

    React.useEffect(() => {
        const fetchToken = async () => {
            const retrievedToken = await getToken();
            setToken(retrievedToken);
        };
        fetchToken();
    }, [getToken]);

    console.log(token)

    return (
        <div>
            <h1>This is the index page</h1>
            <div>
                <ul>
                    <li>
                        <Link to="/sign-up">Sign Up</Link>
                    </li>
                    <li>
                        <Link to="/sign-in">Sign In</Link>
                    </li>
                    <li>
                        <Link to="/contact">Contact</Link>
                    </li>
                    <li>
                        <Link to="/dashboard">Dashboard</Link>
                    </li>
                </ul>
            </div>
            <div style={{ marginTop: '20px' }}>
                <h3>Token:</h3>
                <div>{token ? token : 'No token available'}</div>
            </div>
        </div>
    )
}
