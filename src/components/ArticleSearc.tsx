import React from "react";
import { useData } from "../custom-hooks/useData";
import { Algolio } from "../url/Url";
interface Props { }
const ArticleSearch: React.FC<Props> = (): JSX.Element => {
    const [data, query, setQuery, loading, error] = useData(Algolio);

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
            </div>
            {error && <p>{{ error }}</p>}
            {loading && <p>loading...</p>}

            <div>
                {data.map((article) => {
                    return (
                        <div key={article.id}>
                            <a href={article.url}>{article.title}</a>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default ArticleSearch;
