class PayPal extends Paiement {
  @Override
  public void effectuerPaiement(double montant) {
    System.out.println("Paiement de " + montant + "€ effectué via PayPal.");
  }
}
