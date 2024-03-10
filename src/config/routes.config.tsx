import NewsItem from "../pages/NewsItem";
import NewsList from "../pages/NewsList";

export const routes = [
    {
        path: '/',
        element: <NewsList />
    },
    {
        path: '/news/:id',
        element: <NewsItem />
    }
]
