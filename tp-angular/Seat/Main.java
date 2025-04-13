import java.util.Scanner;
public class Main {



  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);

    // Initialisation de la salle de cinéma avec 5 rangées et 6 sièges par rangée
    CinemaHall cinemaHall = new CinemaHall(5, 6);

    while (true) {
      // Affichage du menu
      System.out.println("\n----- Menu -----");
      System.out.println("1. Voir les sièges disponibles");
      System.out.println("2. Réserver un siège");
      System.out.println("3. Quitter");
      System.out.print("Votre choix : ");
      int choice = scanner.nextInt();

      switch (choice) {
        case 1:
          // Afficher les sièges disponibles
          cinemaHall.displaySeats();
          break;
        case 2:
          // Demander les détails pour réserver un siège
          System.out.print("Entrez le numéro de rangée : ");
          int row = scanner.nextInt();
          System.out.print("Entrez le numéro de siège : ");
          int seatNumber = scanner.nextInt();
          // Réserver le siège
          cinemaHall.reserveSeat(row, seatNumber);
          break;
        case 3:
          // Quitter le programme
          System.out.println("Merci d'avoir utilisé le système de réservation.");
          return; // Quitte le programme
        default:
          System.out.println("Choix invalide. Veuillez réessayer.");
      }
    }
  }


}
