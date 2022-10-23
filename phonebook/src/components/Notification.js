import '../css/Notification.css';

const Notification = ({ msg, style }) => {
  if (msg === null) {
    return null
  }

  return (
    <div className={style}>
      {msg}
    </div>
  )
}

export { Notification };