module Api
  module V1
    class DonationMethodsController < ApiController
      before_action :set_profile
      before_action :verify_profile_ownership, only: %i[create update]
      skip_before_action :authenticate, only: %i[index show]

      def index
        render json: { resources: @profile.donation_methods }
      end

      def show
        render json: { resource: @profile.donation_methods.find(params[:id]) }
      end

      def create
        donation_method = @profile.donation_methods.new(donation_method_params)

        if donation_method.save
          render json: { errors: [], resource: donation_method }, status: :created
        else
          render json: { errors: donation_method.errors.full_messages, resource: nil }, status: :unprocessable_entity
        end
      end

      def update
        donation_method = @profile.donation_methods.find(params[:id])
        donation_method.update(donation_method_params)

        if donation_method.save
          render json: { errors: [], resource: donation_method }
        else
          render json: { errors: donation_method.errors.full_messages, resource: nil }, status: :unprocessable_entity
        end
      end

      private

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
        render json: {}, status: :unauthorized unless @profile.user.id == current_user.id
      end

      def donation_method_params
        params.require(:donation_method)
              .permit(:vendor_name, :vendor_id)
              .to_h
              .deep_symbolize_keys
              .merge(profile: @profile)
      end
    end
  end
end
