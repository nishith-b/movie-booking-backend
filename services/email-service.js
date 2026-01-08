const axios = require("axios");
const User = require("../models/user");

const sendMail = async (subject, email, content) => {
  const user = await User.findById(user.email);
  axios.post(process.env.NOTI_SERVICE + "/notiservice/api/v1/notifications", {
    subject: subject,
    recepientEmails: email,
    content: content,
  });
};

module.exports = sendMail;
