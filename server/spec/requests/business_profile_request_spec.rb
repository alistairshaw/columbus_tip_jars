RSpec.describe "Business Profiles" do
  describe "GET /api/v1/business_profiles" do
    context "when there are no profiles" do
      it "returns an empty array" do
        get "/api/v1/business_profiles"

        expect(response).to have_http_status(:ok)
        expect(json_body[:resources]).to be_empty
      end
    end

    context "when there are profiles" do
      let!(:business_profiles) { create_list(:business_profile, 3) }

      it "returns all the business profiles" do
        get "/api/v1/business_profiles"

        expect(response).to have_http_status(:ok)
        expect(json_body[:resources].size).to eq(3)
        json_body[:resources].map { |r| r[:id] }.tap do |resource_ids|
          expect(resource_ids).to include(business_profiles.first.id)
          expect(resource_ids).to include(business_profiles.second.id)
          expect(resource_ids).to include(business_profiles.third.id)
        end
      end

      it "has the expected properties on the business profile" do
        get "/api/v1/business_profiles"

        expect(json_body[:resources].first).to include(
          :id,
          :name,
          :industry,
          :logo_url,
          :description,
          :address1,
          :address2,
          :city,
          :state,
          :zip,
          :created_at,
          :updated_at
        )
      end
    end
  end

  describe "GET /api/v1/business_profiles/:id" do
    context "when found" do
      let(:business_profile) { create(:business_profile) }

      it "returns success" do
        get "/api/v1/business_profiles/#{business_profile.id}"

        expect(response).to have_http_status(:ok)
        expect(json_body[:resource][:id]).to eq(business_profile.id)
        expect(json_body[:resource][:name]).to eq(business_profile.name)
        expect(json_body[:resource][:description]).to eq(business_profile.description)
        expect(json_body[:resource][:address1]).to eq(business_profile.address1)
        expect(json_body[:resource][:address2]).to eq(business_profile.address2)
        expect(json_body[:resource][:city]).to eq(business_profile.city)
        expect(json_body[:resource][:state]).to eq(business_profile.state)
        expect(json_body[:resource][:zip]).to eq(business_profile.zip)
      end
    end

    context "when not found" do
      it "returns not found" do
        get "/api/v1/business_profiles/192939393"

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST /api/v1/business_profiles" do
    let(:user) { auth_token.user }
    let(:auth_token) { create(:auth_token) }
    let(:business_profile_params) { attributes_for(:business_profile, user: nil) }

    context "when authorized" do
      context "when given valid params" do
        it "creates and returns the new business profile", :aggregate_failures do
          expect(user.business_profiles).to be_empty

          expect do
            post "/api/v1/business_profiles",
                 headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" },
                 params: { business_profile: business_profile_params }

            expect(response).to have_http_status(:created)

            expect(json_body[:errors]).to be_empty
            expect(json_body[:resource][:id]).not_to eq(nil)
          end.to change(BusinessProfile, :count).by(1)
        end
      end

      context "when given invalid params" do
        it "returns errors" do
          post "/api/v1/business_profiles", headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" }

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when unauthorized" do
      it "is unauthorized" do
        expect do
          post "/api/v1/business_profiles",
               headers: { "HTTP_AUTHORIZATION": "Bearer invalid" },
               params: { business_profile: business_profile_params }

          expect(response).to have_http_status(:unauthorized)
          expect(json_body).to be_empty
        end.not_to change(BusinessProfile, :count)
      end
    end
  end
end
