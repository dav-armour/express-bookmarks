const UserModel = require("./../database/models/user_model");
const JWTService = require("./../services/jwt_service");

function register(req, res, next) {
  const { email, password } = req.body;
  const user = new UserModel({ email });

  UserModel.register(user, password, (err, user) => {
    if (err) {
      return next(new HTTPError(500, err.message));
    }

    const token = JWTService.generateToken(user);

    return res.json({ token });
  });
}

async function login(req, res, next) {
  const { email, password } = req.body;
  const { user, error } = await UserModel.authenticate()(email, password);
  if (error) {
    return next(new HTTPError(401, error.message));
  }
  const token = JWTService.generateToken(user);
  return res.json({ token });
}

module.exports = {
  register,
  login
};
