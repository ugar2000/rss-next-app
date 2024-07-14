import {PaginatedPosts} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost3000';

export const fetchPosts = async (pageSize: number = 10, page: number = 1): Promise<PaginatedPosts> => {
    try {
        const response = await fetch(`${API_BASE_URL}/posts?pageSize=${pageSize}&page=${page}`);
        if (!response.ok) {
            console.log('Failed to fetch posts')
            throw new Error('Failed to fetch posts');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching posts:', error);
        throw error;
    }
};
