class UsersController < ApplicationController
  def index
    users = User.all 
    render json: users
  end

  def show

  end 

  def create
    newUser = User.create(name: params["name"], phone_number: params["phone_number"], email: params["email"])
    render json: newUser
  end
  
  def

  def update
    
	end

	def destroy

	end

end
