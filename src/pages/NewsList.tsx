import { useEffect, useState, ChangeEvent } from "react";
import Layout from "../components/Layout";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    TextField,
    Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { ARTICLES_PER_PAGE } from "../config/constants";

const NewsList = () => {
    const [articles, setArticles] = useState<any[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<any[]>([]);

    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                // Get article list from API
                const articleResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts`
                );
                const articleData = await articleResponse.json();

                if (!articleResponse.ok) {
                    throw articleData;
                }

                // Get authors from API
                const authorResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users`
                );
                const authorData = await authorResponse.json();

                if (!authorResponse.ok) {
                    throw authorData;
                }

                // Merges author names with the articles list
                const mappedArticles = articleData.map((article: any) => ({
                    ...article,
                    authorName: authorData.find(
                        (author: any) => author.id === article.userId
                    )?.name,
                }));

                setArticles(mappedArticles);
                setFilteredArticles(mappedArticles.slice(0, ARTICLES_PER_PAGE));
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const searchQuery = e.target.value.toLowerCase().trim();

        const articlesQuery = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(searchQuery) ||
                article.authorName.toLowerCase().includes(searchQuery)
        );

        // Paginate results only if there is not a query, if a search is in progress,
        // it should show all the results
        if (searchQuery) {
            setFilteredArticles(articlesQuery);
        } else {
            setFilteredArticles(articlesQuery.slice(0, ARTICLES_PER_PAGE));
        }


    };

    const onLoadMore = (cursor: number) => {
        return () => {
            const updatedCurrentPage = currentPage + cursor;
            setCurrentPage(updatedCurrentPage);

            // Slice the articles according the current page number
            setFilteredArticles(
                articles.slice(
                    ARTICLES_PER_PAGE * currentPage,
                    ARTICLES_PER_PAGE * updatedCurrentPage
                )
            );
        };
    };

    return (
        <Layout>
            <Box sx={{ padding: 1 }}>
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        marginBottom: 2,
                    }}
                >
                    <Typography variant="h3">News List</Typography>
                    <TextField
                        label="Search news"
                        variant="standard"
                        onChange={onFilterChange}
                    />
                </Box>

                <Grid spacing={3} container>
                    {filteredArticles.map((article) => (
                        <Grid xs={3} item key={article.id}>
                            <Link to={`/news/${article.id}`}>
                                <Card sx={{ minWidth: 275, minHeight: "15vw" }}>
                                    <CardContent>
                                        <Typography variant="h6">{article.title}</Typography>
                                    </CardContent>
                                </Card>
                            </Link>
                        </Grid>
                    ))}
                </Grid>
                <Button onClick={onLoadMore(1)} disabled={currentPage === articles.length / ARTICLES_PER_PAGE}>Next page</Button>
            </Box>
        </Layout>
    );
};

export default NewsList;
