import { useEffect, useState } from "react";
import moment from "moment";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";

import { Post } from "../components";
import { TagsBlock } from "../components";
import { CommentsBlock } from "../components";
import {
  fetchPosts,
  fetchTags,
  fetchPopulatePosts,
  fetchPostsOnTag,
} from "../redux/slices/posts";
import { fetchLastComments } from "../redux/slices/comments";
import { useDispatch, useSelector } from "react-redux";

import styles from "./Home.module.scss";

export const Home = () => {
  const dispatch = useDispatch();

  const [newCategory, setCategory] = useState(0);
  const [tag, setTag] = useState("");

  const { posts, tags } = useSelector((state) => state.posts);
  const { lastComments } = useSelector((state) => state.comment);
  const userData = useSelector((state) => state.auth.data);

  const isPostLoading = posts.status === "loading";
  const isTagsLoading = tags.status === "loading";
  const isLastCommentsLoading = lastComments.status === "loading";

  useEffect(() => {
    dispatch(fetchTags());
    dispatch(fetchLastComments());
  }, [dispatch]);

  useEffect(() => {
    switch (newCategory) {
      case 0:
        dispatch(fetchPosts());
        break;
      case 1:
        dispatch(fetchPopulatePosts());
        break;
      case 2:
        dispatch(fetchPostsOnTag(tag));
        break;
      default:
        dispatch(fetchPosts());
    }
  }, [dispatch, newCategory, tag]);

  const onClickTag = (tag) => {
    setCategory(2);
    setTag(tag);
  };

  return (
    <>
      <Tabs
        style={{ marginBottom: 15 }}
        value={newCategory}
        aria-label="basic tabs example"
      >
        <Tab label="Новые" onClick={() => setCategory(0)} />
        <Tab label="Популярные" onClick={() => setCategory(1)} />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item className={styles.posts}>
          {(isPostLoading ? [...Array(5)] : posts.items).map((obj, index) =>
            isPostLoading ? (
              <Post key={index} isLoading={true} />
            ) : (
              <Post
                key={index}
                onClickTag={onClickTag}
                _id={obj._id}
                title={obj.title}
                imageUrl={
                  obj.imageUrl
                    ? `https://blogodintsov.onrender.com${obj.imageUrl}`
                    : ""
                }
                user={obj.user}
                createdAt={moment(obj.createdAt).format("DD-MMMM-YYYY-h-m-A")}
                viewsCount={obj.viewsCount}
                commentsCount={obj.comments.length}
                // isLoading={true}
                tags={obj.tags}
                likes={obj.likes.length}
                arrLikes={obj.likes}
                isFullPost={false}
                isEditable={userData?._id === obj.user._id}
              />
            )
          )}
        </Grid>
        <Grid xs={4} item className={styles.sides}>
          <TagsBlock
            items={tags.items}
            isLoading={isTagsLoading}
            onClick={onClickTag}
          />
          <CommentsBlock
            items={lastComments.items}
            isLoading={isLastCommentsLoading}
          />
        </Grid>
      </Grid>
    </>
  );
};
