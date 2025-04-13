public class CinemaHall {
  private Seat[][] seats; // Tableau 2D des sièges

  // Constructeur
  public CinemaHall(int rows, int seatsPerRow) {
    seats = new Seat[rows][seatsPerRow];
    // Initialisation des sièges
    for (int i = 0; i < rows; i++) {
      for (int j = 0; j < seatsPerRow; j++) {
        seats[i][j] = new Seat(i + 1, j + 1);
      }
    }
  }

  // Affichage des sièges
  public void displaySeats() {
    for (int i = 0; i < seats.length; i++) {
      System.out.print("Rangée " + (i + 1) + ": ");
      for (int j = 0; j < seats[i].length; j++) {
        seats[i][j].display();
      }
      System.out.println();
    }

    for (int i = 0; i < seats.length; i++) {
      System.out.print("Rangée " + (i + 1) + ": ");
      for (int j = 0; j < seats[i].length; j++) {
        seats[i][j].display();
      }
      System.out.println();
    }
  }

  // Réservation d'un siège
  public boolean reserveSeat(int row, int number) {
    if (row < 1 || row > seats.length || number < 1 || number > seats[0].length) {
      System.out.println("Sélection invalide. Veuillez essayer à nouveau.");
      return false;
    }
    Seat seat = seats[row - 1][number - 1];
    if (seat.isAvailable()) {
      seat.reserve();
      System.out.println("Siège réservé : Rangée " + row + ", Siège " + number);
      return true;
    } else {
      System.out.println("Désolé, ce siège est déjà réservé.");
      return false;
    }
  }


}
