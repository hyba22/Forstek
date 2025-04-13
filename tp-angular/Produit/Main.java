import java.util.Scanner;
public class Main {

  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // Demander à l'utilisateur de choisir le type de produit
    System.out.println("Choisissez le type de produit :");
    System.out.println("1. Produit");
    System.out.println("2. Produit Soldes");
    System.out.println("3. Produit Promotion");
    int choix = scanner.nextInt();
    scanner.nextLine();  // Consommer le retour à la ligne

    // Demander les informations sur le produit
    System.out.print("Nom du produit : ");
    String nom = scanner.nextLine();
    System.out.print("Prix du produit : ");
    double prix = scanner.nextDouble();

    Produit produit = null;

    if (choix == 1) {
      // Produit simple
      produit = new Produit(nom, prix);
    } else if (choix == 2) {
      // Produit Soldes
      System.out.print("Pourcentage de réduction : ");
      double reduction = scanner.nextDouble();
      produit = new ProduitSolde(nom, prix, reduction);
    } else if (choix == 3) {
      // Produit Promotion
      System.out.print("Prix promotionnel : ");
      double prixPromo = scanner.nextDouble();
      produit = new ProduitPromotion(nom, prix, prixPromo);
    } else {
      System.out.println("Choix invalide.");
      return;
    }
    // Afficher les détails du produit en utilisant le polymorphisme
    produit.afficherDetails();
  }


}
