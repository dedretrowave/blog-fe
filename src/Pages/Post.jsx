import React from "react";

import {
  Post,
  Index,
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

  return (
    <>
      {isPostLoaded ? (
        <Post id={post.id}
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
      ) : (<Post isLoading/>)}
      <CommentsBlock items={[
        {
          user: {
            fullName: "Vladimir Putin",
            avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
          },
          text: "Test comment",
        },
        {
          user: {
            fullName: "Иван Иванов",
            avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
          },
          text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
        },
      ]}
      isLoading={false}>
        <Index/>
      </CommentsBlock>
    </>
  )
}