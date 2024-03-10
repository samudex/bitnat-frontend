import { useEffect, useState } from "react";
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

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts`)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                setArticles(data);
            });
    }, []);

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
                    <TextField label="Search news" variant="standard" />
                </Box>

                <Grid spacing={3} container>
                    {articles.map((article) => (
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
