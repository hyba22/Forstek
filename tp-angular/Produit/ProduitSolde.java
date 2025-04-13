public class ProduitSolde extends Produit {
  private double pourcentageReduction;

  public ProduitSolde(String nom, double prix, double pourcentageReduction) {
    super(nom, prix);
    this.pourcentageReduction = pourcentageReduction;
  }

  public double getPourcentageReduction() {
    return pourcentageReduction;
  }

  public void setPourcentageReduction(double pourcentageReduction) {
      this.pourcentageReduction = pourcentageReduction;
  }

  @Override
  public void afficherDetails() {
    double PrixReduction = getPrix() * (1 - pourcentageReduction / 100);

    super.afficherDetails();
    // System.out.println("Nom du produit : " + getNom());
    // System.out.println("Prix initial : " + getPrix() + " €");
    System.out.println("Réduction : " + pourcentageReduction + "%");
    System.out.println("Prix après réduction : " + PrixReduction + " €");
  }
}
