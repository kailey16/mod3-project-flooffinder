Rails.application.routes.draw do

  resources :users, except: [:new, :edit]

  resources :savepets, except: [:new, :edit, :update, :destroy, :show]

  resources :pets, only: [:index, :show, :create, :delete]

  post '/login' => 'sessions#create'
  post '/logout' => 'sessions#destroy'
  post '/savepets/:id' => 'savepets#destroy'


end
