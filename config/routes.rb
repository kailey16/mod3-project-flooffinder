Rails.application.routes.draw do

  resources :users, except: [:new, :edit]

  resources :savepets, only: [:index, :create, :destroy]

  resources :pets, only: [:index, :show]

  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  post '/savepets/:id' => 'savepets#destroy'


end
