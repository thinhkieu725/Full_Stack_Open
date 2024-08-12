const Notification = ({ noti }: { noti: string }): JSX.Element => {
  return (
    <div style={{ color: 'red' }}>
      {noti}
    </div>
  );
};

export default Notification;