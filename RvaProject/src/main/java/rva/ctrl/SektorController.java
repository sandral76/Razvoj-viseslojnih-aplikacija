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
import rva.model.Sektor;
import rva.repository.PreduzeceRepository;
import rva.repository.SektorRepository;
@CrossOrigin
@RestController
@Api(tags = {"Sektor CRUD operacije"})
public class SektorController {
	
	@Autowired
	private SektorRepository repository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private PreduzeceRepository preduzeceRepository;
	
	@GetMapping("/sektor")
	@ApiOperation(value = "Vraća kolekciju svih sektora iz baze podataka")
	public Collection<Sektor> returnAll(){
		return repository.findAll();
	}
	
	@GetMapping("/sektor/{id}")
	@ApiOperation(value = "Vraća sektor iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Sektor getSektorByID(@PathVariable int id) {
		return repository.getById(id);
	}
	
	@GetMapping("/sektor/naziv/{naziv}")
	@ApiOperation(value = "Vraća kolekciju svih sektora iz baze podataka koji u nazivu sadrže string prosleđen kao path varijabla")
	public Collection<Sektor> getSektorByNaziv(@PathVariable String naziv){
			return repository.findByNazivContainingIgnoreCase(naziv);
	}

	@GetMapping("/sektor/preduzece/{preduzece}")
	@ApiOperation(value = "Vraća kolekciju svih sektora iz baze podataka koji kao preduzeće sadrže vrednost prosleđenu kao path varijabla")
	public Collection<Sektor> getSektorByPreduzece(@PathVariable int preduzece){
		Preduzece temp=preduzeceRepository.getById(preduzece);
		return repository.findByPreduzece(temp);
	}
	
	
	@PostMapping("/sektor")
	@ApiOperation(value = "Upisuje sektor u bazu podataka")
	public ResponseEntity<Sektor> createSektor(@RequestBody Sektor sektor){
		if(repository.existsById(sektor.getId())) {
			return new ResponseEntity<Sektor>(HttpStatus.CONFLICT);	
			}
		else {
				Sektor temp=repository.save(sektor);
				return new ResponseEntity<Sektor>(temp,HttpStatus.CREATED);
			}
	}
	
	@PutMapping("/sektor")
	@ApiOperation(value = "Modifikuje postojeći sektor baze podataka")
	public ResponseEntity<Sektor> updateSektor(@RequestBody Sektor sektor){
		if(repository.existsById(sektor.getId())) {
			repository.save(sektor);
			return new ResponseEntity<Sektor>(HttpStatus.OK);
		} 
		else {
			return new ResponseEntity<Sektor>(HttpStatus.NOT_FOUND);

		}
	}
	
	@DeleteMapping("/sektor/{id}")
	@ApiOperation(value = "Briše postojeći sektor baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<Sektor> deleteSektor(@PathVariable int id){
		if(repository.existsById(id)) {
			if(id==-100) {
				repository.deleteById(id);
				jdbcTemplate.execute("insert into sektor(\"id\",\"naziv\",\"oznka\",\"preduzece\")"
						+"values(-100,'sektorNaziv','sektorTest',1)");
				return new ResponseEntity<Sektor>(HttpStatus.OK);
			}else {
				repository.deleteById(id);
				return new ResponseEntity<Sektor>(HttpStatus.OK);
			}
		}else {
			return new ResponseEntity<Sektor>(HttpStatus.NOT_FOUND);

		}
	}
	
	
	

}
