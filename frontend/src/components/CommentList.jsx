import React from "react";
import Comment from "./Comment";

const comments = [
  {
    name: "정상준",
    comment: "내년이면 25살이네,,,",
  },
  {
    name: "김단아",
    comment: "모두 수고하셨어요",
  },
  {
    name: "김지영",
    comment: "드디어 수료다",
  },
];

function CommentList(props) {
  return (
    <div>
      {comments.map((comment) => {
        return <Comment name={comment.name} comment={comment.comment} />;
      })}
    </div>
  );
}

export default CommentList;
