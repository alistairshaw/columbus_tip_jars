RSpec.describe "Authentication", type: :request do
  describe "POST /api/v1/auth/register" do
    let(:user_params) { attributes_for(:user) }

    context "when given the required attributes" do
      it "creates a user and auth token" do
        expect do
          post "/api/v1/auth/register", params: { user: user_params }

          expect(response).to have_http_status(:created)
          expect(json_body[:resource][:id]).not_to eq(nil)
          expect(json_body[:resource][:email]).to eq(user_params[:email])
          expect(json_body[:resource]).not_to include(:password)
          expect(json_body[:auth_token]).not_to eq(nil)
        end.to change(User, :count).by(1).and change(AuthToken, :count).by(1)
      end

      context "when they are invalid" do
        it "returns unprocessable entity" do
          post "/api/v1/auth/register", params: {
            user: {
              email: nil,
              password: nil
            }
          }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(json_body[:errors]).to include("Password can't be blank")
          expect(json_body[:errors]).to include("Email can't be blank")
        end
      end
    end

    context "when not given the required attributes" do
      it "returns unprocessable entity" do
        post "/api/v1/auth/register"

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_body).to be_empty
      end
    end
  end

  describe "POST /api/v1/auth/login" do
    let(:password) { Faker::Internet.password }
    let(:user) { create(:user, password: password) }
    let!(:auth_token) { create(:auth_token, user: user) }
    let(:user_params) do
      {
        email: user.email,
        password: password
      }
    end

    context "when given the required attributes" do
      it "returns the auth token for the user" do
        post "/api/v1/auth/login", params: { user: user_params }

        expect(response).to have_http_status(:ok)
        expect(json_body[:auth_token]).to eq(auth_token.token)
        expect(json_body[:resource][:id]).to eq(user.id)
        expect(json_body[:resource][:email]).to eq(user.email)
        expect(json_body[:resource]).not_to include(:password)
        expect(json_body[:errors]).to be_empty
      end

      context "when they are invalid" do
        it "returns unprocessable entity" do
          post "/api/v1/auth/login", params: {
            user: {
              email: user.email,
              password: nil
            }
          }

          expect(response).to have_http_status(:unprocessable_entity)
          expect(json_body[:auth_token]).to eq(nil)
          expect(json_body[:resource]).to eq(nil)
          expect(json_body[:errors]).to include(I18n.t!("invalid_email_or_password"))
        end
      end
    end

    context "when not given the required attributes" do
      it "returns unprocessable entity" do
        post "/api/v1/auth/login"

        expect(response).to have_http_status(:unprocessable_entity)
        expect(json_body).to be_empty
      end
    end
  end

  describe "GET /api/v1/auth/me" do
    let(:user) { auth_token.user }
    let!(:auth_token) { create(:auth_token) }

    context "when the user has an API token" do
      it "returns the user information" do
        get "/api/v1/auth/me", headers: { "HTTP_AUTHORIZATION" => "Bearer #{auth_token.token}" }

        expect(response).to have_http_status(:ok)
        expect(json_body[:resource][:id]).to eq(user.id)
        expect(json_body[:resource][:email]).to eq(user.email)
        expect(json_body[:resource]).not_to include(:password)
        expect(json_body[:errors]).to be_empty
      end

      context "when the token is invalid" do
        it "returns unprocessable entity" do
          get "/api/v1/auth/me", headers: { "HTTP_AUTHORIZATION": "Bearer unknown" }

          expect(response).to have_http_status(:unauthorized)
          expect(json_body).to be_empty
        end
      end
    end

    context "when not given the required attributes" do
      it "returns unprocessable entity" do
        get "/api/v1/auth/me", headers: { "HTTP_AUTHORIZATION": "Bearer unknown" }

        expect(response).to have_http_status(:unauthorized)
        expect(json_body).to be_empty
      end
    end
  end
end
