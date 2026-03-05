/**
 * This file contains the messages used for auto-replies and DMs.
 * You can define different sets of messages for specific posts.
 */

const responses = {
    // Default messages used if no specific post ID matches
    default: {
        publicReply: "איזה כיף! שולחת לך בפרטי",
        dms: [
            "היי! ראיתי שכתבת לי בתגובות, איזה כיף :)",
            "רציתי לשלוח לך את הפרטים שביקשת...",
            "הנה הלינק לכל הפרטים: [LINK_HERE]"
        ],
        keywords: [] // Use empty array to match all comments
    },

    // Example of post-specific messages
    // To use this, find your Post ID in Facebook and add it here.
    "1FAAPg9qKb": {
        publicReply: "איזה כיף! שולחת לך בפרטי",
        dms: [
            `https://youtu.be/KSfuyg83kFA
מצורף הסרטון של השיעור המלא(באיכות בינונית, אני אשתפר!), מוזמנת להעביר הלאה למי שצריך 🙂`,
            `נפגש כרגיל היום ב17:30, לשיעור לייב עם הקישור הקבוע 
https://us06web.zoom.us/j/3941406339?pwd=cWxpSlYwek9Iem82eGZaM3JhNzFTZz09`,
            `https://chat.whatsapp.com/EsILfotK2ZM9qwtacbepvi?mode=gi_t
כאן אני שולחת סרטונים מוקלטים חדשים משיעורים כל יום אם את לא מספיקה לעלות בלייב מוזמנת להצטרף☺️`
        ],
        keywords: [] // Optional: only reply if these words appear
    }
};

module.exports = responses;
