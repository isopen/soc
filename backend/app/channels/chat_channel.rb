class ChatChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "some_channel"
    stream_from "chat"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
  
  def speek(data)
    ActionCable.server.broadcast(
      "chat",
      sent_by: 'Paul',
      body: 'This is a cool chat app.'
    )
  end
end
