const facebookApi = require('./facebookApi');
require('dotenv').config();

const DM_1 = process.env.DM_1 || "היי! ראיתי שכתבת לי בתגובות, איזה כיף :)";
const DM_2 = process.env.DM_2 || "רציתי לשלוח לך את הפרטים שביקשת...";
const DM_3 = process.env.DM_3 || "הנה הלינק לכל הפרטים: [LINK_HERE]";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const automation = {
    async handleNewComment(commentId, userId, message) {
        console.log(`Processing comment ${commentId} from user ${userId}`);

        // 1. Like the comment
        await facebookApi.likeComment(commentId);
        console.log(`Liked comment ${commentId}`);

        // 2. Reply to the comment
        const publicReply = "איזה כיף! שולחת לך בפרטי";
        await facebookApi.replyToComment(commentId, publicReply);
        console.log(`Replied to comment ${commentId}`);

        // 3. Send the DM sequence
        // Note: The first DM should be a Private Reply to the comment if possible
        // to open the messaging window.
        console.log(`Starting DM sequence for user ${userId}`);

        try {
            await facebookApi.sendPrivateReply(commentId, DM_1);
            console.log(`Sent Private Reply (DM 1) to user ${userId}`);
        } catch (error) {
            console.error('Failed to send private reply, attempting regular DM');
            await facebookApi.sendDM(userId, DM_1);
            console.log(`Sent regular DM 1 to user ${userId}`);
        }

        await delay(5000); // 5 second delay between messages
        await facebookApi.sendDM(userId, DM_2);
        console.log(`Sent DM 2 to user ${userId}`);

        await delay(5000); // 5 second delay
        await facebookApi.sendDM(userId, DM_3);
        console.log(`Sent DM 3 to user ${userId}`);

        console.log(`Completed automation for comment ${commentId}`);
    }
};

module.exports = automation;
