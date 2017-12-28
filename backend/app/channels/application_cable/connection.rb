module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user

    # user joined the socket
    def connect
      self.current_user = find_verified_user
    end

    # user has disconnected from the socket
    def disconnect
      guid = request.params[:guid]
      token = request.params[:token]
      activation_token(guid, token, false)
    end

    # activation|deactivation of the session
    # string guid
    # string token
    # bool active
    private def activation_token(guid, token, active)
      User.where(_id: BSON::ObjectId(guid)).includes(:tokens).each do |u|
        u.tokens.each do |t|
          if t['token'] == token
            if active
              t.update(active: active)
            else
              t.update(active: active, completion_time: Time.now)
            end
          end
        end
      end
    end

    # authorization of the user in the socket
    private def find_verified_user
      guid = request.params[:guid]
      token = request.params[:token]
      opt = { guid: guid, token: token }
      # TODO:: add remote_ip
      headers = {
        :'User-Agent' => request.user_agent
      }
      response = RestClient.post Backend::Application.config.host + '/login', opt, headers
      response = JSON.parse(response)
      if response['success']
        activation_token(guid, token, true)
        response['id']['$oid']
      else
        reject_unauthorized_connection
      end
    end
  end
end
