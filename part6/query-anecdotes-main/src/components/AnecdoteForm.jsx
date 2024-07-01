import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNotificationDispatch } from "./NotificationContext"
import { createAnecdote } from "../requests"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes'] })
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `new anecdote created: ${content}`
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    },
    onError: () => {
      notificationDispatch({
        type: 'SET_NOTIFICATION',
        payload: `too short anecdote, must have length 5 or more`
      })
      setTimeout(() => {
        notificationDispatch({ type: 'CLEAR_NOTIFICATION' })
      }, 5000)
    }
  })

  const notificationDispatch = useNotificationDispatch()

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    newAnecdoteMutation.mutate(content)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
