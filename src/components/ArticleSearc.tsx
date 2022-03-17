import React, { useEffect } from "react";
import { useData } from "../custom-hooks/useData";
import { Algolio } from "../url/Url";
interface Props {}
const ArticleSearch: React.FC<Props> = (): JSX.Element => {
  const [data, query, setQuery, loading, error] = useData(Algolio);

  useEffect(() => {
    if (error) {
      throw new Error(error);
    }
  }, [error]);

  const onHandleQueryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value || "");
  };
  return (
    <>
      <div>
        <input
          type="text"
          value={query}
          onChange={(e) => onHandleQueryChange(e)}
        />
      

      {loading && <p>loading...</p>}

      {data.length >=1 &&
        data.map((article) => {
          return (
            <a key={article.title} href={article.url}>
              {article.title}
            </a>
          );
        })}
        </div>
    </>
  );
};

export default ArticleSearch;
