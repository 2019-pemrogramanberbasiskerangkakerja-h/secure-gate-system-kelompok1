# API GITHUB
POST /login :
Requirement body -> nrp,pass,gate (GET /users first to see NRP and pass)

POST /users: create user
body -> nrp, password

GET /users : get All User
GET /users/:userid : Get User from userid
DELETE /users/:userid : Delete user from userid

POST /gates : create gates
Requirement body -> jam_buka & jam_tutup (format : HH:mm:ss)

GET /gates : get all gates
GET /gates/:gateid : Get Gate from gateid
DELETE /gates/:gateid : Delete Gate from gateid


