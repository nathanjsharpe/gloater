shared_context "an unauthorized request" do
  it "returns an unauthorized (401) status code" do
    expect(response).to have_http_status(401)
  end

  it "responds with json containing error" do
    expect(response.body).to be_valid_json
    expect(json_str_to_hash(response.body)).to match({
      error: "Invalid api token"
    })
  end
end
