import React from "react";

import {
  Post,
  AddComment,
  CommentsBlock
} from "../Components";
import globalSettings from "../Settings/globalSettings";

export const PostPage = () => {
  const [ post, setPost ] = React.useState({});
  const [ isPostLoaded, setIsPostLoaded ] = React.useState(false);

  React.useEffect(() => {
    const id = window.location.href.split('/').pop();

    fetch(`${globalSettings.BASE_URL}/posts/${id}`, {method: 'get'})
      .then(data => data.json())
      .then(data => {
        setPost(data.post);
        setIsPostLoaded(true);
      })
      .catch(err => {
        console.log(err);
      })
  }, [setPost, setIsPostLoaded]);

  const onAddComment = (comment) => {
    setPost({
      ...post,
      comments: [
        ...post.comments,
        comment,
      ]
    });
  }

  return (
    <>
      {isPostLoaded ? (
        <>
        <Post _id={post._id}
              title={post.title}
              imageUrl={post.imageUrl}
              user={post.author}
              createdAt={post.createdAt}
              viewsCount={post.viewsCount}
              commentsCount={2}
              tags={post.tags}
              isFullPost
        >
          <p>
            {post.text}
          </p>
        </Post>
        <CommentsBlock items={post.comments}
                       isLoading={false}>
          <AddComment
            postId={post._id}
            onAddComment={onAddComment}
          />
        </CommentsBlock>
        </>
      ) : (<Post isLoading/>)}
    </>
  )
}