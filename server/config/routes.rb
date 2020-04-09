Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post 'auth/register'
    end
  end
end
