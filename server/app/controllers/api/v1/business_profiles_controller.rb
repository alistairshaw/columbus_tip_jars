module Api
  module V1
    class BusinessProfilesController < ApiController
      skip_before_action :authenticate, only: %i[index show]

      def index; end

      def show; end

      def create; end

      def update; end

      private

      def business_profile_params
        params.require(:business_profile).permit(
          :name,
          :description,
          :logo_url,
          :address1,
          :address1,
          :city,
          :state,
          :zip
        ).to_h.deep_symbolize_keys
      end
    end
  end
end
