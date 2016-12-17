Rails.application.routes.draw do
  resources :users, except: [:update, :destroy] do
    resource :stalk, only: [:create, :destroy]
  end
  resources :admires, path: 'admired_gloats', only: [:index]
  resources :stalks, path: 'stalked_users', only: [:index]
  resources :gloats do
    resource :admire, only: [:create, :destroy]
  end
  resource :api_token, only: [:create, :destroy]
end
