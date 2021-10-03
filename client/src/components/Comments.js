import React from 'react';
import { Link } from 'react-router-dom';
import withContentContainer from './HOC/withContentContainer';
import styles from '../styles/Comments.module.scss';

function Comments({ commentsList, totalNumComments }) {
  return (
    <div>
      <p>
        Displaying {commentsList.length} of {totalNumComments} comments.
      </p>
      <div className={styles.comments}>
        {commentsList.map((comment, idx) => {
          return <Comment key={idx} comment={comment} />;
        })}
      </div>
    </div>
  );
}

function Comment({ comment }) {
  const { author, timeStamp, body } = comment;
  return (
    <div className={styles.comment}>
      <div className={styles.author}>
        <Link className={styles.authorProfileLink} to={author.profilePath}>
          <p>{author.username}</p>
          <img
            className={styles.authorAvatar}
            src={author.avatar}
            alt={`avatar for user '${author.username}'`}
          />
        </Link>
      </div>
      <div className={styles.bodyContainer}>
        <p className={styles.timeStamp}>{timeStamp}</p>
        <p dangerouslySetInnerHTML={{ __html: `${body}` }} />
      </div>
    </div>
  );
}

Comments.displayName = 'Comments';
export default withContentContainer(Comments);
