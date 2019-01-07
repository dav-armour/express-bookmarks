function index(req, res) {
  res.json(req.user.bookmarks);
}

async function create(req, res, next) {
  req.user.bookmarks.push(req.body);
  try {
    await req.user.save();
    res.json(req.user.bookmarks);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  index,
  create
};
