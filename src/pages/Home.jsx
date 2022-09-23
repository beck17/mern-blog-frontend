import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components";
import { TagsBlock } from "../components";
import { CommentsBlock } from "../components";
import { fetchPosts, fetchTags } from "../redux/slices/posts";
import { fetchLastComments, fetchComments } from "../redux/slices/comments";
import { useDispatch, useSelector } from "react-redux";

export const Home = () => {
  const dispatch = useDispatch();

  const { posts, tags } = useSelector((state) => state.posts);
  const { lastComments } = useSelector((state) => state.comment);
  const userData = useSelector((state) => state.auth.data);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isLastCommentsLoading = lastComments.status === "loading";

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, []);

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={0}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
                }
                user={obj.user}
                createdAt={obj.createdAt}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                // isLoading={true}
                tags={obj.tags}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags.items} isLoading={isTagsLoading} />
          <CommentsBlock
            items={lastComments.items}
            isLoading={isLastCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
