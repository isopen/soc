class AuthController < ApplicationController
  def login
    user = User.new(login: params[:login], password: params[:login])
    user.save
    data = {:login => params[:login], :password => params[:login]}
    render :json => data
  end
  def reg
    user = User.new(login: params[:login], password: params[:login])
    user.save
    render :json => data
  end
end
