## users テーブル

|column|Type|Options|
|------|----|-------|
|name|string|null:false|
|email|string|null:false|

### Association
- has_many :groups
- has_many :messages
- has_many :groups, through: :groups_users

## messages テーブル

|column|Type|Options|
|------|----|-------|
|body|text|
|group_id|integer|null: false,foreign_key: true|
|user_id|integer|null: false, foreign_key: true|
|image|string|

### Association
- belongs_to :group
- belongs_to :user

## groups テーブル

|column|Type|Options|
|------|----|-------|
|group_name|string|null:false|

### Association
- has_many :users
- has_many :messages
- has_many :users, through: :groups_users

## groups_users テーブル

|column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :groups
- belongs_to :users



