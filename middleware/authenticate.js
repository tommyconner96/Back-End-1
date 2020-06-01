const jwt = require("jsonwebtoken");
// const sessions = {};

function authenticate() {
  // const authError = {
  //   message: "Invalid credentials",
  // };

  // Sessions was NOT WORKING with client side auth!
  // return async (req, res, next) => {
  //   try {
  //     // FE having auth issues so maybe try checking for a token?
  //     if (!req.body.session || !req.session.user) {
  //       return res.status(401).json(authError);
  //     }
  //     next();
  //   } catch (err) {
  //     next(err);
  //   }
  // };
  return async (req, res, next) => {
    const authError = {
      message: "Invalid credentials",
    };

    try {
      // express-session will automatically get the session ID from the cookie
      // header, and check to make sure it's valid and the session for this user exists.
      // if (!req.session || !req.session.user) {
      // 	return res.status(401).json(authError)
      // }

      const token = req.cookies.token;
      if (!token) {
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decodedPayload) => {
        if (err) {
          return res.status(401).json(authError);
        }

        req.token = decodedPayload;

        next();
      });
    } catch (err) {
      next(err);
    }
  };
}

module.exports = authenticate;

// {
//   sessions,
//   authenticate,
// };
