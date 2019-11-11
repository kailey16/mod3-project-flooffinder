Rails.application.routes.draw do

  resources :users, except: [:new, :edit]

  resources :savepets, except: [:index, :new, :edit, :update]

  resources :pets, only: [:index, :show]

  # get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'


end
