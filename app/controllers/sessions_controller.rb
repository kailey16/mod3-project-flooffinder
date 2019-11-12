class SessionsController < ApplicationController

  def new

  end

  def create
    user = User.find_by(name: params[:name])
    # user = user.try(:authenticate, params[:user][:password])
    session[:user_id] = user.id
    render json: user.to_json({
      except: [:created_at, :updated_at],
      :include => {
        :pets => {
          except: [:created_at, :updated_at]
        },
    :savepets => {
      except: [:created_at, :updated_at]
    }
    }
  }
    )
  end
 
  def destroy
    session.delete :user_id

    redirect_to '/'
  end 
  
end