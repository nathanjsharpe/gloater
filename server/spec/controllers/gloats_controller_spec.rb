require 'rails_helper'

RSpec.describe GloatsController, type: :controller do
  describe "GET #index" do
    it "returns http success" do
      get :index, params: {}
      expect(response).to have_http_status(:success)
    end

    it "sorts by created_at desc if no sort provided" do
      gloats = [
        Fabricate(:gloat, created_at: Time.now - 1.hour),
        Fabricate(:gloat, created_at: Time.now - 2.hours),
        Fabricate(:gloat, created_at: Time.now - 3.hours)
      ]

      get :index, params: {}
      expect(body_as_json.map{|g| g["id"]}).to match([gloats[0].id, gloats[1].id, gloats[2].id])
    end

    it "sorts by number of admirers if sort parameter is 'popularity'" do
      gloats = [
        Fabricate(:gloat),
        Fabricate(:gloat),
        Fabricate(:gloat)
      ]

      2.times do
        gloats[1].admirers << Fabricate(:user)
        gloats[1].save
      end

      gloats[2].admirers << Fabricate(:user)
      gloats[2].save

      get :index, params: { sort: 'popularity' }
      expect(body_as_json.map{|g| g["id"]}).to match([gloats[1].id, gloats[2].id, gloats[0].id])
    end

    context "without valid token and stalked parameter true" do
      before do
        get :index, params: { stalked: true }
      end

      it_behaves_like "an unauthorized request"
    end

    context "with valid token and stalked parameter true" do
      include_context "authenticated"

      it "returns only gloats by users stalked by the current user" do
        stalked_user = Fabricate(:user)
        current_user.stalked_users << stalked_user
        current_user.save
        unstalked_user = Fabricate(:user)

        Fabricate.times(3, :gloat, user: stalked_user)
        Fabricate.times(2, :gloat, user: unstalked_user)

        get :index, params: { stalked: true }
        expect(body_as_json.length).to equal(3)
      end
    end

    context "without valid token and admired parameter true" do
      before do
        get :index, params: { admired: true }
      end

      it_behaves_like "an unauthorized request"
    end

    context "with valid token and admired parameter true" do
      include_context "authenticated"

      it "returns only gloats admired by the current user" do
        Fabricate.times(3, :gloat, admirers: [current_user])
        Fabricate.times(2, :gloat)

        get :index, params: { admired: true }
        expect(body_as_json.length).to equal(3)
      end
    end
  end

  describe "GET #show" do
    def do_request
      get :show, params: { id: gloat.id }
    end

    let(:gloat) { Fabricate(:gloat) }

    context "without valid token" do
      before { do_request }

      it "returns http success" do
        expect(response).to have_http_status(:success)
      end

      it "responds with JSON containing gloat" do
        expect(response.body).to be_valid_json
        expect(body_as_json).to include({
          id: gloat.id,
          content: gloat.content,
          admirers_count: 0,
          user: {
            username: gloat.user.username,
            name: gloat.user.name,
            image: gloat.user.image
          }
        })
      end

      it "does not include admired in returned gloat" do
        expect(body_as_json).not_to include(:admired)
      end
    end

    context "with valid token" do
      include_context "authenticated"

      it "indicates if gloat is not admired by current user" do
        do_request
        expect(body_as_json).to include({
          admired: false
        })
      end

      context "when current user is author of gloat" do
        let(:gloat) { Fabricate(:gloat, user: current_user) }

        it "does not include admired" do
          do_request
          expect(body_as_json).not_to include(:admired)
        end
      end

      context "with admired gloat" do
        let(:gloat) { Fabricate(:gloat, admirers: [current_user]) }

        it "indicates if gloat is admired by current user" do
          do_request
          expect(body_as_json).to include({
            admired: true
          })
        end
      end
    end
  end

  describe "POST #create" do

    def do_request
      post :create, params: { gloat: gloat_attributes }
    end

    context "with valid token" do
      include_context "authenticated"

      context "with valid params" do

        let(:gloat_attributes) { Fabricate.attributes_for(:gloat) }

        it "creates a new Gloat belonging to current user" do
          expect {
            do_request
          }.to change(Gloat, :count).by(1)
          expect(Gloat.last.user.id).to equal(current_user.id)
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
            id: be_kind_of(Integer),
            user: include({
              username: current_user.username
            })
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

    context "without valid token" do
      let(:gloat_attributes) { Fabricate.attributes_for(:gloat) }

      before { do_request }

      it_behaves_like "an unauthorized request"
    end
  end

  describe "PUT #update" do
    let(:gloat) { Fabricate(:gloat) }

    context "with valid token for user who authored the gloat" do
      include_context "authenticated"

      def do_request
        put :update, params: { id: gloat.id, gloat: gloat_attributes }
      end

      let(:gloat) { Fabricate(:gloat, user: current_user) }

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

    context "with token of a different user" do
      before(:each) do
        @request.headers["Authorization"] = api_token.token
        put :update, params: { id: gloat.id, gloat: gloat_attributes }
      end

      let(:api_token) { Fabricate(:api_token) }
      let(:user) { api_token.user }
      let(:gloat_attributes) { Fabricate.attributes_for(:gloat) }

      it_behaves_like "a forbidden request"
    end

    context "without valid token" do
      before(:each) do
        put :update, params: { id: gloat.id, gloat: gloat_attributes }
      end

      let(:gloat_attributes) { Fabricate.attributes_for(:gloat) }

      it_behaves_like "an unauthorized request"
    end
  end

  describe "DELETE #destroy" do
    context "with valid token for the user who authored the gloat" do
      include_context "authenticated"

      def do_request
        delete :destroy, params: { id: gloat.id }
      end

      let(:gloat) { Fabricate(:gloat, user: current_user) }

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

    context "with token of a different user" do
      before(:each) do
        @request.headers["Authorization"] = api_token.token
        delete :destroy, params: { id: gloat.id }
      end

      let(:api_token) { Fabricate(:api_token) }
      let(:user) { api_token.user }
      let(:gloat) { Fabricate(:gloat) }

      it_behaves_like "a forbidden request"
    end
  end
end
