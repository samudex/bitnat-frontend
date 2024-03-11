import { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { useParams } from "react-router-dom";
import { Typography, Card, CardContent, Tooltip, Box } from "@mui/material";

const NewsItem = () => {
    const params = useParams();

    const [article, setArticle] = useState<any>(null);

    useEffect(() => {
        const fetchArticle = async () => {
            try {
                // Get current article with the ID from URL
                const articleResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/posts/${params.id}`
                );
                const articleData = await articleResponse.json();

                if (!articleResponse.ok) {
                    throw articleData;
                }

                // Get article comments with the ID from URL
                const commentResponse = await fetch(
                    `https://jsonplaceholder.typicode.com/comments?postId=${params.id}`
                );
                const commentData = await commentResponse.json();

                if (!commentResponse.ok) {
                    throw commentData;
                }

                // Save in state the article data with its comments
                setArticle({ ...articleData, comments: commentData });
            } catch (error) {
                console.error(error);
            }
        };

        fetchArticle();
    }, []);

    return (
        <Layout>
            {article && (
                <>
                    <Box sx={{ margin: 2 }}>
                        <Typography variant="h2" sx={{ marginBottom: 1 }}>{article.title}</Typography>
                        <Typography>{article.body}</Typography>

                        {/* Only show article comments if there is a comment. */}
                        {article.comments.length > 0 && (
                            <>
                                <Typography variant="h4" sx={{ marginTop: 2, marginBottom: 2 }}>Comments</Typography>

                                {article.comments.map((comment: any) => (
                                    <Card sx={{ minWidth: 275, marginBottom: 2 }}>
                                        <CardContent>
                                            <Typography variant="h6" >{comment.name}</Typography>
                                            <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                                {comment.email}
                                            </Typography>
                                            <Typography variant="body2"> {comment.body} </Typography>
                                        </CardContent>
                                    </Card>
                                ))}
                            </>
                        )}
                    </Box>
                </>
            )
            }
        </Layout >
    );
};

export default NewsItem;
