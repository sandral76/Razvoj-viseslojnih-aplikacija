package rva.repository;

import java.math.BigDecimal;
import java.util.Collection;

import java.util.Collection;

import org.springframework.data.jpa.repository.JpaRepository;

import rva.model.Obrazovanje;
import rva.model.Radnik;
import rva.model.Sektor;

public interface RadnikRepository extends JpaRepository<Radnik, Integer> {
//jpa rep-interfejs koji prepoznaje metode za pretrazivanje
	
Collection<Radnik> findByObrazovanje(Obrazovanje obrazovanje);

Collection<Radnik> findByBrojLkOrderById(Integer brojLk);

Collection<Radnik> findBySektor(Sektor sektor);
}


