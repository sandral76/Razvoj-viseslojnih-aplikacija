package rva.model;

import java.io.Serializable;
import javax.persistence.*;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import java.util.List;


/**
 * The persistent class for the obrazovanje database table.
 * 
 */
@Entity  //kaze da je klasa neka tabela u bazi, ili se ovo mapira u tebalu ili tabela u klasu
@JsonIgnoreProperties({"hibernateLazyInitializer","handler"})
@NamedQuery(name="Obrazovanje.findAll", query="SELECT o FROM Obrazovanje o")
public class Obrazovanje implements Serializable {
	private static final long serialVersionUID = 1L;

	@Id  //nad obelezjem koje predstavlja primarno obelezje kolone u kojoj se zapisuje prim klj
	@SequenceGenerator(name="OBRAZOVANJE_ID_GENERATOR", sequenceName="OBRAZOVANJE_ID_SEQ",allocationSize=1) //omogucava kreiranje a oji se ref, povezuje sekvencu iz baze sa objektom u app koji se koristi u sl anotaciji
	@GeneratedValue(strategy=GenerationType.SEQUENCE, generator="OBRAZOVANJE_ID_GENERATOR") //uvek kad postoji id anotacija, 
	                                     //sequence samo kad se radi mapiranje, generator-ukazuje na ob iz seq gen
	private Integer id;

	private String naziv;

	private String opis;

	@Column(name="stepen_strucne_spreme")
	private String stepenStrucneSpreme;

	//bi-directional many-to-one association to Radnik
	@OneToMany(mappedBy="obrazovanje")  //one se odnosi na klasu obr-gde se nalazimo, a many na klasu ispod-ovde radnik(lista necega)
	         //maped by-vezom se upravlja preko obr koji se nalazi u klasi radnik, tj u klasi ispo se nalazi strani kljuc koji se zove obr                   
	@JsonIgnore
	private List<Radnik> radniks;

	public Obrazovanje() {
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

	public String getOpis() {
		return this.opis;
	}

	public void setOpis(String opis) {
		this.opis = opis;
	}

	public String getStepenStrucneSpreme() {
		return this.stepenStrucneSpreme;
	}

	public void setStepenStrucneSpreme(String stepenStrucneSpreme) {
		this.stepenStrucneSpreme = stepenStrucneSpreme;
	}

	public List<Radnik> getRadniks() {
		return this.radniks;
	}

	public void setRadniks(List<Radnik> radniks) {
		this.radniks = radniks;
	}

	public Radnik addRadnik(Radnik radnik) {
		getRadniks().add(radnik);
		radnik.setObrazovanje(this);

		return radnik;
	}

	public Radnik removeRadnik(Radnik radnik) {
		getRadniks().remove(radnik);
		radnik.setObrazovanje(null);

		return radnik;
	}

}