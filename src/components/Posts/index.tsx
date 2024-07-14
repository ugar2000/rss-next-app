'use client'

import React, {FC} from 'react'
import CardsList from "@/components/Posts/CardsList";
import {PaginatedPosts} from "@/types";
import {PostsProvider} from "@/components/Posts/PostsContext";
import Pagination from "@/components/Posts/Paginator";

interface Props {
    data: PaginatedPosts
}

const Posts: FC<Props> = ({data}) => {
    return (
        <div>
            <PostsProvider initPosts={data}>
                <CardsList />
                <Pagination />
            </PostsProvider>
        </div>
    )
}

export default Posts;