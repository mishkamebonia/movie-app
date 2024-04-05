import "../scss/comments.scss";
import "../scss/images.scss";
import { useAuthContext } from "../providers/auth";
import { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../config/firebase";
import { create } from "@mui/material/styles/createTransitions";
const commnetsRef = collection(db, "MoviesComments");

type UserInfo = { id: string; name: string; image: string };
type Comment = {
  id: string;
  text: string;
  movieId: string;
  user: UserInfo;
};
const Comments = (props) => {
  const { movieId, seriesId } = props;

  const { user } = useAuthContext();
  const [allComments, setAllComments] = useState<Comment[]>([]);
  const [createComment, setCreateComment] = useState("");

  const getComments = useCallback(async () => {
    const commentsQuery = query(
      commnetsRef,
      where("movieId", "==", movieId || seriesId),
      orderBy("timestamp", "desc")
    );

    const comments: Comment[] = [];
    const response = await getDocs(commentsQuery);

    response.forEach(async (doc) => {
      const data = doc.data();

      comments.push({
        text: data.text,
        movieId: data.movieId,
        id: doc.id,
        user: {
          id: data.userId,
          name: data.userName,
          image: data.userImage,
        },
      });
    });

    setAllComments(comments);
    setCreateComment("");
  }, [movieId, seriesId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (createComment != "") {
      await addDoc(commnetsRef, {
        text: createComment,
        movieId: movieId || seriesId,
        userId: user?.uid,
        userName: user?.displayName,
        userImage: user?.photoURL,
        timestamp: serverTimestamp(),
      });
    }

    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);

  return (
    <div className="commentsSection">
      <h1>Comments</h1>
      <div className="create-comment">
        <form action="" onSubmit={handleSubmit}>
          <div className="row">
            <img src={`${user?.photoURL}`} alt="" className="profile-img" />
            <input
              type="text"
              className="input"
              placeholder="write comment"
              value={createComment}
              onChange={(e) => setCreateComment(e.target.value)}
            />
          </div>
          <button className="button">Send</button>
        </form>
      </div>
      {allComments.length !== 0 && (
        <div className="all-comments">
          {allComments.map((comment) => (
            <div className="comments" key={comment.id}>
              <div className="row">
                <img src={comment.user.image} alt="User Avatar" />
                <h4>{comment.user.name}</h4>
              </div>
              <p>{comment.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Comments;
