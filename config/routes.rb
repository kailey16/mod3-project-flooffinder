Rails.application.routes.draw do

  resources :users, except: [:index, :new, :edit]

  resources :savepets, except: [:index, :new, :edit, :update]

  # resources :pets
  get '/pets' => 'pets#index'

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'


end
