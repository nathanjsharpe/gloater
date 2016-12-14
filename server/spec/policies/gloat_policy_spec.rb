describe GloatPolicy do
  subject { described_class }

  permissions :index? do
    it "always allows access" do
      gloats = Fabricate.times(3, :gloat)
      expect(subject).to permit(nil, gloats)
    end
  end

  permissions :show? do
    let(:gloat) { Fabricate(:gloat) }

    it "always allows access" do
      gloat = Fabricate(:gloat)
      expect(subject).to permit(nil, gloat)
    end
  end

  permissions :create? do
    it "allows access to any user" do
      user = Fabricate(:user)
      expect(subject).to permit(user, Gloat.new)
    end

    it "denies access if no current user" do
      expect(subject).not_to permit(nil, Gloat.new)
    end
  end

  permissions :update?, :destroy? do
    let(:user) { Fabricate(:user) }
    let(:gloat) { Fabricate(:gloat, user: user) }

    it "allows access to user to whom the gloat belongs" do
      expect(subject).to permit(user, gloat)
    end

    it "denies access if no user" do
      expect(subject).not_to permit(nil, gloat)
    end

    it "denies access to users to whom the gloat does not belong" do
      another_user = Fabricate(:user)
      expect(subject).not_to permit(another_user, gloat)
    end
  end
end
