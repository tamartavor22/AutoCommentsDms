const express = require('express');
const bodyParser = require('body-parser');
const automation = require('./automation');
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;
const VERIFY_TOKEN = process.env.VERIFY_TOKEN;

app.get('/', (req, res) => {
    res.status(200).send("hello world");
});


// Webhook Verification (GET)
app.get('/webhook', (req, res) => {
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];

    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            console.log('WEBHOOK_VERIFIED');
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// Webhook Event Listener (POST)
app.post('/webhook', async (req, res) => {
    const body = req.body;
    console.log('Received webhook event:', JSON.stringify(body, null, 2));

    if (body.object === 'page') {
        // Safety check for entry
        if (!body.entry || !Array.isArray(body.entry)) {
            console.log('No entries found in webhook payload.');
            return res.status(200).send('EVENT_RECEIVED');
        }

        for (const entry of body.entry) {
            if (entry.changes && Array.isArray(entry.changes)) {
                for (const change of entry.changes) {
                    console.log(`Checking change field: ${change.field}, item: ${change.value?.item}, verb: ${change.value?.verb}`);

                    if (change.field === 'feed' && change.value?.item === 'comment' && change.value?.verb === 'add') {
                        const commentId = change.value.comment_id;
                        const userId = change.value.from?.id;
                        const message = change.value.message;
                        const postId = change.value.post_id;

                        if (commentId && userId) {
                            await automation.handleNewComment(commentId, userId, message, postId);
                        } else {
                            console.log('Missing commentId or userId, skipping.');
                        }
                    } else {
                        console.log('Change is not a new comment, ignoring.');
                    }
                }
            }
        }
        res.status(200).send('EVENT_RECEIVED');
    } else {
        console.log(`Received non-page object: ${body.object}`);
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
