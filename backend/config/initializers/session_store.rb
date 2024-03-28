# クロスサイト時に必要な設定
Rails.application.config.session_store :cookie_store, key: '_kotonoha_tsumugi_session', same_site: :none, secure: Rails.env.production?