import { useCallback, useEffect, useState } from 'react';
import { IPost } from '../../modules/IPost';
import { postAPI } from '../../services/postService';
import PostItem from '../PostItem/PostItem';
import './PostContainer.css';


const PostContainer = () => {
    const [limit, setLimit] = useState(10);

    // "pollingInterval" - Long pulling(аналог websocket - то есть реализовывать запрос каждые несколько секунд)
    // const {data: posts, isLoading, error} = postAPI.useFetchAllPostsQuery(limit, {
    //     pollingInterval: 2000
    // });

    const { data: posts, isLoading, error } = postAPI.useFetchAllPostsQuery(limit);
    const [createPost, {isLoading: postCreateLoading}] = postAPI.useCreatePostMutation();
    const [updatePost] = postAPI.useUpdatePostMutation();
    const [deletePost] = postAPI.useDeletePostMutation();

    useEffect(() => {
        const timer = setTimeout(() => {
            setLimit(50);
        }, 2000);

        return () => {
            clearTimeout(timer);
        }
    }, []);

    const handleCreate = useCallback(async () => {
      const title = prompt('Title');
      const body = prompt('Body');
      await createPost({title, body} as IPost);
    }, [createPost]);
    

    if (isLoading || postCreateLoading) {
        return <h2>Загрузка...</h2>
    }

    if (error && 'error' in error) {
        return <h2>Ошибка - {error.error}</h2>
    }

    return (
        <div className='posts__wrapper'>
            <button onClick={handleCreate} className='post__add'>+</button>
            <div className='posts'>
                {
                    posts?.map(post => (
                        <PostItem key={post.id} {...{ post }} {...{deletePost}} {...{updatePost}} />
                    ))
                }
            </div>
        </div>
    );
};

export default PostContainer;