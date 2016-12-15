shared_context "authenticated" do
  before(:each) { @request.headers["Authorization"] = api_token.token }
  let(:api_token) { Fabricate(:api_token) }
  let(:current_user) { api_token.user }
end
