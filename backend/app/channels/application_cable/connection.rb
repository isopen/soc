module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      self.current_user = find_verified_user
    end
    private def find_verified_user
      guid = request.params[:guid]
      token = request.params[:token]
      opt = { guid: guid, token: token }
      response = RestClient.post (Backend::Application.config.host + '/login'), opt
      response = JSON.parse(response)
      if response['success']
        User.where(_id: BSON::ObjectId(guid)).includes(:tokens).each do |u|
          u.tokens.each do |t|
            t.update(active: true) if t['token'] == token
          end
        end
        response['id']['$oid']
      else
        reject_unauthorized_connection
      end
    end
  end
end
