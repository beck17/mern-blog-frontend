import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios/axios";
import { useDispatch, useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";
import { fetchCommentsOnPost } from "../../redux/slices/comments";

export const Index = ({ imageUrl, postId }) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch = useDispatch();

  const [comment, setComment] = useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        comment,
      };

      await axios.post(`/comments/${postId}`, fields);
      setComment("");
      dispatch(fetchCommentsOnPost(postId));
    } catch (e) {
      console.warn(e);
      alert("Ошибка при создании комментария");
    }
  };

  return (
    <>
      <div className={styles.root}>
        <Avatar classes={{ root: styles.avatar }} src={imageUrl} />
        <div className={styles.form}>
          <form onSubmit={(e) => e.preventDefault()}>
            <TextField
              label="Написать комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              variant="outlined"
              maxRows={10}
              multiline
              fullWidth
              disabled={!isAuth}
            />
            <Button
              onClick={onSubmit}
              variant="contained"
              type="submit"
              disabled={!isAuth}
            >
              Отправить
            </Button>
          </form>
        </div>
      </div>
    </>
  );
};
