import { useRef, useState } from 'react'
import classes from './new-comment.module.css'

function NewComment({ onAddComment }) {
  const [isInvalid, setIsInvalid] = useState(false)

  const emailRef = useRef()
  const nameRef = useRef()
  const commentRef = useRef()

  function sendCommentHandler() {
    const email = emailRef.current.value
    const name = nameRef.current.value
    const comment = commentRef.current.value

    if (
      !email?.trim() ||
      !email.includes('@') ||
      !name?.trim() ||
      !comment?.trim()
    )
      return setIsInvalid(true)

    onAddComment({ email, name, comment })
    emailRef.current.value = ''
    nameRef.current.value = ''
    commentRef.current.value = ''
    setIsInvalid(false)
  }

  return (
    <form className={classes.form}>
      <div className={classes.row}>
        <div className={classes.control}>
          <label htmlFor='email'>Your email</label>
          <input type='email' id='email' ref={emailRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor='name'>Your name</label>
          <input type='text' id='name' ref={nameRef} />
        </div>
      </div>
      <div className={classes.control}>
        <label htmlFor='comment'>Your comment</label>
        <textarea id='comment' rows='5' ref={commentRef}></textarea>
      </div>
      {isInvalid && <p>Please enter a valid email address and comment!</p>}
      <button onClick={sendCommentHandler}>Submit</button>
    </form>
  )
}

export default NewComment
