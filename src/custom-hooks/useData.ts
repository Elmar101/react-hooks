import axios, { AxiosError, CancelTokenSource } from "axios";
import { useEffect, useState } from "react";

type Data = [
  data: any[],
  query: string,
  setQuery: (query: string) => void,
  loading: boolean,
  error: string
];
export const useData = (url: string): Data => {
  const [query, setQuery] = useState<string>("react hooks");
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [token, setToken] = useState<CancelTokenSource | undefined>(undefined);

  useEffect(() => {
    if (token) {
      token.cancel("REQUEST_CANCELED");
    }
    const fetchData = async () => {
      setError("");
      setLoading(true);
      setData([]);
      const CancelToken = axios.CancelToken;
      const source = CancelToken.source();
      setToken(source);
      /*  const response = await axios.get(
        `http://hn.algolia.com/api/v1/search?query=${query}`, { cancelToken: source.token }
      ); */
      const response = await axios.get(url, {
        cancelToken: source.token,
        params: { query: query },
      });
      setToken(undefined);
      setData(response.data.hits);
      setLoading(false);
    };

    fetchData().catch((err: AxiosError) => {
      if (err.message !== "REQUEST_CANCELED") {
        setError(err.message);
      }
      setToken(undefined);
    });
  }, [query]);
  return [data, query, setQuery, loading, error];
};
