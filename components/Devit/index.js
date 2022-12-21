import useTimeAgo from "../../hooks/useTimeAgo"
import useDateTimeFormat from "../../hooks/useDateTimeFormat"
import Avatar from "../Avatar"

export default function Devit({
  avatar,
  createdAt,
  img,
  userName,
  content,
  id,
  userId,
}) {
  const timeago = useTimeAgo(createdAt)
  const createdAtFormated = useDateTimeFormat(createdAt)
  return (
    <>
      <article>
        <div>
          <Avatar alt={userName} src={avatar} text={userName} />
        </div>
        <section>
          <header>
            <strong>{userName}</strong>
            <span> . </span>
            <time title={createdAtFormated}>{timeago}</time>
          </header>

          <p>{content}</p>
          {img && <img src={img} />}
        </section>
      </article>
      <style jsx>
        {`
          article {
            border-bottom: 2px solid #eee;
            display: flex;

            padding: 10px 15px;
          }

          img {
            margin-top: 10px;
            border-radius: 10px;
            max-height: 250px;
            height: auto;
            width: 100%;
          }

          div {
            padding-right: 10px;
          }
          p {
            line-height: 1.3125;
            margin: 0;
          }
          time {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
