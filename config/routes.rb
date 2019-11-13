Rails.application.routes.draw do

  resources :users, only: [:index, :show,:create]

  resources :savepets, only: [:index, :create]

  resources :pets, only: [:index, :show]

  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  post '/savepets/:id' => 'savepets#destroy'

end
