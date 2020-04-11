Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/register"
      post "auth/login"
      get "auth/me"

      resources :business_profiles, only: %i[index show create update] do
        resources :donation_methods, only: %i[index show create update]
      end

      resources :user_profiles, only: %i[index show create update] do
        resources :donation_methods, only: %i[index show create update]
      end
    end
  end
end
