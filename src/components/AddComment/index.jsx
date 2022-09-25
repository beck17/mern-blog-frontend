import React, { useState } from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import axios from "../../axios/axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsAuth } from "../../redux/slices/auth";

export const Index = ({ imageUrl, postId }) => {
  const isAuth = useSelector(selectIsAuth);

  const navigate = useNavigate();
  const [comment, setComment] = useState("");

  const onSubmit = async () => {
    try {
      const fields = {
        comment,
      };

      await axios.post(`/comments/${postId}`, fields);

      navigate(`/posts/${postId}`);
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
          <TextField
            label="Написать комментарий"
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
        </div>
      </div>
    </>
  );
};
