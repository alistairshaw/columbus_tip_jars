module Api
  module V1
    class DonationMethodsController < ApiController
      before_action :validate_profile_id
      skip_before_action :authenticate, only: %i[index show]

      def index; end

      def show; end

      def create; end

      def update; end

      private

      def validate_profile_id
        render json: {}, status: :unauthorized if profile_type.blank?
      end

      def profile_type
        return UserProfile if params[:user_profile_id]
        return BusinessProfile if params[:business_profile_id]
      end

      def profile_params
        profile_id = params[:user_profile_id] || params[:business_profile_id]

        {
          profile_id: profile_id,
          profile_type: profile_type
        }
      end

      def donation_methods_params
        params.require(:donation_method)
              .permit(:vendor_name, :vendor_id)
              .to_h
              .deep_symbolize_keys
              .merge(profile_params)
      end
    end
  end
end
