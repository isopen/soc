module ApplicationCable
  class Connection < ActionCable::Connection::Base
    identified_by :current_user
    def connect
      self.current_user = find_verified_user
    end
    private def find_verified_user
      opt = { guid: request.params[:guid], token: request.params[:token] }
      response = RestClient.post (Backend::Application.config.host + '/login'), opt
      response = JSON.parse(response)
      if response['success']
        response['id']['$oid']
      else
        reject_unauthorized_connection
      end
    end
  end
end
