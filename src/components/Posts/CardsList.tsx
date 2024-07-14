import {Post} from "@/types";
import PostCard from "@/components/Posts/PostCard";
import {FC, useMemo} from "react";
import {usePaginatedPosts} from "@/components/Posts/PostsContext";
import {Spinner} from "@/components/Posts/Spinner";


const CardsList: FC = () => {
    const {paginatedPosts: {posts}, isLoading, isError} = usePaginatedPosts();

    const enableRender = useMemo(() => {
        return !isLoading && !!posts.length && !isError;
    }, [isLoading, posts, isError]);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {isLoading && (
                <Spinner />
            )}

            {(!isLoading && !posts.length) && (
                <div className="text-center text-lg text-gray-500">No posts found</div>
            )}

            {enableRender && (
                <>
                    {posts.map((post: Post) => (
                        <PostCard key={post.id} post={post} />
                    ))}
                </>
            )}
        </div>
    );
};

export default CardsList;