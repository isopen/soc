class ApplicationController < ActionController::API
  before_action :require_login
  private def require_login
    unless logged_in?
      data = {:login => "dsfkf", :password => "fsdfds"}
      render :json => data
    end
  end
  def logged_in?
    current_user != nil
  end
end
