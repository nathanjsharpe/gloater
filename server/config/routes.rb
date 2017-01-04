Rails.application.routes.draw do
  scope '/api' do
    resources :users, except: [:update, :destroy] do
      resource :stalk, only: [:create, :destroy]
      member do
        resources :gloats, only: [:index], controller: 'users/gloats', as: :user_gloats
      end
    end
    resources :gloats do
      resource :admire, only: [:create, :destroy]
    end
    resource :api_token, only: [:create, :destroy]
  end
end
