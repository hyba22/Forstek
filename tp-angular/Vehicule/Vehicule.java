public class Vehicule {

  private String marque;
  private double prixParJour;

  public Vehicule(String marque, double prixParJour) {
    this.marque = marque;
    this.prixParJour = prixParJour;
  }

  public String getMarque() {
    return marque;
  }

  public void setMarque(String marque) {
    this.marque = marque;
  }

  public double getPrixParJour() {
    return prixParJour;
  }

  public void setPrixParJour(double prixParJour) {
    this.prixParJour = prixParJour;
  }

  public double calculerPrixLocation(int jours) {
    return jours * prixParJour;
  }

  public void afficherDetails() {
    System.out.println("Marque: " + marque + ", Prix par jour: " + prixParJour + " EUR");
  }
}
