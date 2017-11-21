class PageChannel < ApplicationCable::Channel
  def subscribed
    stream_from 'chat'
  end

  def unsubscribed
  end

  def send_message(_data)
    ActionCable.server.broadcast(
        'chat',
        sent_by: 'Paul',
        message: data['message']
    )
  end
end
