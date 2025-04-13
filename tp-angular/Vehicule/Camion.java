public class Camion extends Vehicule {
  // Propriété privée pour le poids maximum
  private double poidsMax;

  public Camion(String marque, double prixParJour, double poidsMax) {
    super(marque, prixParJour);
    this.poidsMax = poidsMax;
  }

  public double getPoidsMax() {
    return poidsMax;
  }

  public void setPoidsMax(double poidsMax) {
    this.poidsMax = poidsMax;
  }

  @Override
  public double calculerPrixLocation(int jours) {
    double prixTotal = super.calculerPrixLocation(jours);

    if (poidsMax > 3000) {
      prixTotal += 50 * jours;
    }
    return prixTotal;
  }
}
