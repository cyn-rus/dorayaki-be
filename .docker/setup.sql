CREATE DATABASE IF NOT EXISTS pabrik_dorayaki;

USE pabrik_dorayaki;

CREATE TABLE IF NOT EXISTS resep (
    nama_bahan VARCHAR(50),
    jumlah INT
);

CREATE TABLE IF NOT EXISTS bahan_baku (
    nama_bahan VARCHAR(50),
    stok INT
);

CREATE TABLE IF NOT EXISTS request (
    ip TEXT,
    endpoint TEXT,
    timestamp TIMESTAMP
);

CREATE TABLE IF NOT EXISTS request_log (
    ip TEXT,
    endpoint TEXT,
    timestamp TIMESTAMP
);