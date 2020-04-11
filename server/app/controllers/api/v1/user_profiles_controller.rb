module Api
  module V1
    class UserProfilesController < ApiController
      skip_before_action :authenticate, only: %i[index show]

      def index; end

      def show; end

      def create; end

      def update; end

      private

      def user_profile_params
        params.require(:user_profile).permit(:user_name, :nickname, :photo_url).to_h.deep_symbolize_keys
      end
    end
  end
end
