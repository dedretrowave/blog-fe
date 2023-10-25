import React from "react";
import { useDispatch, useSelector } from 'react-redux';

import {fetchPosts, fetchTags} from "../redux/slices/posts";
import {getPosts, getUser} from "../redux/slices/user";

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
  const { posts, tags } = useSelector(getPosts);
  const user = useSelector(getUser);

  const isPostsLoading = posts.status === 'loading';
  const isTagsLoading = tags.status === 'loading';

  React.useEffect(() => {
    dispatch( fetchPosts());
    dispatch( fetchTags());
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
                isEditable={user.data && post.author._id === user.data._id}
              />
            )
          })}
        </Grid>
        <Grid xs={4} item>
          {isTagsLoading ? (
            <TagsBlock items={["Loading"]} isLoading={true}/>
          ) : (
            <TagsBlock items={tags.items} isLoading={false}/>
          )}
        </Grid>
      </Grid>
    </>
  )
}