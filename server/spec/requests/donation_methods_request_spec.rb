PROFILE_TYPES = [
  OpenStruct.new(description: "Business Profiles", creator: :business_profile, route: "business_profiles"),
  OpenStruct.new(description: "User Profiles", creator: :user_profile, route: "user_profiles")
].freeze

RSpec.describe "Donation Methods" do
  PROFILE_TYPES.each do |profile_type|
    describe "For #{profile_type.description}" do
      describe "GET /api/v1/#{profile_type.route}/:id/donation_methods" do
        context "when the profile does not have donation methods" do
          let(:profile) { create(profile_type.creator) }

          it "returns an empty array" do
            get "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods"

            expect(response).to have_http_status(:ok)
            expect(json_body[:resources]).to be_empty
          end
        end

        context "when the profile has donation methods" do
          let(:profile) { create(profile_type.creator) }
          let!(:donation_methods) { create_list(:donation_method, 2, profile: profile) }

          it "returns an array of donation methods" do
            get "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods"

            expect(response).to have_http_status(:ok)
            expect(json_body[:resources].size).to eq(2)
            expect(json_body[:resources].first).to include(:id, :created_at, :updated_at, :vendor_name, :vendor_id)
            expect(json_body[:resources].second).to include(:id, :created_at, :updated_at, :vendor_name, :vendor_id)
          end
        end
      end

      describe "GET /api/v1/#{profile_type.route}/:id/donation_methods/:id" do
        context "when the donation method does not exist" do
          let(:profile) { create(profile_type.creator) }

          it "returns not found" do
            get "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods/1929393"

            expect(response).to have_http_status(:not_found)
          end
        end

        context "when the profile has the donation method" do
          let(:profile) { create(profile_type.creator) }
          let!(:donation_method) { create_list(:donation_method, 2, profile: profile).first }

          it "returns the donation method" do
            get "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods/#{donation_method.id}"

            expect(response).to have_http_status(:ok)
            expect(json_body[:resource][:id]).to eq(donation_method.id)
            expect(json_body[:resource][:vendor_id]).to eq(donation_method.vendor_id)
            expect(json_body[:resource][:vendor_name]).to eq(donation_method.vendor_name)
          end
        end
      end

      describe "POST /api/v1/#{profile_type.route}/:id/donation_methods" do
        let(:profile) { create(profile_type.creator, user: auth_token.user) }
        let(:auth_token) { create(:auth_token) }
        let(:donation_method_params) { attributes_for(:donation_method, profile: nil) }

        context "when unauthorized" do
          it "returns unauthorized" do
            post "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods"

            expect(response).to have_http_status(:unauthorized)
          end
        end

        it "creates a new donation method" do
          expect do
            post "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods",
                 headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" },
                 params: { donation_method: donation_method_params }

            expect(response).to have_http_status(:created)
            expect(json_body[:errors]).to be_empty
            expect(json_body[:resource][:id]).not_to eq(nil)
            expect(json_body[:resource][:vendor_name]).to eq(donation_method_params[:vendor_name])
            expect(json_body[:resource][:vendor_id]).to eq(donation_method_params[:vendor_id])
            expect(json_body[:resource][:profile_id]).to eq(profile.id)
          end.to change(DonationMethod, :count).by(1)
        end
      end

      describe "PUT /api/v1/#{profile_type.route}/:id/donation_methods/:id" do
        let(:auth_token) { create(:auth_token) }
        let(:profile) { create(profile_type.creator, user: auth_token.user) }
        let(:donation_method) { create(:donation_method, profile: profile) }

        context "when unauthorized" do
          it "returns unauthorized" do
            put "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods/#{donation_method.id}"

            expect(response).to have_http_status(:unauthorized)
          end
        end

        it "updates the new donation method" do
          put "/api/v1/#{profile_type.route}/#{profile.id}/donation_methods/#{donation_method.id}",
              headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" },
              params: { donation_method: { vendor_id: "my_new_vendor_id" } }

          expect(response).to have_http_status(:ok)
          expect(json_body[:errors]).to be_empty
          expect(json_body[:resource][:id]).to eq(donation_method.id)
          expect(json_body[:resource][:vendor_name]).to eq(donation_method.vendor_name)
          expect(json_body[:resource][:vendor_id]).to eq("my_new_vendor_id")
          expect(json_body[:resource][:profile_id]).to eq(profile.id)
        end
      end
    end
  end
end
