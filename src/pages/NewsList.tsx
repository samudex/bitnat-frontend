import { useEffect, useState, ChangeEvent } from "react";
import Layout from "../components/Layout";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    Typography,
    Grid,
    TextField,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const NewsList = () => {
    const navigate = useNavigate();
    const [articles, setArticles] = useState<any[]>([]);
    const [filteredArticles, setFilteredArticles] = useState<any[]>([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const articleResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts`
                );
                const articleData = await articleResponse.json();

                if (!articleResponse.ok) {
                    throw articleData;
                }

                const authorResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/users`
                );
                const authorData = await authorResponse.json();

                if (!authorResponse.ok) {
                    throw authorData;
                }

                const mappedArticles = articleData.map((article: any) => ({
                    ...article,
                    authorName: authorData.find(
                        (author: any) => author.id === article.userId
                    )?.name,
                }));

                setArticles(mappedArticles);
                setFilteredArticles(mappedArticles);
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticles();
    }, []);

    const onFilterChange = (e: ChangeEvent<HTMLInputElement>) => {
        const uwu = articles.filter(
            (article) =>
                article.title.toLowerCase().includes(e.target.value.toLowerCase()) ||
                article.authorName.toLowerCase().includes(e.target.value.toLowerCase())
        );
        setFilteredArticles(uwu);
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
                        <Grid xs={3} item>
                            <Card sx={{ minWidth: 275 }}>
                                <CardContent>
                                    <Typography variant="body2">{article.title}</Typography>
                                </CardContent>
                                <CardActions>
                                    <Button
                                        size="small"
                                        onClick={() => navigate(`/news/${article.id}`)}
                                    >
                                        Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Layout>
    );
};

export default NewsList;
