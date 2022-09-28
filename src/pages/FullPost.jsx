import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsOnPost } from "../redux/slices/comments";
import moment from "moment";
import { fetchLikesOnPost } from "../redux/slices/posts";

export const FullPost = () => {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comment);
  const { likes } = useSelector((state) => state.posts);
  const isCommentsLoading = comments.status === "loading";

  const [data, setData] = useState({});
  const [likesOnPost, setLikesOnPost] = useState({});
  const [user, setUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    dispatch(fetchLikesOnPost(id));
    axios
      .get(`/likes/${id}`)
      .then((res) => {
        setLikesOnPost(res.data);
        // setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
  }, [dispatch, id]);

  useEffect(() => {
    setIsLoading(true);
    dispatch(fetchCommentsOnPost(id));
    axios
      .get(`/posts/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении статьи");
      });
    setIsLoading(true);
  }, [id, dispatch]);

  useEffect(() => {
    axios
      .get(`auth/me`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователя");
      });
  }, []);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        _id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={moment(data.createdAt).format("DD-MMMM-YYYY-h-m-A")}
        viewsCount={data.viewsCount}
        commentsCount={comments.items.length}
        likes={likes.count.length}
        isLike={likes.isLike}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading}>
        <Index
          postId={data._id}
          imageUrl={user.avatarUrl ? user.avatarUrl : ""}
        />
      </CommentsBlock>
    </>
  );
};
