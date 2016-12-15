shared_context "a forbidden request" do
  it "returns an forbidden (403) status code" do
    expect(response).to have_http_status(403)
  end

  it "responds with json containing error" do
    expect(response.body).to be_valid_json
    expect(body_as_json).to match({
      error: "Unauthorized"
    })
  end
end
