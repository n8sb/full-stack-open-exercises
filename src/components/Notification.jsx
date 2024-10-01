export const Notification = ({ message }) => {
  if (message === null) {
    return null;
  }

  return <div className={`message ${message.messageType}`}>{message.text}</div>;
};
