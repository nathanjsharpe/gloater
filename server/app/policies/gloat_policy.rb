class GloatPolicy < ApplicationPolicy
  def index?
    true
  end

  def create?
    user
  end

  def update?
    user && record.user_id == user.id
  end

  def destroy?
    user && record.user_id == user.id
  end
end
