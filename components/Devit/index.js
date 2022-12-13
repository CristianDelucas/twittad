import Avatar from "../Avatar"

export default function Devit({
  avatar,
  createAt,
  userName,
  content,
  id,
  userId,
}) {
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
            <date>{createAt}</date>
          </header>

          <p>{content}</p>
        </section>
      </article>
      <style jsx>
        {`
          article {
            border-bottom: 2px solid #eee;
            display: flex;

            padding: 10px 15px;
          }
          div {
            padding-right: 10px;
          }
          p {
            line-height: 1.3125;
            margin: 0;
          }
          date {
            color: #555;
            font-size: 14px;
          }
        `}
      </style>
    </>
  )
}
