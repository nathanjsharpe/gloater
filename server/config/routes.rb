Rails.application.routes.draw do
  resources :api_tokens
  resources :users, except: [:update, :destroy]
  resources :admires, path: 'admired_gloats', only: [:index]
  resources :gloats do
    resource :admire, only: [:create, :destroy]
  end
  resources :sessions, only: [:create, :destroy]
end
