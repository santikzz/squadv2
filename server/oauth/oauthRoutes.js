const express = require('express');
const router = express.Router();

router.post('/auth', async (req, res) => {
    try {
        // get the code from frontend
        const code = req.headers.authorization;
        console.log('Authorization Code:', code);

        // Exchange the authorization code for an access token
        const response = await axios.post(
            'https://oauth2.googleapis.com/token',
            {
                code,
                client_id: '587301-d27f8hofgi6i0.apps.googleusercontent.com',
                client_secret: 'GOCSPX-u02eNWutQVi',
                redirect_uri: 'postmessage',
                grant_type: 'authorization_code'
            }
        );
        const accessToken = response.data.access_token;
        console.log('Access Token:', accessToken);

        // Fetch user details using the access token
        const userResponse = await axios.get(
            'https://www.googleapis.com/oauth2/v3/userinfo',
            {
                headers: {
                    Authorization: `Bearer ${accessToken}`
                }
            }
        );
        const userDetails = userResponse.data;
        console.log('User Details:', userDetails);

        // Process user details and perform necessary actions

        res.status(200).json({ message: 'Authentication successful' });
    } catch (error) {
        console.error('Error saving code:', error);
        res.status(500).json({ message: 'Failed to save code' });
    }
});