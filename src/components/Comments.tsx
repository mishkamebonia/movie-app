import "../scss/comments.scss";
import "../scss/images.scss";
import { useAuthContext } from "../providers/auth";
import { useState } from "react";
// import { collection, docs, doc } from "firebase/firestore";
// import { db } from "../config/firebase";

const Comments = () => {
  const { user } = useAuthContext();
  const [allComments, setAllComments] = useState([]);
  const [createComment, setCreateComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setAllComments([createComment, ...allComments]);
      setCreateComment("");
    } catch (err) {
      console.error(err);
    }
  };

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
      <div className="all-comments">
        {allComments.map((comment, index) => (
          <p key={index}>{comment}</p>
        ))}
      </div>
    </div>
  );
};

export default Comments;
