const createError = require("http-errors");

const paginate = async (baseUrl, page, limit, count) => {
    let prevUrl = null, nextUrl = null, offset = null;
    const maxPage = Math.ceil(count / limit);
    if (count > 0) {
        if (page > maxPage)
            throw createError(400, {msg: "Parameter 'page' is out of range"});

        page = Number(page);

        offset = limit * (page - 1);
        const prev = page - 1,
            next = page + 1;

        if (prev > 0) prevUrl = `${baseUrl}?page=${prev}`;
        if (next <= maxPage) nextUrl = `${baseUrl}?page=${next}`;
    }
    return {
        prev: prevUrl,
        next: nextUrl,
        pages: maxPage,
        offset,
        data: []
    };
};

module.exports = {paginate};
