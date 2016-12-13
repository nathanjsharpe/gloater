require 'rails_helper'

RSpec.describe GloatsController, type: :controller do
  describe "GET #index" do
    it "returns http success" do
      get :index, params: {}
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #show" do
    before do
      get :show, params: { id: gloat.id }
    end

    let(:gloat) { Fabricate(:gloat) }

    it "returns http success" do
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
      post :create, params: { gloat: gloat_attributes }
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
      let (:gloat_attributes) { Fabricate.attributes_for(:gloat, content: "oops" * 50) }

      it "does not save the gloat" do
        expect {
          do_request
        }.to_not change(Gloat, :count)
      end

      it "responds with status 422 unprocessable entity" do
        do_request
        expect(response).to have_http_status(422)
      end

      it "responds with JSON containing errors" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to match({
          "content": [
            "is too long (maximum is 140 characters)"
          ]
        })
      end
    end
  end

  describe "PUT #update" do
    let(:gloat) { Fabricate(:gloat) }

    def do_request
      put :update, params: { id: gloat.id, gloat: gloat_attributes }
    end

    context "with valid params" do
      let(:gloat_attributes) { Fabricate.attributes_for(:gloat) }

      it "responds with success" do
        do_request
        expect(response).to have_http_status(:success)
      end

      it "responds with JSON containing the updated gloat" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          content: gloat_attributes[:content],
          id: gloat.id
        })
      end
    end

    context "with invalid params" do
      let (:gloat_attributes) { Fabricate.attributes_for(:gloat, content: "oops" * 50) }

      it "does not update the gloat" do
        do_request
        gloat.reload
        expect(gloat.content).to_not equal(gloat_attributes[:content])
      end

      it "responds with status 422 unprocessable entity" do
        do_request
        expect(response).to have_http_status(422)
      end

      it "responds with JSON containing errors" do
        do_request
        expect(response.body).to be_valid_json
        expect(body_as_json).to match({
          "content": [
            "is too long (maximum is 140 characters)"
          ]
        })
      end
    end
  end

  describe "DELETE #destroy" do
    def do_request
      delete :destroy, params: { id: gloat.id }
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
