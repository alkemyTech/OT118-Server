const createError = require("http-errors");

const generatePaginationParams = (req) => {
  let { page } = req.query;
  page = page || 1; // page default value if undefined
  const baseUrl = `${req.protocol}://${req.get("host")}${req.baseUrl}`;
  return {
    page,
    baseUrl,
  };
};

const paginate = async (baseUrl, page, limit, repository) => {
  const count = await repository.count();
  const maxPage = Math.ceil(count / limit);
  if (page > maxPage)
    throw createError(400, { msg: "Parameter 'page' is out of range" });

  page = Number(page);
  const offset = limit * (page - 1),
    prev = page - 1,
    next = page + 1,
    data = await repository.getAll(limit, offset);

  const prevUrl = prev == 0 ? null : `${baseUrl}?page=${prev}`;
  const nextUrl = next < maxPage ? `${baseUrl}?page=${next}` : null;

  return {
    prev: prevUrl,
    next: nextUrl,
    pages: maxPage,
    data,
  };
};

module.exports = { generatePaginationParams, paginate };
