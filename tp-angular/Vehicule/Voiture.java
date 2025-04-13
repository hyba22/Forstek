public class Voiture extends Vehicule {
  private String typeCarburant;

  public Voiture(String marque, double prixParJour, String typeCarburant) {
    super(marque, prixParJour);
    this.typeCarburant = typeCarburant;
  }

  public String getTypeCarburant() {
    return typeCarburant;
  }

  public void setTypeCarburant(String typeCarburant) {
    this.typeCarburant = typeCarburant;
  }

  @Override
  public double calculerPrixLocation(int jours) {
    double prixTotal = super.calculerPrixLocation(jours);
    if ("diesel".equalsIgnoreCase(typeCarburant)) {
      prixTotal += 10 * jours;
    }
    return prixTotal;
  }
}
