const User = require("../models/User");
const jwt = require("jsonwebtoken");

const requiresAuth = async (req, res, next) => {
  const token = req.cookies["accessToken"];
  let isAuthed = false;

  if (token) {
    try {
      const { userId } = jwt.verify(token, process.env.JWT_SECRET);

      try {
        const user = await User.findById(userId);

        if (user) {
          const returnedUser = { ...user._doc };
          delete returnedUser.password;
          req.user = returnedUser;
          isAuthed = true;
        }
      } catch {
        isAuthed = false;
      }
    } catch {
      isAuthed = false;
    }
  }

  if (isAuthed) {
    return next();
  } else {
    return res.status(401).send("Unauthorized");
  }
};

module.exports = requiresAuth;
