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
import rva.model.Obrazovanje;
import rva.repository.ObrazovanjeRepository;
@CrossOrigin //da bi obezbedili kom izmedju beka i fronta bez problema, i sa kojih domena dozvoljavamo pristup bekendu
//osluskuje zahteve ka aplikaciji
@RestController
@Api(tags = {"Obrazovanje CRUD operacije"})
public class ObrazovanjeController {
	//vrsi injekciju zavisnosti-Depenendency injection
	
	@Autowired
	private ObrazovanjeRepository repository;
	
	@Autowired //izvrsavanje upita bez posredstva 
	private JdbcTemplate jdbcTemplate;
	
	@GetMapping("/obrazovanje")
	@ApiOperation(value = "Vraća kolekciju svih obrazovanja iz baze podataka")
	public Collection<Obrazovanje> returnAll() {
		
		//posto smo stavili autowired nece vratiti nul 
		return repository.findAll();
	}
	
	@GetMapping("/obrazovanje/{id}")
	@ApiOperation(value = "Vraća obrazovanje iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Obrazovanje getObrazovanjeById(@PathVariable int id ) {
    
		return repository.getById(id);
		
	}
	
	@GetMapping("/obrazovanje/naziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju svih obrazovanja iz baze podataka koji u nazivu sadrže string prosleđen kao path varijabla")
	public Collection<Obrazovanje> getObrazovanjeByNaziv(@PathVariable String naziv) {
    
		return repository.findByNazivContainingIgnoreCase(naziv);
		
	}
	
	@PostMapping("/obrazovanje")
	@ApiOperation(value = "Upisuje obrazovanje u bazu podataka")
	public ResponseEntity<Obrazovanje> createObrazovanje(@RequestBody Obrazovanje obrazovanje){
		if(repository.existsById(obrazovanje.getId())) {
			return new ResponseEntity<Obrazovanje>(HttpStatus.CONFLICT);
			
		}
		else
		{
			Obrazovanje temp=repository.save(obrazovanje);
			return new ResponseEntity<Obrazovanje>(temp,HttpStatus.CREATED);
		}
	}
	
	@PutMapping("/obrazovanje")
	@ApiOperation(value = "Modifikuje postojeće obrazovanje baze podataka")
	public ResponseEntity<Obrazovanje> updateObrazovanje(@RequestBody Obrazovanje obrazovanje){
		
		if(repository.existsById(obrazovanje.getId())) {
             repository.save(obrazovanje);
             return new ResponseEntity<Obrazovanje>(HttpStatus.OK);
		}
		else
		{
			return new ResponseEntity<Obrazovanje>(HttpStatus.CONFLICT);

		}
	}
	

	@DeleteMapping("/obrazovanje/{id}")
	@ApiOperation(value = "Briše postojeće obrazovanje baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<Obrazovanje> deleteObrazovanje(@PathVariable int id){
		if(repository.existsById(id)) {
			
		if(id==-100) {
			repository.deleteById(id);
            jdbcTemplate.execute("Insert into obrazovanje(\"id\",\"naziv\",\"opis\",\"stepen_strucne_spreme\") values(-100,'testIme','testOpis','testSS')");
            return new ResponseEntity<Obrazovanje>(HttpStatus.OK);

		}
		else {
			repository.deleteById(id);
			return new ResponseEntity<Obrazovanje>(HttpStatus.OK);

		}
		}
	    	else
		{
			return new ResponseEntity<Obrazovanje>(HttpStatus.NOT_FOUND);

		}
		
		
	}
	
	
}
