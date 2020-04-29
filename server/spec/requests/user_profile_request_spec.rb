RSpec.describe "User Profiles" do
  describe "GET /api/v1/user_profiles" do
    context "when there are no profiles" do
      it "returns an empty array" do
        get "/api/v1/user_profiles"

        expect(response).to have_http_status(:ok)
        expect(json_body[:resources]).to be_empty
      end
    end

    context "when there are profiles" do
      let!(:user_profiles) { create_list(:user_profile, 3) }

      it "returns all the business profiles" do
        get "/api/v1/user_profiles"

        expect(response).to have_http_status(:ok)
        expect(json_body[:resources].size).to eq(3)

        result_resource_ids = json_body[:resources].map { |r| r[:id] }

        expect(result_resource_ids).to include(user_profiles.first.id)
        expect(result_resource_ids).to include(user_profiles.second.id)
        expect(result_resource_ids).to include(user_profiles.third.id)
      end

      it "has the correct user profile properties" do
        get "/api/v1/user_profiles"

        expect(json_body[:resources].first).to include(
          :user_name,
          :industry,
          :nickname
        )
      end
    end
  end

  describe "GET /api/v1/user_profiles/:id" do
    context "when there is a matching profile" do
      let(:user_profile) { create(:user_profile) }

      it "returns success" do
        get "/api/v1/user_profiles/#{user_profile.user.id}"

        expect(response).to have_http_status(:ok)
        expect(json_body[:resource][:id]).to eq(user_profile.id)
        expect(json_body[:resource][:user_name]).to eq(user_profile.user_name)
        expect(json_body[:resource][:industry]).to eq(user_profile.industry)
        expect(json_body[:resource][:nickname]).to eq(user_profile.nickname)
      end
    end

    context "when not found" do
      it "returns not found" do
        get "/api/v1/user_profiles/123456789"

        expect(response).to have_http_status(:not_found)
      end
    end
  end

  describe "POST /api/v1/user_profiles" do
    let(:auth_token) { create(:auth_token) }
    let(:user_profile_params) { attributes_for(:user_profile) }

    context "when authorized" do
      context "when given valid params" do
        it "creates and returns the a new user profile", :aggregate_failures do
          expect do
            post "/api/v1/user_profiles",
                 headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" },
                 params: { user_profile: user_profile_params }

            expect(response).to have_http_status(:created)

            expect(json_body[:errors]).to be_empty
            expect(json_body[:resource][:id]).not_to eq(nil)
          end.to change(UserProfile, :count).by(1)
        end
      end
    end

    context "when unauthorized" do
      it "is unauthorized" do
        expect do
          post "/api/v1/user_profiles",
               headers: { "HTTP_AUTHORIZATION": "Bearer invalid" },
               params: { user_profile: user_profile_params }

          expect(response).to have_http_status(:unauthorized)
          expect(json_body).to be_empty
        end.not_to change(BusinessProfile, :count)
      end
    end
  end

  describe "PUT /api/v1/user_profiles/:id" do
    let(:auth_token) { create(:auth_token) }
    let(:user) { auth_token.user }
    let(:user_profile) { create(:user_profile, user: user) }

    context "when authorized" do
      context "when you own the user profile you are updating" do
        it "returns the updated user profile", :aggregate_failures do
          put "/api/v1/user_profiles/#{user_profile.id}",
              headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" },
              params: { user_name: "Updated Username" }

          expect(response).to have_http_status(:ok)
          expect(json_body[:errors]).to be_empty
          expect(json_body[:resource][:id]).to eq(user_profile.id)
          expect(json_body[:resource][:user_name]).to eq("Updated Username")
          expect(json_body[:resource][:industry]).to eq(user_profile.industry)
          expect(json_body[:resource][:nickname]).to eq(user_profile.nickname)
        end
      end

      context "when you are not allowed to update the business profile" do
        let(:user_profile) { create(:user_profile) }

        it "returns unauthorized" do
          put "/api/v1/user_profiles/#{user_profile.id}",
              headers: { "HTTP_AUTHORIZATION": "Bearer #{auth_token.token}" },
              params: { user_profile: { user_name: "Updated Username" } }

          expect(response).to have_http_status(:unauthorized)
        end
      end
    end

    context "when unauthorized" do
      it "is unauthorized" do
        put "/api/v1/user_profiles/#{user_profile.id}",
            headers: { "HTTP_AUTHORIZATION": "Bearer invalid" },
            params: { user_profile: { user_name: "Updated Username" } }

        expect(response).to have_http_status(:unauthorized)
        expect(json_body).to be_empty
      end
    end
  end
end
