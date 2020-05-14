# == Route Map
#
#                                   Prefix Verb  URI Pattern                                                                              Controller#Action
#                     api_v1_auth_register POST  /api/v1/auth/register(.:format)                                                          api/v1/auth#register
#                        api_v1_auth_login POST  /api/v1/auth/login(.:format)                                                             api/v1/auth#login
#                           api_v1_auth_me GET   /api/v1/auth/me(.:format)                                                                api/v1/auth#me
# api_v1_business_profile_donation_methods GET   /api/v1/business_profiles/:business_profile_id/donation_methods(.:format)                api/v1/donation_methods#index
#                                          POST  /api/v1/business_profiles/:business_profile_id/donation_methods(.:format)                api/v1/donation_methods#create
#  api_v1_business_profile_donation_method GET   /api/v1/business_profiles/:business_profile_id/donation_methods/:id(.:format)            api/v1/donation_methods#show
#                                          PATCH /api/v1/business_profiles/:business_profile_id/donation_methods/:id(.:format)            api/v1/donation_methods#update
#                                          PUT   /api/v1/business_profiles/:business_profile_id/donation_methods/:id(.:format)            api/v1/donation_methods#update
#                 api_v1_business_profiles GET   /api/v1/business_profiles(.:format)                                                      api/v1/business_profiles#index
#                                          POST  /api/v1/business_profiles(.:format)                                                      api/v1/business_profiles#create
#                  api_v1_business_profile GET   /api/v1/business_profiles/:id(.:format)                                                  api/v1/business_profiles#show
#                                          PATCH /api/v1/business_profiles/:id(.:format)                                                  api/v1/business_profiles#update
#                                          PUT   /api/v1/business_profiles/:id(.:format)                                                  api/v1/business_profiles#update
#     api_v1_user_profile_donation_methods GET   /api/v1/user_profiles/:user_profile_id/donation_methods(.:format)                        api/v1/donation_methods#index
#                                          POST  /api/v1/user_profiles/:user_profile_id/donation_methods(.:format)                        api/v1/donation_methods#create
#      api_v1_user_profile_donation_method GET   /api/v1/user_profiles/:user_profile_id/donation_methods/:id(.:format)                    api/v1/donation_methods#show
#                                          PATCH /api/v1/user_profiles/:user_profile_id/donation_methods/:id(.:format)                    api/v1/donation_methods#update
#                                          PUT   /api/v1/user_profiles/:user_profile_id/donation_methods/:id(.:format)                    api/v1/donation_methods#update
#                     api_v1_user_profiles GET   /api/v1/user_profiles(.:format)                                                          api/v1/user_profiles#index
#                                          POST  /api/v1/user_profiles(.:format)                                                          api/v1/user_profiles#create
#                      api_v1_user_profile GET   /api/v1/user_profiles/:id(.:format)                                                      api/v1/user_profiles#show
#                                          PATCH /api/v1/user_profiles/:id(.:format)                                                      api/v1/user_profiles#update
#                                          PUT   /api/v1/user_profiles/:id(.:format)                                                      api/v1/user_profiles#update
#                       rails_service_blob GET   /rails/active_storage/blobs/:signed_id/*filename(.:format)                               active_storage/blobs#show
#                rails_blob_representation GET   /rails/active_storage/representations/:signed_blob_id/:variation_key/*filename(.:format) active_storage/representations#show
#                       rails_disk_service GET   /rails/active_storage/disk/:encoded_key/*filename(.:format)                              active_storage/disk#show
#                update_rails_disk_service PUT   /rails/active_storage/disk/:encoded_token(.:format)                                      active_storage/disk#update
#                     rails_direct_uploads POST  /rails/active_storage/direct_uploads(.:format)                                           active_storage/direct_uploads#create

Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      post "auth/register"
      post "auth/login"
      get "auth/me"

      resources :business_profiles, only: %i[index show create update] do
        resources :donation_methods, only: %i[index show create update]
      end

      resources :user_profiles, only: %i[index show create update destroy] do
        resources :donation_methods, only: %i[index show create update]
      end
    end
  end
end
