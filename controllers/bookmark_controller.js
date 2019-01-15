function index(req, res) {
  return res.json(req.user.bookmarks);
}

async function create(req, res, next) {
  // Create new resource
  const { title, url } = req.body;
  const parsedUrl = parseUrl(url);
  req.user.bookmarks.push({ title, url: parsedUrl });
  try {
    await req.user.save();
    return res.json(req.user.bookmarks);
  } catch (err) {
    next(err);
  }
}

async function update(req, res, next) {
  // Updates the resource
  let { id } = req.params;
  let { title, url } = req.body;
  const bookmark = req.user.bookmarks.id(id);
  try {
    bookmark.title = title;
    bookmark.url = url;
    await req.user.save();
    return res.json(req.user.bookmarks);
  } catch (err) {
    next(err);
  }
}

async function destroy(req, res, next) {
  // Deletes the resource
  let { id } = req.params;
  const bookmark = req.user.bookmarks.id(id);
  try {
    bookmark.remove();
    await req.user.save();
    return res.json(req.user.bookmarks);
  } catch (err) {
    next(err);
  }
}

function parseUrl(url) {
  if (url.substr(0, 7) === "http://" || url.substr(0, 8) === "https://") {
    return url;
  }
  return `http://${url}`;
}

module.exports = {
  index,
  create,
  update,
  destroy
};
