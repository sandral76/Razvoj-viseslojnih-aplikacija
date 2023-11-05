package rva.ctrl;

import java.math.BigDecimal;
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
import rva.model.Radnik;
import rva.model.Sektor;
import rva.repository.ObrazovanjeRepository;
import rva.repository.RadnikRepository;
import rva.repository.SektorRepository;
@CrossOrigin
@RestController
@Api(tags = {"Radnik CRUD operacije"})
public class RadnikController {
	
	@Autowired
	private RadnikRepository repository;
	
	@Autowired
	private JdbcTemplate jdbcTemplate;
	
	@Autowired
	private ObrazovanjeRepository obrazovanjeRepository;
	
	@Autowired
	private SektorRepository sektorRepository;
	
	@GetMapping("/radnik")
	@ApiOperation(value = "Vraća kolekciju svih radnika iz baze podataka")
	public Collection<Radnik> returnAll(){
		return repository.findAll();
	}

	@GetMapping("/radnik/{id}")
	@ApiOperation(value = "Vraća radnika iz baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public Radnik getRadnikById(@PathVariable int id) {
		return repository.getById(id);
	}
	
	@GetMapping("/radnik/obrazovanje/{obrazovanje}")
	@ApiOperation(value = "Vraća kolekciju svih radnika iz baze podataka koji kao obrazovanje sadrže vrednost prosleđenu kao path varijabla")
	public Collection<Radnik> getRadnikByObrazovanje(@PathVariable int obrazovanje) {
		Obrazovanje temp=obrazovanjeRepository.getById(obrazovanje);
		return repository.findByObrazovanje(temp);
	}
	
	@GetMapping("/radnik/brojLk/{brojLk}")
	@ApiOperation(value = "Vraća kolekciju svih radnika iz baze podataka koji kao broj lične karte sadrže broj prosleđen kao path varijabla")
	public Collection<Radnik> getRadnikByBrojLk(@PathVariable Integer brojLk) {
		return repository.findByBrojLkOrderById(brojLk);
	}
	
	@GetMapping("/radnik/sektor/{sektor}")
	@ApiOperation(value = "Vraća kolekciju svih radnika iz baze podataka koji kao sektor sadrže string prosleđen kao path varijabla")
	public Collection<Radnik> getRadnikBySektor(@PathVariable int sektor) {
		Sektor temp=sektorRepository.getById(sektor);
		return repository.findBySektor(temp);
	}
	
	@PostMapping("/radnik")
	@ApiOperation(value = "Upisuje radnika u bazu podataka")
	public ResponseEntity<Radnik> createRadnik(@RequestBody Radnik radnik){
		if(repository.existsById(radnik.getId())) {
			return new ResponseEntity<Radnik>(HttpStatus.CONFLICT);
		}else {
			Radnik temp=repository.save(radnik);
			return new ResponseEntity<Radnik>(temp,HttpStatus.CREATED);
		}
	}
	
	@PutMapping("/radnik")
	@ApiOperation(value = "Modifikuje postojećeg radnika baze podataka")
	public ResponseEntity<Radnik> updateRadnik(@RequestBody Radnik radnik){
		if(repository.existsById(radnik.getId())) {
			repository.save(radnik);
			return new ResponseEntity<Radnik>(HttpStatus.OK);
		}else {
			return new ResponseEntity<Radnik>(HttpStatus.NOT_FOUND);

		}
	}
	
	
	@DeleteMapping("/radnik/{id}")
	@ApiOperation(value = "Briše postojećeg radnika baze podataka čiji je id vrednost prosleđena kao path varijabla")
	public ResponseEntity<Radnik> deleteRadnik(@PathVariable int id){
		if(repository.existsById(id)) {
			if(id==-100) {
				repository.deleteById(id);
				jdbcTemplate.execute("insert into radnik(\"id\",\"broj_lk\",\"ime\",\"prezime\",\"obrazovanje\",\"sektor\")"
				+"values(-100,'radnikImeTest','radnikImTest',123,1,1)");
				return new ResponseEntity<Radnik>(HttpStatus.OK);

			}else {
				repository.deleteById(id);
				return new ResponseEntity<Radnik>(HttpStatus.OK);

			}
		}else {
			return new ResponseEntity<Radnik>(HttpStatus.NOT_FOUND);

		}
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
