import classes from './comment-list.module.css'

function CommentList({ data }) {
  return (
    <ul className={classes.comments}>
      {data.map(({ time, name, comment }) => (
        <li id={time}>
          <p>{comment}</p>
          <div>
            By <address>{name}</address>
          </div>
        </li>
      ))}
    </ul>
  )
}

export default CommentList
