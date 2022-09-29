import React from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

import styles from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchDislikePost,
  fetchLikePost,
  fetchLikesOnPost,
  fetchRemovePost,
} from "../../redux/slices/posts";
import { Fab } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import { selectIsAuth } from "../../redux/slices/auth";

export const Post = ({
  _id,
  onClickTag,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  likes,
  isLike,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const isAuth = useSelector(selectIsAuth);

  const onClickRemove = () => {
    dispatch(fetchRemovePost(_id));
  };

  const onClickLike = () => {
    dispatch(fetchLikePost(_id));
  };

  const onClickDislike = () => {
    dispatch(fetchDislikePost(_id));
  };

  return (
    <div className={clsx(styles.root, { [styles.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={styles.editButtons}>
          <Link to={`/posts/${_id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && isFullPost ? (
        <img
          className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
          src={imageUrl}
          alt={title}
        />
      ) : (
        <Link to={`/posts/${_id}`}>
          <img
            className={clsx(styles.image, { [styles.imageFull]: isFullPost })}
            src={imageUrl}
            alt={title}
          />
        </Link>
      )}
      <div className={styles.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={styles.indention}>
          <h2
            className={clsx(styles.title, { [styles.titleFull]: isFullPost })}
          >
            {isFullPost ? title : <Link to={`/posts/${_id}`}>{title}</Link>}
          </h2>
          <ul className={styles.tags}>
            {tags.map((name) => (
              <li
                key={name}
                onClick={() => onClickTag(name)}
                style={isFullPost ? { cursor: "text" } : { cursor: "pointer" }}
              >
                #{name}
              </li>
            ))}
          </ul>
          {children && <div className={styles.content}>{children}</div>}

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <ul className={styles.postDetails}>
              <li>
                <EyeIcon />
                <span>{viewsCount}</span>
              </li>
              <li>
                <CommentIcon />
                <span>{commentsCount}</span>
              </li>
              <li>
                <FavoriteBorder />
                <span>{likes}</span>
              </li>
            </ul>
            {isFullPost ? (
              isLike ? (
                <Fab aria-label="like" onClick={onClickDislike}>
                  <FavoriteIcon style={{ color: "red" }} />
                </Fab>
              ) : (
                <Fab
                  aria-label="like"
                  onClick={onClickLike}
                  disabled={isAuth ? false : true}
                >
                  <FavoriteIcon style={{ color: "white" }} />
                </Fab>
              )
            ) : (
              <div> </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
