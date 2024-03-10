import { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import { useParams } from 'react-router-dom';
import { Typography } from '@mui/material';

const NewsItem = () => {
    const params = useParams()

    const [article, setArticle] = useState<any>(null)

    useEffect(() => {
        fetch(`https://jsonplaceholder.typicode.com/posts/${params.id}`).then(response => response.json()).then(data => {
            console.log(data)
            setArticle(data)
        });

    }, [])


    return (
        <Layout>
            {article && (
                <>
                    <Typography variant='h2'>
                        {article.title}
                    </Typography>
                    <Typography>{article.body}</Typography>
                </>
            )}
        </Layout>
    )
}

export default NewsItem
