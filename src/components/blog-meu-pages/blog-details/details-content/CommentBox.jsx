

const CommentBox = () => {
  // Define an array of comment objects
  const comments = [
    {
      id: 1,
      userName: "Oscar Cafeo",
      userThumbSrc: "/images/resource/avatar-1.jpg",
      title: "Beautiful courses",
      text: "Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement tantaneously eel valiantly petted this along across highhandedly much.",
    },
    {
      id: 2,
      userName: "Alex Morgan",
      userThumbSrc: "/images/resource/avatar-2.jpg",
      title: "Beautiful courses",
      text: "Far much that one rank beheld bluebird after outside ignobly allegedly more when oh arrogantly vehement tantaneously eel valiantly petted this along across highhandedly much.",
    },
    // Add more comments as needed
  ];

  return (
    <>
      {" "}
      <h4>Comment</h4>
      {comments.map((comment) => (
        <div className="comment-box" key={comment.id}>
          {/* Comment */}
          <div className="comment">
            <div className="user-thumb">
              <img
               
                src={comment.userThumbSrc}
                alt="resource"
              />
            </div>
            <div className="comment-info">
              <div className="user-name">{comment.userName}</div>
              <div className="title">{comment.title}</div>
            </div>
            <div className="text">{comment.text}</div>
          </div>
        </div>
      ))}
    </>
  );
};

export default CommentBox;
