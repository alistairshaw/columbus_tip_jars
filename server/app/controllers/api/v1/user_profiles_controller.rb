module Api
  module V1
    class UserProfilesController < ApiController
      skip_before_action :authenticate, only: %i[index show]
      before_action :verify_user_profile_ownership, only: %i[update]

      def index
        render json: {resources: UserProfile.all}
      end

      def show
        user_profile = UserProfile.find_by_user_id(params[:id])
        if user_profile
          render json: {resource: profile_with_avatar(user_profile)}
        else
          render json: {errors: ['404 not found'], resource: nil}, status: :not_found
        end
      end

      def create
        result = ProfileService.create_user_profile(user_profile_params)

        if result.success?
          render json: {errors: [], resource: profile_with_avatar(result.user_profile)}, status: :created
        else
          render json: {errors: result.user_profile.errors.full_messages, resource: nil}, status: :unprocessable_entity
        end
      end

      def update
        result = ProfileService.update_user_profile(params[:id], user_profile_params)

        if result.success?
          render json: {errors: [], resource: profile_with_avatar(result.user_profile)}, status: :ok
        else
          render json: {errors: Array.wrap(result&.user_profile&.errors&.full_messages), resource: nil}, status: :unprocessable_entity
        end
      end

      private

      def verify_user_profile_ownership
        user_profile = UserProfile.find_by(id: params[:id], user_id: current_user.id)

        render json: {}, status: :unauthorized unless user_profile
      end

      def profile_with_avatar(user_profile)
        if user_profile && user_profile.avatar.attached?
          return user_profile.as_json.merge({avatar: url_for(user_profile.avatar)})
        end
        user_profile
      end

      def user_profile_params
        params.permit(
            :user_name,
            :avatar,
            :business_name,
            :specialty,
            :tip_url,
            :video_url,
            :blurb,
            :industry,
            :nickname
        ).to_h.deep_symbolize_keys.merge(user_id: current_user.id)
      end
    end
  end
end
