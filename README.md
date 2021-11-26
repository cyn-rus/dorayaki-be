# Dorayaki-Factory-Server

##  WEB SERVICE
Web service yang diterapkan pada program ini berbentuk akses secara remote dari basis data dengan perangkat lunak (dalam kasus ini merupakan web). URL yang digunakan pada web service ini berguna untuk memanggil perintah saja. Bentuk komunikasi atau message body yang digunakan sebagai jalur komunikasi berbentuk JSON.

## SKEMA BASIS DATA
```
resep (
    nama_resep VARCHAR(50),
    nama_bahan VARCHAR(50),
    jumlah INT
)
bahan_baku (
    nama_bahan VARCHAR(50),
    stok INT
)
request (
    request_name VARCHAR(255),
    nama_dorayaki VARCHAR(50),
    jumlah INT,
    status INT,
    ip TEXT,
    endpoint TEXT,
    timestamp TIMESTAMP
)
request_log (
    ip TEXT,
    endpoint TEXT,
    timestamp TIMESTAMP
)
users (
    username VARCHAR(50),
    password VARCHAR(50),
    email VARCHAR(50),
    isadmin INT
)
```

## LIST OF ENDPOINTS
- /authenticate
- /login
- /register
- /getResepNames
- /getResep
- /addResep
- /getAllResep
- /addBahanBaku
- /getBahanBaku
- /getAllBahanBaku
- /getAllBahanBakuNames
- /editBahanBaku
- /getRequest
- /getStatus
- /addRequest
- /rejectRequest
- /getAllRequest
- /acceptRequest
Full reference can be accessed at : https://docs.google.com/document/d/1SFEuuYtS-TsjlSrFrtzIMl6pZgttKF54WxGQ6_3asew/edit?usp=sharing 

## PEMBAGIAN TUGAS
REST
Backend :
  - jwt authentication : 13519191
  - login and generate token : 13519191
  - register & encryption : 13519191
  - add bahan baku, get bahan baku & variations, edit bahan baku : 13519191
  - add request, get requests : 13519191
  - accept requests + rate limiter and reject requests : 13519191
  - get status : 13519191
  - add resep, get resep & variations : 13519191