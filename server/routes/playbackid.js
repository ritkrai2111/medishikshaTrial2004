const express = require('express');
const axios = require('axios');
const router = express.Router();
const dotenv = require("dotenv");

async function createPlaybackId() {
  try {
    // Define the ASSET_ID and config directly here
    const ASSET_ID = 'oBuKJC8TrAu3un00JsTtkpMvrsiJTqsnDpiMH8UWbBas'; // Asset Id of your video

    const requestData = {
      policy: 'public'
    };

    const config = {
      headers: {
        'Content-Type': 'application/json'
      },
      auth: {
        username: process.env.MUX_ACCESS_TOKEN_ID,
        password: process.env.MUX_SECRET_KEY
      }
    };

    // Make a request to create a playback ID
    const response = await axios.post(`https://api.mux.com/video/v1/assets/${ASSET_ID}/playback-ids`, requestData, config);
    
    // Extract the playback ID from the response
    const playbackId = response.data.data.id;
    console.log(playbackId);

    return playbackId;
  } catch (error) {
    console.error('Error creating playback ID:', error);
    throw new Error('Error creating playback ID');
  }
}

// POST route to create and return the playback ID
router.post('/', async (req, res) => {
  try {
    // Call the function to create playback ID
    const playbackId = await createPlaybackId();

    // Send the playback ID to the frontend
    res.status(200).json({ playbackId });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
