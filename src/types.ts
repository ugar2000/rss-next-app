export interface Post {
    id: number;
    title: string;
    link: string;
    pubDate: Date;
    content: string;
}

export interface PaginatedPosts {
    posts: Post[];
    pagination: {
        totalCount: number;
        totalPages: number;
        currentPage: number;
    };
}