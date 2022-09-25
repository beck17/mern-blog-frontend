import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";

import { Post } from "../components";
import { Index } from "../components";
import { CommentsBlock } from "../components";
import axios from "../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { fetchCommentsOnPost } from "../redux/slices/comments";

export const FullPost = () => {
  const dispatch = useDispatch();

  const { comments } = useSelector((state) => state.comment);
  const isCommentsLoading = comments.status === "loading";

  const [data, setData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
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
    dispatch(fetchCommentsOnPost(id));
  }, [id, dispatch]);

  if (isLoading) {
    return <Post isLoading={isLoading} isFullPost />;
  }

  return (
    <>
      <Post
        id={data._id}
        title={data.title}
        imageUrl={data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""}
        user={data.user}
        createdAt={data.createdAt}
        viewsCount={data.viewsCount}
        commentsCount={data.comments.length}
        tags={data.tags}
        isFullPost
      >
        <ReactMarkdown children={data.text} />
      </Post>
      <CommentsBlock items={comments.items} isLoading={isCommentsLoading}>
        <Index
          postId={data._id}
          imageUrl={
            data.imageUrl ? `http://localhost:4444${data.imageUrl}` : ""
          }
        />
      </CommentsBlock>
    </>
  );
};
