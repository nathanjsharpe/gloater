shared_context "paginated" do
  let(:provided_params) { defined?(params) ? params : {} }

  it "returns result a page at a time" do
    get subject, params: provided_params
    expect(body_as_json.length).to be(Kaminari.config.default_per_page)
  end

  it "returns a link to first and last page in 'Link' header" do
    get subject, params: provided_params
    expect(response.headers["Link"]).to match(/<.+page=2> rel="last"/)
    expect(response.headers["Link"]).to match(/<.+page=1> rel="first"/)
  end

  it "returns link to next page in 'Link' header" do
    get subject, params: provided_params
    expect(response.headers).to include("Link")
    expect(response.headers["Link"]).to match(/<.+page=2> rel="next"/)
  end

  it "returns link to previous page in 'Link' header" do
    get subject, params: provided_params.merge({ page: 2 })
    expect(response.headers).to include("Link")
    expect(response.headers["Link"]).to match(/<.+page=2> rel="prev"/)
  end
end
