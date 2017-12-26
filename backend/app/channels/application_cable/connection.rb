module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      self.current_user = find_verified_user
    end
    def activation_token(guid, token, active)
      User.where(_id: BSON::ObjectId(guid)).includes(:tokens).each do |u|
        u.tokens.each do |t|
          t.update(active: active) if t['token'] == token
        end
      end
    end
    private def find_verified_user
      guid = request.params[:guid]
      token = request.params[:token]
      opt = { guid: guid, token: token }
      response = RestClient.post (Backend::Application.config.host + '/login'), opt
      response = JSON.parse(response)
      if response['success']
        activation_token(guid, token, true)
        response['id']['$oid']
      else
        reject_unauthorized_connection
      end
    end
    def disconnect
      guid = request.params[:guid]
      token = request.params[:token]
      activation_token(guid, token, false)
    end
  end
end
