/*table obrazovanje*/
insert into obrazovanje(id,naziv,stepen_strucne_spreme,opis)
values (nextval('obrazovanje_id_seq'),'Konsultant','Master','Edukuje, savetuje o prirodi problema i daje resenja.');
insert into obrazovanje(id,naziv,stepen_strucne_spreme,opis)
values (nextval('obrazovanje_id_seq'),'Digital menadzer','Visa','Organizuje kampanje preko drustvenih mreza, bavi se internet oglasavanjem, povecanjem onlajn prodaje.');
insert into obrazovanje(id,naziv,stepen_strucne_spreme,opis)
values (nextval('obrazovanje_id_seq'),'Menadzer','Specijal','Pomaze u resavanje kompleksnih problema');
insert into obrazovanje(id,naziv,stepen_strucne_spreme,opis)
values (nextval('obrazovanje_id_seq'),'Programer','Osnovne','Kreira i odrzava kod koji pokrece web sajtove i web aplikacije.');
insert into obrazovanje(id,naziv,stepen_strucne_spreme,opis)
values (nextval('obrazovanje_id_seq'),'Rukovodilac','Specijal','Radi na poslovima koji su vezani za upravljacke i izvrsne poslove.');

/*table preduzece*/
insert into preduzece(id,naziv,pib,sediste,opis)
values (nextval('preduzece_id_seq'),'VegaIT',105,'Novi Sad','Kompanija za IT usluge strastvena u partnerstvu sa klijentima širom sveta kako bi im pomogla da postignu izuzetne poslovne rezultate.');
insert into preduzece(id,naziv,pib,sediste,opis)
values (nextval('preduzece_id_seq'),'Levi9',210,'Novi Sad','Idealan spoj kreativnosti, tehnološke ekspertize i poslovnog duha, vodeæa je digitalna agencija u Belgiji i jedan od 20 najboljih igraèa u Evropi.');
insert into preduzece(id,naziv,pib,sediste,opis)
values (nextval('preduzece_id_seq'),'ComTrade',327,'Beograd','U partnerstvu sa vrhunskim svetskim dobavljaèima kao dobavljaè usluga, kompanija je fokusirana na to da svaki kupac dobije visokokvalitetna IT rešenja u cilju poboljšanja efikasnosti.');
insert into preduzece(id,naziv,pib,sediste,opis)
values (nextval('preduzece_id_seq'),'Emakina',448,'Novi Sad','Pružalac IT konsultantskih usluga i razvoja softvera sa preko 120+ IT profesionalaca koji se nalaze na meðunarodnom nivou.');
insert into preduzece(id,naziv,pib,sediste,opis)
values (nextval('preduzece_id_seq'),'AntColony',569,'Sarajevo','Strateški digitalni partneri inovativnim kompanijama');
insert into preduzece(id,naziv,pib,sediste,opis)
values (nextval('preduzece_id_seq'),'DataZup',675,'Sarajevo','Kompanija pruza klijentima kvalitetne usluge i rešenja za veb, razvoj softvera i e-trgovine.');


/*table sektor*/
insert into sektor(id,naziv,oznka,preduzece)
values (nextval('sektor_id_seq'),'it','sektor it',1);
insert into sektor(id,naziv,oznka,preduzece)
values (nextval('sektor_id_seq'),'marketing','sektor m',2);
insert into sektor(id,naziv,oznka,preduzece)
values (nextval('sektor_id_seq'),'prodaja','sektor pr',3);
insert into sektor(id,naziv,oznka,preduzece)
values (nextval('sektor_id_seq'),'proizvodnja','sektor prz',4);
insert into sektor(id,naziv,oznka,preduzece)
values (nextval('sektor_id_seq'),'finansije','sektor f',5);



/*table radnik*/
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Marija','Petrovic',14589,4,1);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Anja','Janjusevic',236589,2,2);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Nikolina','Bodo',147825,2,2);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Andreja','Vukovic',984712,1,5);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Natasa','Jovanovic',321466,4,1);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Ljubica','Jovicic',221144,4,1);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Sandra','Lazarevic',369888,1,5);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Andrea','Ilic',255697,2,2);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Sanja','Tica',147289,1,5);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (nextval('radnik_id_seq'),'Mina','Ilic',114643,4,1);



/*inserti za delete*/
insert into obrazovanje(id,naziv,stepen_strucne_spreme,opis)
values (-100,'testIme','testSS','testOpis');
insert into preduzece(id,naziv,pib,sediste,opis)
values (-100,'prNazivTest',459,'prSedisteTest','prOpis');
insert into sektor(id,naziv,oznka,preduzece)
values (-100,'sektorNaziv','sektorTest',1);
insert into radnik(id,ime,prezime,broj_lk,obrazovanje,sektor)
values (-100,'testIme','testPrz1',123,1,1);
