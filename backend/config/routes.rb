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
      get 'logged_in' => 'auth#logged_in'
      resources :ssnovels, only: %i[index create show]
      resources :ssnovel_bodies, only: %i[create]
      get "user_ssnovels" => "ssnovels#user_ssnovels"
      get "user_ssnovel_bodies" => "ssnovel_bodies#user_ssnovel_bodies"
    end
  end
end