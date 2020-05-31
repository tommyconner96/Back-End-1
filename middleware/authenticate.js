const sessions = {};

function authenticate() {
  const authError = {
    message: "Invalid credentials",
  };

  return async (req, res, next) => {
    try {
      // FE having auth issues so maybe try checking for a token?
      if (!req.body.password || !req.session.user) {
        return res.status(401).json(authError);
      }
      next();
    } catch (err) {
      next(err);
    }
  };
}

module.exports = {
  sessions,
  authenticate,
};
