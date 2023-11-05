package rva.repository;


import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.model.Preduzece;
import rva.model.Sektor;

public interface SektorRepository extends JpaRepository<Sektor, Integer> {

Collection <Sektor> findByNazivContainingIgnoreCase(String naziv);
Collection <Sektor> findByPreduzece(Preduzece preduzece);
	
}
