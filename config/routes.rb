Rails.application.routes.draw do

  resources :users

  resources :savepets

  resources :pets

  get '/login' => 'sessions#new'
  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'


end
