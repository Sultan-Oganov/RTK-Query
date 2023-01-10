import { FC } from 'react';
import { IPost } from '../../modules/IPost';
import './PostItem.css';

interface PostItemProos {
    post: IPost;
    deletePost: (post: IPost) => void;
    updatePost: (post: IPost) => void;
}

const PostItem: FC<PostItemProos> = ({post, deletePost, updatePost}) => {
    
    const handleRemove = (event: React.MouseEvent, post: IPost) => {
        event.stopPropagation();
        deletePost(post)
    }

    const handleUpdate = () => { 
        const title = prompt('Title') || '';
        const body = prompt('Body') || '';
        updatePost({...post, title, body});
    }

    return (
        <div className='post' onClick={handleUpdate}>
            <h3 className='post__title'> {post.id}. {post.title}</h3>
            <p className='post__description'>
                {post.body}
            </p>
            <button onClick={(event) => handleRemove(event, post)} className='post__btn'>Delete</button>
        </div>
    );
};

export default PostItem;