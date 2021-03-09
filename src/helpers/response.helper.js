function formatResponse(data, code, status, message) {
  const response = {
    code: code || 200,
    isError: !data && data !== 0,
    status: status || 'OK',
    message: message || 'success',
    data
  };


  if (!!data && !!data.rows) {
    const itemCount = data.rows.length;
    const currentPage = parseInt(data.current_page);
    const dataCount = Array.isArray(data.count) ? data.count.length : data.count;
    const pageCount = Math.ceil(dataCount / data.item_count);
    response.data = data.rows;
    response.page_info = {
      page_count: pageCount,
      current_page: currentPage || null,
      next_page: (currentPage < pageCount) ? currentPage + 1 : null,
      item_count: itemCount,
      total_count: dataCount
    };
  }

  return response;
}

module.exports = {
  formatResponse
};
