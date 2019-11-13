class PetsController < ApplicationController

  def index
    pets = Pet.all.where(species: "Dog")
    render json: pets.to_json({
      except: [:created_at, :updated_at],
      :include => {
        :savepets => {
          except: [:created_at, :updated_at]
        }
      }
    })
  end

  def show
    pet = Pet.find(params[:id])
    render json: pet.to_json({
      except: [:created_at, :updated_at],
      :include => {
        :savepets => {
          except: [:created_at, :updated_at]
        }
      }
    })
  end

end
