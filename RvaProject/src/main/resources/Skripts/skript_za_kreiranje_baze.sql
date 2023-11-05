drop table if exists obrazovanje cascade;
drop table if exists preduzece cascade;
drop table if exists sektor cascade;
drop table if exists radnik cascade;

create table obrazovanje(
id integer primary key,
    naziv varchar(100),
    stepen_strucne_spreme varchar(10),
    opis  varchar(500)
);

create table preduzece(
id integer primary key,
    naziv varchar(100),
    pib integer,
    sediste  varchar(100),
    opis  varchar(500)
);

create table sektor(
id integer primary key,
    naziv varchar(100),
    oznka varchar(10),
    preduzece integer not null,
    constraint fk_sektor_preduzece foreign key(preduzece) references preduzece(id)
);

create table radnik(
id integer primary key,
    ime varchar(50),
    prezime varchar(50),
    broj_lk  integer,
    obrazovanje integer not null,
    sektor integer not null,
    constraint fk_radnik_obrazovanje foreign key(obrazovanje) references obrazovanje(id),
    constraint fk_radnik_sektor foreign key(sektor) references sektor(id)
);

create index idx_pk_obrazovanje on obrazovanje(id);
create index idx_pk_preduzece on preduzece(id);
create index idx_pk_sektor on sektor(id);
create index idx_pk_radnik on radnik(id);

create index idx_fk_sektor_preduzece on sektor(preduzece);
create index idx_fk_radnik_obrazovanje on radnik(obrazovanje);
create index idx_fk_radnik_sektor on radnik(sektor);

drop sequence if exists obrazovanje_id_seq;
create sequence obrazovanje_id_seq
minvalue 0
start with 1;

drop sequence if exists preduzece_id_seq;
create sequence preduzece_id_seq
minvalue 0
start with 1;

drop sequence if exists sektor_id_seq;
create sequence sektor_id_seq
minvalue 0
start with 1;

drop sequence if exists radnik_id_seq;
create sequence radnik_id_seq
minvalue 0
start with 1;