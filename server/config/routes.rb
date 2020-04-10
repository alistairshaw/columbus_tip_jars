Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/register"
      post "auth/login"
      get "auth/me"
    end
  end
end
