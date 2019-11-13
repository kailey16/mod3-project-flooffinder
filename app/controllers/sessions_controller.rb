class SessionsController < ApplicationController

  def create
    user = User.find_by(name: params[:name])
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
    })
  end
  
end