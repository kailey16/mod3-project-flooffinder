class PetsController < ApplicationController

  def index
    dogs = Pet.all.where(species: "Dog")
    render json: dogs
  end

  def show
    pet = Pet.find(params[:id])
    render json: pet
  end

end
