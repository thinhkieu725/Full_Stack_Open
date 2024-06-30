import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1
  }

  const notiToShow = useSelector(state => state.notification)

  return (
    <div style={style}>
      {notiToShow}
    </div>
  )
}

export default Notification