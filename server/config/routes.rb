Rails.application.routes.draw do
  resources :api_tokens
  resources :users, except: [:update, :destroy]
  resources :gloats
  resources :sessions, only: [:create, :destroy]
end
