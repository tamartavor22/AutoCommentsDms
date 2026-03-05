const facebookApi = require('./facebookApi');
const responses = require('./responses');
require('dotenv').config();

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const automation = {
    async handleNewComment(commentId, userId, message, postId) {
        console.log(`Processing comment ${commentId} on post ${postId} from user ${userId}`);

        // Select the message set based on postId or use default
        const config = responses[postId] || responses.default;

        // Future keyword check (optional)
        if (config.keywords && config.keywords.length > 0) {
            const hasKeyword = config.keywords.some(keyword => message.toLowerCase().includes(keyword.toLowerCase()));
            if (!hasKeyword) {
                console.log(`No matching keywords found for comment ${commentId}. Skipping.`);
                return;
            }
        }

        // 1. Like the comment
        await facebookApi.likeComment(commentId);
        console.log(`Liked comment ${commentId}`);

        // 2. Reply to the comment
        await facebookApi.replyToComment(commentId, config.publicReply);
        console.log(`Replied to comment ${commentId}`);

        // 3. Send the DM sequence
        console.log(`Starting DM sequence for user ${userId}`);

        // DM 1 (Private Reply)
        try {
            await facebookApi.sendPrivateReply(commentId, config.dms[0]);
            console.log(`Sent Private Reply (DM 1) to user ${userId}`);
        } catch (error) {
            console.error('Failed to send private reply, attempting regular DM');
            await facebookApi.sendDM(userId, config.dms[0]);
        }

        // Subsequent DMs
        for (let i = 1; i < config.dms.length; i++) {
            await delay(5000); // 5 second delay between messages
            await facebookApi.sendDM(userId, config.dms[i]);
            console.log(`Sent DM ${i + 1} to user ${userId}`);
        }

        console.log(`Completed automation for comment ${commentId}`);
    }
};

module.exports = automation;
