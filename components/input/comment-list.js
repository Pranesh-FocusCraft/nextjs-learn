import classes from './comment-list.module.css'

function CommentList({ data }) {
  return (
    <ul className={classes.comments}>
      {data.map(({ _id, name, comment }) => (
        <li id={_id}>
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
