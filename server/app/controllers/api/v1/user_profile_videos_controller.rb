module Api
  module V1
    class UserProfileVideosController < ApiController
      before_action :set_profile
      # before_action :verify_profile_ownership, only: %i[create update]

      skip_before_action :authenticate, only: %i[index show]

      def index
        if params[:filter].present?
          @videos = UserProfileVideo.general_filter(params[:filter])
        else
          @videos = UserProfileVideo.all
        end
        render json: { resources: @videos }
      end

      def show
        @user_profile_videos = UserProfileVideo.find_by(user_profile_id: params[:id])
        if user_profile
          render json: { resource: @user_profile_videos.all }
        else
          render json: { errors: ["404 not found"], resource: nil }, status: :not_found
        end
      end

      def create
        result = @profile.user_profile_videos.new(user_profile_video_params)

        if result.save
          render json: { errors: [], resource: result }, status: :created
        else
          render json: { errors: result.errors.full_messages, resource: nil }, status: :unprocessable_entity
        end
      end

    #   def update
    #     result = ProfileService.update_user_profile(params[:id], user_profile_params)

    #     if result.success?
    #       render json: { errors: [], resource: profile_with_avatar(result.user_profile) }, status: :ok
    #     else
    #       render json: { errors: Array.wrap(result.user_profile&.errors&.full_messages), resource: nil }, status: :unprocessable_entity
    #     end
    #   end

    #   def destroy
    #     user_profile = UserProfile.find_by(user_id: params[:id])
    #     if user_profile
    #       user_profile.destroy
    #       render json: { resource: nil }
    #     else
    #       render json: { errors: ["404 not found"], resource: nil }, status: :not_found
    #     end
    #   end

      def set_profile
        if params[:user_profile_id]
          @profile = UserProfile.find(params[:user_profile_id]) if params[:user_profile_id]
        elsif params[:business_profile_id]
          @profile = BusinessProfile.find(params[:business_profile_id])
        else
          render json: {}, status: :unprocessable_entity
        end
      end

      def verify_profile_ownership
        user_profile = UserProfile.find_by(id: params[:user_profile_id], user_id: current_user.id)
        render json: {}, status: :unauthorized unless user_profile
      end

    #   def profile_with_avatar(user_profile)
    #     if user_profile&.avatar&.attached?
    #       return user_profile.as_json.merge({ avatar: url_for(user_profile.avatar) })
    #     end
    #     user_profile
    #   end

      def user_profile_video_params
        params.permit(:user_profile_video, :user_profile_id)
        
      end
    end
  end
end
