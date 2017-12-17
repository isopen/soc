class PageChannel < ApplicationCable::Channel
  def subscribed
    stream_from params[:room]
  end

  def unsubscribed
  end

  def send_message(data)
    ActionCable.server.broadcast(
        data[:user_id],
        type: 'send_message',
        message: data['message']
    )
  end

  def send_message_to_wall(data)
    ActionCable.server.broadcast(
        data[:user_id],
        type: 'update_wall',
        message: data['message']
    )
  end
end
