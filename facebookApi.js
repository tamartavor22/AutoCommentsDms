const axios = require('axios');
require('dotenv').config();

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN;
const BASE_URL = 'https://graph.facebook.com/v18.0';

const facebookApi = {
    async likeComment(commentId) {
        try {
            const response = await axios.post(`${BASE_URL}/${commentId}/likes`, {
                access_token: PAGE_ACCESS_TOKEN
            });
            return response.data;
        } catch (error) {
            console.error('Error liking comment:', error.response?.data || error.message);
        }
    },

    async replyToComment(commentId, message) {
        try {
            const response = await axios.post(`${BASE_URL}/${commentId}/comments`, {
                message: message,
                access_token: PAGE_ACCESS_TOKEN
            });
            return response.data;
        } catch (error) {
            console.error('Error replying to comment:', error.response?.data || error.message);
        }
    },

    async sendPrivateReply(commentId, message) {
        try {
            // Private reply uses the /comments endpoint but sends a message
            const response = await axios.post(`${BASE_URL}/${commentId}/private_replies`, {
                message: message,
                access_token: PAGE_ACCESS_TOKEN
            });
            return response.data;
        } catch (error) {
            console.error('Error sending private reply:', error.response?.data || error.message);
        }
    },

    async sendDM(recipientId, message) {
        try {
            const response = await axios.post(`${BASE_URL}/me/messages`, {
                recipient: { id: recipientId },
                message: { text: message },
                access_token: PAGE_ACCESS_TOKEN
            });
            return response.data;
        } catch (error) {
            console.error('Error sending DM:', error.response?.data || error.message);
        }
    },

    async debugToken() {
        try {
            const response = await axios.get(`${BASE_URL}/me`, {
                params: {
                    access_token: PAGE_ACCESS_TOKEN,
                    fields: 'id,name'
                }
            });
            return {
                valid: true,
                data: response.data
            };
        } catch (error) {
            return {
                valid: false,
                error: error.response?.data || error.message
            };
        }
    }
};

module.exports = facebookApi;
