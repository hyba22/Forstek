export const getProfileRoute = (role) => {
    const routes = {
      admin: '/admin/dashboard',
      porteur: '/profile/porteur',
      startup: '/profile/startup',
      stagiaire: '/profile/stagiaire',
      partenaire: '/profile/partenaire',
      investisseur: '/profile/investisseur',
      freelance: '/profile/freelance'
    };
    return routes[role] || '/';
  };