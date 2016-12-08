Rails.application.routes.draw do
  resources :api_tokens
  resources :users
  resources :gloats
  resources :sessions, only: [:create, :destroy]
end
