const paginate = async (req, limit, repository) => {
  let { page } = req.query;
  page = page || 1  // page default value if undefined
  const count = await repository.count();
  const maxPage = Math.ceil(count / limit);
  if (page > maxPage) {
    const error = new Error('Parameter "page" is out of range');
    error.status = 400;
    throw error;
  }
  if (page < 1) {
    const error = new Error('Parameter "page" cannot be negative or zero');
    error.status = 400;
    throw error;
  }
  if (isNaN(page)) {
    const error = new Error(
      'The "page" parameter must be an integer greater than zero'
    );
    error.status = 400;
    throw error;
  }
  page = Number(page)
  const offset = limit * (page - 1),
    prev = page - 1,
    next = page + 1,
    baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`,
    data = await repository.getAll(limit, offset);
  
  return {
    prev: `${baseUrl}?page=${prev == 0 ? 1 : prev}`,
    next: `${baseUrl}?page=${next < maxPage ? next : maxPage}`,
    pages: maxPage,
    data,
  };
};

module.exports = { paginate };
