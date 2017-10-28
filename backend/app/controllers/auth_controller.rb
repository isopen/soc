require 'bcrypt'

class AuthController < ApplicationController
  def login
    render :json => {:login => params[:login], :encrypted_password => password}
  end
  def reg
    encrypted_password = BCrypt::Password.create(params[:password]);
    token = SecureRandom.urlsafe_base64(61, false)
    User.new(login: params[:login], encrypted_password: encrypted_password, token: token)
        .save(validate: false)
    render :json => {:login => params[:login], :token => token}
  end
end
