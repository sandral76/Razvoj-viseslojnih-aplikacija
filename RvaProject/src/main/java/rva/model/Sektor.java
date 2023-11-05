package rva.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the sektor database table.
 * 
 */
@Entity
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@NamedQuery(name="Sektor.findAll", query="SELECT s FROM Sektor s")
public class Sektor implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id
	@SequenceGenerator(name="SEKTOR_ID_GENERATOR", sequenceName="SEKTOR_ID_SEQ",allocationSize=1)
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="SEKTOR_ID_GENERATOR")
	private Integer id;

	private String naziv;

	private String oznka;

	//bi-directional many-to-one association to Radnik
	@OneToMany(mappedBy="sektor")
	@JsonIgnore
	private List<Radnik> radniks;

	//bi-directional many-to-one association to Preduzece
	@ManyToOne
	@JoinColumn(name="preduzece")
	private Preduzece preduzece;

	public Sektor() {
	}

	public Integer getId() {
		return this.id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getNaziv() {
		return this.naziv;
	}

	public void setNaziv(String naziv) {
		this.naziv = naziv;
	}

	public String getOznka() {
		return this.oznka;
	}

	public void setOznka(String oznka) {
		this.oznka = oznka;
	}

	public List<Radnik> getRadniks() {
		return this.radniks;
	}

	public void setRadniks(List<Radnik> radniks) {
		this.radniks = radniks;
	}

	public Radnik addRadnik(Radnik radnik) {
		getRadniks().add(radnik);
		radnik.setSektor(this);

		return radnik;
	}

	public Radnik removeRadnik(Radnik radnik) {
		getRadniks().remove(radnik);
		radnik.setSektor(null);

		return radnik;
	}

	public Preduzece getPreduzece() {
		return this.preduzece;
	}

	public void setPreduzece(Preduzece preduzece) {
		this.preduzece = preduzece;
	}

}