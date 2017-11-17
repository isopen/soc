class ChatChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat'
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def send_message(_data)
    ActionCable.server.broadcast(
        'chat',
        sent_by: 'Paul',
        message: data['message']
    )
  end
end
