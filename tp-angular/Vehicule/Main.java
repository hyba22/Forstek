import java.util.Scanner;

public class Main {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    Vehicule vehicule ;

    System.out.println("Choisissez le type de véhicule (1: Voiture, 2: Camion) : ");
    int choix = scanner.nextInt();

    System.out.print("Entrez la marque du véhicule : ");
    String marque = scanner.nextLine();

    System.out.print("Entrez le prix par jour (€) : ");
    double prixParJour = scanner.nextDouble();

    if (choix == 1) {
      System.out.print("Entrez le type de carburant (essence/diesel) : ");
      String typeCarburant = scanner.nextLine();
      vehicule = new Voiture(marque, prixParJour, typeCarburant);
    } else if (choix == 2) {
      System.out.print("Entrez le poids maximum (en tonnes) : ");
      double poidsMax = scanner.nextDouble();
      vehicule = new Camion(marque, prixParJour, poidsMax);
    } else {
      System.out.println("Choix invalide !");
      return;
    }

    System.out.print("Entrez le nombre de jours de location : ");
    int jours = scanner.nextInt();

    double prixTotal = vehicule.calculerPrixLocation(jours);
    System.out.println("Le prix total de location pour " + jours + " jours est : " + prixTotal + "DT");

  }
}
