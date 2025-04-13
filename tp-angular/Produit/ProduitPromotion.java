public class ProduitPromotion extends Produit {
  private double prixPromo;


  public ProduitPromotion(String nom, double prix, double prixPromo) {
    super(nom, prix);
    this.prixPromo = prixPromo;
  }

  public double getPrixPromo() {
    return prixPromo;
  }

  public void setPrixPromo(double prixPromo) {
      this.prixPromo = prixPromo;
  }

  @Override
  public void afficherDetails() {
    System.out.println("Nom du produit : " + getNom());
    System.out.println("Prix initial : " + getPrix()+ " €");
    System.out.println("Prix promotionnel : " + prixPromo + " €");
  }
}
