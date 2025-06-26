import { useSearchParams } from "react-router-dom";

export function usePaginationParams(defaultPage = 1, defaultLimit = 5) {
  const [params, setParams] = useSearchParams();

  const page = parseInt(params.get("page") || defaultPage, 10);
  const limit = parseInt(params.get("limit") || defaultLimit, 10);

  const setPage = (newPage) => {
    params.set("page", newPage);
    setParams(params);
  };

  const setLimit = (newLimit) => {
    params.set("limit", newLimit);
    params.set("page", "1"); // reset to page 1 when limit changes
    setParams(params);
  };

  return { page, limit, setPage, setLimit };
}
