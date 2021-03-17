# Nicha API v1 Errors

## 4xx

|Status code|Type|Details|
|-----------|----|-------|
|400|bad_request|Please check api docs. https://github.com/BonyChops/nicha-sns/blob/main/functions/docs/v1.md
|400|bad_request_content_type_wrong|Content-type must be 'application/json' or 'application/x-www-form-urlencoded'|
|400|bad_request_no_authorization_data|You have to provide authorization data by attaching on header(`Authorization: Bearer {token}`).
|400|bad_request_current_user_not_provided|You have to provide current user's uid. `GET`: Attach on your params(`current_user={user_uid}`). `Others`: Attach on your body(`current_user={user_uid}` or `{"current_user": {user_uid}}`)|
|401|not_authorized|Not authorized.
|401|not_authorized_users_not_created|You've not created first user. You have to create the first user with `POST /v1/users`.
|401|not_authorized_current_user_not_found|Uid you've provided is not valid. Check your Uid.
|404|not_found|Endpoint not found...(nicha
|404|not_found_post|Post not found. This error will also happen when it's not visible for current user.
|409|conflict|Conflicted request.
|409|conflict_not_modified|You've tried to modify things but it's not changed because of sending same content.
|418|I_am_a_teapot|Failed to brew coffee with a teapot.|

## 5xx

|Status code|Type|Details|
|-----------|----|-------|
|500|internal_server_error|Internal Server Error. This means server's error(not the client). Could you contact the owner of this: Nicha? Thanks for your support.|
|500|internal_server_error_handled|Internal Server Error. Most of the reason why this happens is my coding problem... Sorry.|
|503|service_unavailable|Service Unavailable. This means server's error(not the client). Could you contact the owner of this service: Nicha? Thanks for your support.|
|503|service_unavailable_timedout|Service Unavailable. We've set the timeout(3s) but when it's over, this error will occur.|