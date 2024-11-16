const express = require('express');
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose');
const app = express();

const cors = require("cors");
app.use(cors());

require('dotenv').config();

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());


// Define a Mongoose schema for the chilzz_user collection
const userSchema = new mongoose.Schema({
    user_id: { type: String, required: true },
    user_wallet: { type: String, required: true },
    user_reward_point: { type: Number, default: 0 }
  });

// Create a Mongoose model for the chilzz_user collection
const ChilzzUser = mongoose.model('chilzz_user', userSchema);

const dbURI = process.env.CONN_URL
console.log(dbURI)
// Connect to MongoDB using Mongoose
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define a POST route to listen for webhook events
app.post('/', async (req, res) => {
    // Log the incoming request for debugging purposes
    console.log('Received webhook event:', req.body);

    // Handle the event based on the type of webhook
    const event = req.body;

    try {
        // Example: Handle different event types (this depends on the service sending the webhook)
        switch (event.eventName) {
            case 'user.created':
                console.log('Handling event type 1...');
                // Create a new user with random user_id, wallet, and reward points
                const newUser = new ChilzzUser({
                    user_id: event.data.userId, // Generate random user ID
                    user_wallet: event.data.walletPublicKey,
                    user_reward_point: 100  // Default to 100 reward points for new users
                });

                // Save the user to the database
                await newUser.save(); // Use `await` to wait for the save operation to complete
                console.log("USER CREATED SUCCESSFULLY");
                break;

            case 'user.session.created':
                console.log('Handling event type 2...');
                
                // Extract user ID from the event (adjust based on your event structure)
                const userId = event.data.userId;  // Example: Assume the user ID is in event.data.user_id

                // Find the user in the database (use await to get the actual document)
                const user = await ChilzzUser.findOne({ user_id: userId }); // Await the result of findOne()

                if (!user) {
                    // Handle case if user is not found
                    console.log('User not found!');
                }

                if (user) {
                    return res.status(200).json("FOUND")
                }

                const userUpdate = new ChilzzUser({
                    user_id: event.data.userId, // Generate random user ID
                    user_wallet: event.data.walletPublicKey,
                    user_reward_point: 100
                })

                // Save the updated user document
                await userUpdate.save(); // Await the save operation

                // Send a successful response
                console.log('USER REWARDS POINTS UPDATED');
                break;

            default:
                console.log('Unknown event type:', event.type);
                res.status(400).send('Unknown event type');
                return;
        }

        // Send an HTTP 200 OK response to acknowledge receipt of the event
        res.status(200).send('Webhook received');
    } catch (error) {
        console.error('Error handling the webhook:', error);
        res.status(500).send('Internal Server Error');
    }
});

app.post('/fan-token', async (req, res) => {
    console.log(req.body)
    const { wallet_address } = req.body;
    if (wallet_address.length === 0) {
        console.log("here")
        return res.status(404).json("Bad Request");
    }

    try {
        const user = await ChilzzUser.findOne({ user_wallet: wallet_address })
        if (user) {
            return res.status(200).json(user.user_reward_point)
        } else {
            return res.status(404).json("USER NOT FOUND")
        }
    } catch (err) {
        return res.status(500).json("INTERNAL SERVER ERROR")
    }
})

app.post('/fan-token-claim', async (req, res) => {
    console.log(req.body);
    const { wallet_address, points_to_be_modified, consume } = req.body;

    // Validate the request body
    if (!wallet_address || wallet_address.trim().length === 0) {
        return res.status(400).json({ error: "Bad Request: Wallet address is required." });
    }

    if (!points_to_be_modified || isNaN(points_to_be_modified) || points_to_be_modified <= 0) {
        return res.status(400).json({ error: "Bad Request: Points to be consumed must be a positive number." });
    }

    try {
        // Find the user by wallet address
        const user = await ChilzzUser.findOne({ user_wallet: wallet_address });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Check if the user has sufficient reward points
        if (user.user_reward_point < points_to_be_modified) {
            return res.status(400).json({ error: "Insufficient reward points" });
        }

        // Update the user's reward points
        if (consume) {
            user.user_reward_point -= points_to_be_modified;
        } else {
            user.user_reward_point += points_to_be_modified
        }

        await user.save();

        return res.status(200).json({ message: "Reward points successfully updated", user });
    } catch (err) {
        console.error("Error updating reward points:", err);
        return res.status(500).json({ error: "Internal Server Error" });
    }
});



// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`Webhook listener is running on port ${port}`);
});
