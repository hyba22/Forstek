import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    System.out.print("Entrez le montant du paiement : ");
    double montant = scanner.nextDouble();

    System.out.print("Choisissez le type de paiement (1: Carte Bancaire, 2: PayPal) : ");
    int choix = scanner.nextInt();

    Paiement paiement;

    switch (choix) {
      case 1:
        paiement = new CarteBancaire();
        break;
      case 2:
        paiement = new PayPal();
        break;
      default:
        System.out.println("Choix invalide !");
        scanner.close(); // Fermeture du scanner avant de quitter
        return;
    }

    paiement.effectuerPaiement (montant);
    scanner.close(); // Fermeture du scanner après utilisation
  }
}

