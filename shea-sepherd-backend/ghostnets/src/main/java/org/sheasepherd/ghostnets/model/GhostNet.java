package org.sheasepherd.ghostnets.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import jakarta.validation.Valid;

@Entity
public class GhostNet {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull(message = "Die Angabe des Breitengrads ist verpflichtend")
    @DecimalMin(value = "-90.0", message = "Breitengrad darf nicht kleiner als -90 sein")
    @DecimalMax(value = "90.0", message = "Breitengrad darf nicht größer als 90 sein")
    private Double latitude;

    @NotNull(message = "Die Angabe des Längengrads ist verpflichtend")
    @DecimalMin(value = "-180.0", message = "Längengrad darf nciht kleiner als -180 sein")
    @DecimalMax(value = "180.0", message = "Längengrad darf nicht größer als 180 sein")
    private Double longitude;

    @NotBlank(message = "Die Angabe einer geschätzten Größe ist verpflichtend")
    private String sizeEstimate;

    @Enumerated(EnumType.STRING)
    private Status status;

    @ManyToOne
    private Person salvager; //darf null sein

    @NotNull(message = "Dem Netz muss eine meldende Person zugeordnet sein!")
    @Valid
    @ManyToOne
    private Person reporter;

    //Standard-Constructor
    public GhostNet() {}

    //Getter & Setter
    public Long getId() { return id; }

    public double getLatitude() { return latitude; }
    public void setLatitude(double latitude) { this.latitude = latitude; }

    public double getLongitude() { return longitude; }
    public void setLongitude(double longitude) { this.longitude = longitude; }

    public String getSizeEstimate() { return sizeEstimate; }
    public void setSizeEstimate(String sizeEstimate) { this.sizeEstimate = sizeEstimate; }

    public Status getStatus() { return status; }
    public void setStatus(Status status) { this.status = status; }

    public Person getSalvager() { return salvager; }
    public void setSalvager(Person salvager) { this.salvager = salvager; }

    public Person getReporter() { return reporter; }
    public void setReporter(Person reporter) { this.reporter = reporter; }

}
