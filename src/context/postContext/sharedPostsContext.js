import React, { createContext, useState, useContext } from 'react';
import { dummyData1, dummyData2 } from '../../dummyData'; //

export const SharedPostsContext = createContext();

export const useSharedPosts = () => {
    const context = useContext(SharedPostsContext);
    if (!context) {
        console.warn('useSharedPosts must be used within a SharedPostsProvider');
        return null;
    }
    return context;
};

// Provider du contexte
export const SharedPostsProvider = ({ children }) => {

    const getInitialUniversalFeed = () => {
        const allItems = [...dummyData1, ...dummyData2];
        return allItems.filter(item => item.isPosted === true);
    };


    const getInitialUserCatalog = () => {
        return [...dummyData2];
    };

    const [feedPosts, setFeedPosts] = useState(getInitialUniversalFeed());
    const [catalogPosts, setCatalogPosts] = useState(getInitialUserCatalog());

    const markAsPosted = (postId) => {
        const postToAdd = catalogPosts.find(post => post.id === postId);
        if (!postToAdd) return;

        setCatalogPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? { ...post, isPosted: true }
                    : post
            )
        );

        setFeedPosts(prev => {
            const exists = prev.find(post => post.id === postId);
            if (!exists) {
                return [{ ...postToAdd, isPosted: true }, ...prev];
            }
            return prev;
        });
    };

    const removeFromFeed = (postId) => {
        setCatalogPosts(prev =>
            prev.map(post =>
                post.id === postId
                    ? { ...post, isPosted: false }
                    : post
            )
        );

        // Supprimer du feed universel
        setFeedPosts(prev => prev.filter(post => post.id !== postId));
    };

    const addToCatalog = (newPost) => {
        setCatalogPosts(prev => [newPost, ...prev]);

        if (newPost.isPosted) {
            setFeedPosts(prev => [newPost, ...prev]);
        }
    };


    const updatePost = (updatedPost) => {
        setCatalogPosts(prev =>
            prev.map(post =>
                post.id === updatedPost.id
                    ? updatedPost
                    : post
            )
        );

        if (updatedPost.isPosted) {
            setFeedPosts(prev => {
                const existingIndex = prev.findIndex(post => post.id === updatedPost.id);
                if (existingIndex !== -1) {
                    const newFeed = [...prev];
                    newFeed[existingIndex] = updatedPost;
                    return newFeed;
                } else {
                    return [updatedPost, ...prev];
                }
            });
        } else {

            setFeedPosts(prev => prev.filter(post => post.id !== updatedPost.id));
        }
    };

    const likePost = (postId) => {
        console.warn('likePost deprecated - use user-specific like logic instead');

        const updateLikes = (posts) =>
            posts.map(post =>
                post.id === postId
                    ? {
                        ...post,
                        likes: (parseInt(post.likes.toString().replace(/[^0-9]/g, '')) + 1).toString()
                    }
                    : post
            );

        setCatalogPosts(updateLikes);
        setFeedPosts(updateLikes);
    };

    const value = {
        feedPosts,
        catalogPosts,
        markAsPosted,
        removeFromFeed,
        addToCatalog,
        updatePost,
        likePost,
        setFeedPosts,
        setCatalogPosts
    };

    return (
        <SharedPostsContext.Provider value={value}>
            {children}
        </SharedPostsContext.Provider>
    );
};