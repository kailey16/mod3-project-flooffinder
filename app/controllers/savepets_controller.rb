class SavepetsController < ApplicationController
  
  def show

  end

  def index
    render json: Savepet.all
  end

  def create
    newSavePet = Savepet.create(user_id: params["user_id"], pet_id: params["pet_id"])
    render json: newSavePet
  end

  def destroy
    savePet = SavePet.find(params["id"]).destroy
    render json: savePet
  end

end