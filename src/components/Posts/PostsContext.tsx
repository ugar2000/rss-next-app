import React, {createContext, useState, useEffect, FC, ReactNode, useRef, useContext} from 'react';
import { PaginatedPosts } from '@/types';
import { fetchPosts as fetchPostsApi } from '@/utils/api';

interface PostsContextState {
    paginatedPosts: PaginatedPosts;
    isLoading: boolean;
    isError: boolean;
    errorText: string | null;
    page: number;
    rowsPerPage: number;
    setPage: (page: number) => void;
    setRowsPerPage: (rowsPerPage: number) => void;
}

const PostsContext = createContext<PostsContextState | undefined>(undefined);

interface Props {
    children: ReactNode;
    initPosts: PaginatedPosts;
}

export const PostsProvider: FC<Props> = ({ children, initPosts,  }) => {
    const [paginatedPosts, setPosts] = useState<PaginatedPosts>(initPosts);
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsError] = useState(false);
    const [errorText, setErrorText] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(12);
    const hasPageRendered = useRef(false);

    useEffect(() => {
        if(!hasPageRendered.current) {
            hasPageRendered.current = true;
            return;
        }

        const fetchPosts = async () => {
            setIsLoading(true);
            setIsError(false);
            setErrorText(null);

            try {
                const data = await fetchPostsApi(rowsPerPage, page);
                setPosts(data);
            } catch (error) {
                setIsError(true);
                setErrorText((error as Error).message);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPosts();
    }, [page, rowsPerPage]);

    return (
        <PostsContext.Provider value={{ paginatedPosts, isLoading, isError, errorText, page, rowsPerPage, setPage, setRowsPerPage }}>
            {children}
        </PostsContext.Provider>
    );
};

export const usePaginatedPosts = () => {
    const context = useContext(PostsContext);
    if (!context) {
        throw new Error('usePosts must be used within a PostsProvider');
    }
    return context;
};