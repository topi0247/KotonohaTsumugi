Rails.application.routes.draw do
  root 'tasks#index'

  devise_for :users,
      defaults: { format: :json },
      path: '',
      path_names: {
        sign_in: 'login',
        sign_out: 'logout',
        registration: 'signup'
      },
      controllers: {
        sessions: 'api/v1/users/sessions',
        registrations: 'api/v1/users/registrations'
      }

  namespace :api do
    namespace :v1 do
      namespace :users do
        get 'current_user/index'
      end
      resources :ssnovels, only: [:index, :create, :show]
      resources :ssnovel_bodies, only: [:create]
    end
  end
end