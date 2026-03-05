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

    if (body.object === 'page') {
        body.entry.forEach(async (entry) => {
            if (entry.changes) {
                entry.changes.forEach(async (change) => {
                    if (change.field === 'feed' && change.value.item === 'comment' && change.value.verb === 'add') {
                        const commentId = change.value.comment_id;
                        const userId = change.value.from.id;
                        const message = change.value.message;

                        // Avoid responding to the page's own comments or replies to its own comments
                        // Note: In production, you'd check if change.value.from.id is YOUR page ID.

                        await automation.handleNewComment(commentId, userId, message);
                    }
                });
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
