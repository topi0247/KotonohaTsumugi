class SsnovelBody < ApplicationRecord
  belongs_to :ssnovel, touch: true
  belongs_to :user
  validates :content, presence: true, length: { minimum: 1, maximum: 400}
  enum narrative_stage: { beginning: 0, rising_action: 1, climax: 2, falling_action: 3}
  validates :narrative_stage, presence: true
  validates :narrative_stage, uniqueness: { scope: :ssnovel_id }

  def created_at
    attributes['created_at'].strftime('%Y年%m月%d日 %H時%M分')
  end
end
