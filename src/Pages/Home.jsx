import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import {fetchPosts, fetchTags} from "../redux/slices/posts";

import {
  Tab,
  Tabs,
  Grid,
} from "@mui/material";

import {
  Post,
  TagsBlock,
  CommentsBlock,
} from "../Components";

export const Home = () => {
  const dispatch = useDispatch();
  const { posts, tags } = useSelector(state => state.posts);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, [dispatch]);

  return (
    <>
      <Tabs style={{marginBottom:15}} value={0}>
        <Tab label="New"/>
        <Tab label="Popular"/>
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isPostsLoading || posts.items?.length === 0 ? (
            <Post
              _id={1}
              isLoading
            />
          ) : posts.items?.map((post, i) => {
            return (
              <Post
                _id={post._id}
                key={i}
                title={post.title}
                imageUrl={post.imageUrl}
                user={{
                  avatarUrl:
                    post.author.avatarUrl,
                  fullName: post.author.fullName,
                }}
                createdAt={post.createdAt}
                viewsCount={post.viewsCount}
                tags={post.tags}
                isEditable
              />
            )
          })}
        </Grid>
        <Grid xs={4} item>
          {isTagsLoading ? (
            <TagsBlock items={["Загрузка", "Загрузка", "Загрузка"]} isLoading={true}/>
          ) : (
            <TagsBlock items={tags.items} isLoading={false}/>
          )}
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: 'Вася Пупкин',
                  avatarUrl: 'https://mui.com/static/images/avatar/1.jpg',
                },
                text: 'Это тестовый комментарий',
              },
              {
                user: {
                  fullName: 'Иван Иванов',
                  avatarUrl: 'https://mui.com/static/images/avatar/2.jpg',
                },
                text: 'When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top',
              },
            ]}
            isLoading={false}
          />
        </Grid>
      </Grid>
    </>
  )
}