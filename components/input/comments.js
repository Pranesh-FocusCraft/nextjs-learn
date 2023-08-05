import { useState } from 'react'

import CommentList from './comment-list'
import NewComment from './new-comment'
import classes from './comments.module.css'

function Comments({ eventId }) {
  const [showComments, setShowComments] = useState(false)
  const [data, setData] = useState([])

  function toggleCommentsHandler() {
    setShowComments((prev) => !prev)
    if (showComments) return
    fetch('/api/comments/' + eventId)
      .then((a) => a.json())
      .then((a) => setData(a))
  }

  function addCommentHandler(commentData) {
    fetch('/api/comments/' + eventId, {
      method: 'POST',
      body: JSON.stringify(commentData),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((a) => a.json())
      .then((a) => console.log(a))
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList data={data} />}
    </section>
  )
}

export default Comments
