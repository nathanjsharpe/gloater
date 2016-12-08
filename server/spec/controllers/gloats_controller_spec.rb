require 'rails_helper'

RSpec.describe GloatsController, type: :controller do

  # This should return the minimal set of values that should be in the session
  # in order to pass any filters (e.g. authentication) defined in
  # GloatsController. Be sure to keep this updated too.
  let(:valid_session) { {} }

  describe "GET #index" do
    it "returns http success" do
      gloat = Fabricate(:gloat)
      get :index, params: {}, session: valid_session
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    before do
      get :show, params: { id: gloat.id }, session: valid_session
    end

    let(:gloat) { Fabricate(:gloat) }

    it "returns https success" do
      expect(response).to have_http_status(:success)
    end

    it "responds with JSON containing gloat" do
      expect(response.body).to be_valid_json
      expect(body_as_json).to include({
        id: gloat.id,
        content: gloat.content
      })
    end
  end

  describe "POST #create" do
    def do_request
      post :create, params: { gloat: gloat_attributes }, session: valid_session
    end

    context "with valid params" do

      let(:gloat_attributes) { Fabricate.attributes_for(:gloat) }

      it "creates a new Gloat" do
        expect {
          do_request
        }.to change(Gloat, :count).by(1)
      end

      it "responds with created status" do
        do_request
        expect(response).to have_http_status(:created)
      end

      it "responds with JSON containing gloat" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          content: gloat_attributes[:content],
          id: be_kind_of(Integer)
        })
      end

    end

    context "with invalid params" do
      it "assigns a newly created but unsaved gloat as @gloat" do
        skip "no validation yet for gloats"
        post :create, params: {gloat: invalid_attributes}, session: valid_session
        expect(assigns(:gloat)).to be_a_new(Gloat)
      end

      it "re-renders the 'new' template" do
        skip "no validation yet for gloats"
        post :create, params: {gloat: invalid_attributes}, session: valid_session
        expect(response).to render_template("new")
      end
    end
  end

  describe "PUT #update" do
    let(:gloat) { Fabricate(:gloat) }

    context "with valid params" do
      before do
        put :update, params: { id: gloat.id, gloat: new_attributes }, session: valid_session
      end

      let(:new_attributes) { Fabricate.attributes_for(:gloat) }

      it "responds with success" do
        expect(response).to have_http_status(:success)
      end

      it "responds with JSON containing the updated gloat" do
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          content: new_attributes[:content],
          id: gloat.id
        })
      end
    end

    context "with invalid params" do
      it "assigns the gloat as @gloat" do
        skip "no gloat validation"
        gloat = Gloat.create! valid_attributes
        put :update, params: {id: gloat.to_param, gloat: invalid_attributes}, session: valid_session
        expect(assigns(:gloat)).to eq(gloat)
      end

      it "re-renders the 'edit' template" do
        skip "no gloat validation"
        gloat = Gloat.create! valid_attributes
        put :update, params: {id: gloat.to_param, gloat: invalid_attributes}, session: valid_session
        expect(response).to render_template("edit")
      end
    end
  end

  describe "DELETE #destroy" do
    def do_request
      delete :destroy, params: { id: gloat.id }, session: valid_session
    end

    let(:gloat) { Fabricate(:gloat) }

    it "destroys the requested gloat" do
      gloat
      expect {
        do_request
      }.to change(Gloat, :count).by(-1)
    end

    it "returns a success response" do
      do_request
      expect(response).to have_http_status(:success)
    end
  end

end
