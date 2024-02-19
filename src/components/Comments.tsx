import { useAuthContext } from "../providers/auth";
import "../scss/images.scss";
import "../scss/comments.scss";

const Comments = () => {
  const { user } = useAuthContext();

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(clicked);
  };

  return (
    <div className="commentsSection">
      <div className="create-comment">
        <div className="row">
          <img src={`${user?.photoURL}`} alt="" className="profile-img" />
          <h4>{user?.displayName}</h4>
        </div>
        <form action="" onSubmit={handleSubmit}>
          <input
            type="text"
            className="comment-input"
            placeholder="write comment"
          />
          <button className="button">Send</button>
        </form>
      </div>
      <div className="all-comments">
        <p>12312312</p>
        <p>12312312</p>
        <p>12312312</p>
      </div>
    </div>
  );
};

export default Comments;
