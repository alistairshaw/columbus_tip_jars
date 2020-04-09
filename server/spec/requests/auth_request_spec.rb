RSpec.describe "Authentication", type: :request do
  describe "POST /register" do
    let(:user_params) { attributes_for(:user) }

    context "when given the required attributes" do
      it "creates a user and auth token" do
        expect do
          post "/api/v1/auth/register", :params => { :user => user_params }

          expect(response).to have_http_status(:created)
          expect(json_body[:resource][:id]).not_to eq(nil)
          expect(json_body[:resource][:email]).to eq(user_params[:email])
        end.to change(User, :count).by(1).and change(AuthToken, :count).by(1)
      end

      context "when they are invalid" do
        it "returns http success" do
          post "/api/v1/auth/register", :params => {
            :user => {
              :email => nil,
              :password => nil,
            }
          }

          expect(response).to have_http_status(:unprocessable_entity)
        end
      end
    end

    context "when not given the required attributes" do
      it "returns http success" do
        post "/api/v1/auth/register"

        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end
end