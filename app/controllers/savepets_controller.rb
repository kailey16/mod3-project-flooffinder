class SavepetsController < ApplicationController
  
  def show

  end

  def index
    render json: Savepets.all
  end

  def create
    newSavePet = Savepets.create(user_id: params["user_id"], pet_id: params["pet_id"])
    render json: newSavePet
  end

  def destroy
    savePet = SavePets.find(params["id"]).destroy
    render json: savePet
  end

end