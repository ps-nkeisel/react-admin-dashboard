export const loadSmallChat = () => {
    window.Smallchat = {
        config: {
            "slackTeamId": "T02KDUQT6", //first part of key 
            "scChannelId": "-KsEpGWzqgnxa1Ub6H_F",
            "slackChannelId": "G6TNP8XQX", // second part of key
            "uid": "-LL8f4rrWQEolH6zXZ3I",
            "planId": null,
            "accountCreated": 1535613099538
        },
        appearance: {
            "brand_color": "#4885ed",
            "contact_dismissible": false,
            "contact_enabled": true,
            "contact_field_label": "Email",
            "contact_immediately": true,
            "contact_prompt": "Add your name and email to make sure you see our reply:",
            "contact_reply": "Thanks {{name}}! You'll get a response here or we'll contact you at {{contact}}.",
            "custom_css": "",
            "hide_logo": false,
            "hide_team_icon": true,
            "launcher_pos": "right",
            "launcher_prompt": "Send a message",
            "launcher_type": "icon",
            "messenger_blank": "Send a message or email us at support@vuukle.com",
            "messenger_entry": "Send a message...",
            "messenger_prompt": "How can we help you?",
            "name_field_label": "Name",
            "offline_greeting": "We’re offline right now but feel free to email us on support@vuukle.com",
            "submit_label": "Done",
            "text_color": "#ffffff"
        },
        behavior: {
            "avatar_config": 0,
            "friday": {
                "from": "11:00",
                "to": "11:00"
            },
            "hide_offline": false,
            "hide_urls": [{
                "type": "2",
                "url": "https://docs.vuukle.com/privacy-and-policy/"
            }, {
                "type": "1",
                "url": "/login"
            }, {
                "type": 1,
                "url": "/register"
            }, {
                "type": 1,
                "url": "/forgot-password"
            }],
            "monday": {
                "from": "22:00",
                "to": "11:00"
            },
            "operating_hours": true,
            "saturday": {
                "disabled": true,
                "to": "11:00"
            },
            "sunday": {
                "disabled": true
            },
            "thursday": {
                "from": "11:00",
                "to": "11:00"
            },
            "timezone": "America/New_York",
            "tuesday": {
                "from": "22:00",
                "to": "11:00"
            },
            "wednesday": {
                "from": "22:00",
                "to": "11:00"
            }
        },
    };
    var styles = document.createElement('link');
    styles.rel = 'stylesheet';
    styles.href = 'https://static.small.chat/messenger.css';
    document.head.appendChild(styles);
    var script = document.createElement('script');
    script.async = true;
    script.src = 'https://static.small.chat/messenger.js';
    document.body.appendChild(script);
}
