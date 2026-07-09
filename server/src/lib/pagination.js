export const parsePagination = ({ page, limit }) => ({
  page: Number.isInteger(Number(page)) && Number(page) > 0 ? Number(page) : 1,
  limit: Number.isInteger(Number(limit)) && Number(limit) > 0 ? Number(limit) : 20,
});
