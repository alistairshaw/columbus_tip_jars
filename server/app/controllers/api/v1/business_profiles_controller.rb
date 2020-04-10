module Api
  module V1
    class BusinessProfilesController < ApiController
      skip_before_action :authenticate, only: %i[index show]
      before_action :verify_business_profile_ownership, only: %i[update]

      def index
        render json: { resources: BusinessProfile.all }
      end

      def show
        render json: { resource: BusinessProfile.find(params[:id]) }
      end

      def create
        result = ProfileService.create_business_profile(business_profile_params)

        if result.success?
          render json: { errors: [], resource: result.business_profile }, status: :created
        else
          render json: { errors: result.business_profile.errors.full_messages, resource: nil }, status: :unprocessable_entity
        end
      end

      def update
        result = ProfileService.update_business_profile(params[:id], business_profile_params)

        if result.success?
          render json: { errors: [], resource: result.business_profile }, status: :ok
        else
          render json: { errors: Array.wrap(result&.business_profile&.errors&.full_messages), resource: nil }, status: :unprocessable_entity
        end
      end

      private

      def verify_business_profile_ownership
        business_profile = BusinessProfile.find_by(id: params[:id], user_id: current_user.id)

        render json: {}, status: :unauthorized unless business_profile
      end

      def business_profile_params
        params.require(:business_profile).permit(
          :name,
          :description,
          :industry,
          :logo_url,
          :address1,
          :address1,
          :city,
          :state,
          :zip
        ).to_h.deep_symbolize_keys.merge(user_id: current_user.id)
      end
    end
  end
end
