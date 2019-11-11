class SessionsController < ApplicationController

  def new

  end

  def create
    user = User.find_by(name: params[:name])
    # user = user.try(:authenticate, params[:user][:password])
    session[:user_id] = user.id
    render json: user
  end
 
  def destroy
    session.delete :user_id

    redirect_to '/'
  end 
  
end