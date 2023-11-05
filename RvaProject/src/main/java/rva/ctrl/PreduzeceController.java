package rva.ctrl;

import java.util.Collection;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import rva.model.Preduzece;
import rva.repository.PreduzeceRepository;
@CrossOrigin
@RestController
@Api(tags = {"Preduzece CRUD operacije"})
public class PreduzeceController {
	
	@Autowired
	private PreduzeceRepository repository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/preduzece")
	@ApiOperation(value = "Vraća kolekciju svih preduzeća iz baze podataka")
	public Collection<Preduzece> returnAll(){
		return repository.findAll();
	}
	
	@GetMapping("/preduzece/{id}")
	@ApiOperation(value = "Vraća preduzeće iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Preduzece getPreduzeceById(@PathVariable int id) {
		return repository.getById(id);
	}
	
	@GetMapping("/preduzece/naziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju svih preduzeća iz baze podataka koji u nazivu sadrže string prosleđen kao path varijabla")
	public Collection<Preduzece> getPreduzeceByNaziv(@PathVariable String naziv) {
    
		return repository.findByNazivContainingIgnoreCase(naziv);
		
	}
	
	@PostMapping("/preduzece")
	@ApiOperation(value = "Upisuje preduzeće u bazu podataka")
	public ResponseEntity<Preduzece> createPreduzece(@RequestBody Preduzece preduzece){
		if(repository.existsById(preduzece.getId())) {
			return new ResponseEntity<Preduzece>(HttpStatus.CONFLICT);
			
		}
		else
		{
			Preduzece temp=repository.save(preduzece);
			return new ResponseEntity<Preduzece>(temp,HttpStatus.CREATED);
		}
	}
	
	@PutMapping("/preduzece")
	@ApiOperation(value = "Modifikuje postojeće preduzeće baze podataka")
	public ResponseEntity<Preduzece> updatePreduzece(@RequestBody Preduzece preduzece){
		
		if(repository.existsById(preduzece.getId())) {
             repository.save(preduzece);
             return new ResponseEntity<Preduzece>(HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<Preduzece>(HttpStatus.CONFLICT);

		}
	}
	

	@DeleteMapping("/preduzece/{id}")
	@ApiOperation(value = "Briše postojeće preduzeće baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<Preduzece> deletePreduzece(@PathVariable int id){
		if(repository.existsById(id)) {
			
		if(id==-100) {
			repository.deleteById(id);
            jdbcTemplate.execute("Insert into preduzece(\"id\",\"naziv\",\"pib\",\"sediste\",\"opis\") values(-100,'prNazivTest',459,'prSedisteTest','prOpis')");
            return new ResponseEntity<Preduzece>(HttpStatus.OK);

		}
		else {
			repository.deleteById(id);
			return new ResponseEntity<Preduzece>(HttpStatus.OK);

		}
		}
	    	else
		{
			return new ResponseEntity<Preduzece>(HttpStatus.NOT_FOUND);

		}
		
		
	}

}
