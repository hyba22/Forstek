import React, { useEffect, useState } from 'react';
import { FiBell, FiDatabase, FiEdit2, FiLock, FiSave, FiSettings, FiUser, FiX } from 'react-icons/fi';
import styles from './Parametres.module.css';

// Schéma de configuration amélioré
const SETTINGS_SCHEMA = {
  general: {
    label: "Général",
    icon: <FiSettings />,
    fields: {
      language: {
        label: "Langue",
        type: "select",
        options: [
          { value: "fr", label: "Français" },
          { value: "en", label: "English" },
          { value: "es", label: "Español" }
        ],
        defaultValue: "fr",
        description: "Définit la langue de l'interface"
      },
      theme: {
        label: "Thème",
        type: "select",
        options: [
          { value: "light", label: "Clair" },
          { value: "dark", label: "Sombre" },
          { value: "system", label: "Système" }
        ],
        defaultValue: "light",
        description: "Personnalise l'apparence de l'application"
      }
    }
  },
  account: {
    label: "Compte",
    icon: <FiUser />,
    fields: {
      username: {
        label: "Nom d'utilisateur",
        type: "text",
        defaultValue: "admin",
        description: "Votre identifiant de connexion"
      },
      email: {
        label: "Email",
        type: "text",
        defaultValue: "admin@example.com",
        description: "Adresse email associée au compte"
      }
    }
  },
  security: {
    label: "Sécurité",
    icon: <FiLock />,
    fields: {
      twoFactorAuth: {
        label: "Authentification à deux facteurs",
        type: "switch",
        defaultValue: false,
        description: "Active une vérification supplémentaire lors de la connexion"
      },
      passwordExpiry: {
        label: "Expiration du mot de passe",
        type: "select",
        options: [
          { value: 30, label: "30 jours" },
          { value: 60, label: "60 jours" },
          { value: 90, label: "90 jours" },
          { value: 0, label: "Jamais" }
        ],
        defaultValue: 90,
        description: "Délai avant que le mot de passe ne doive être changé"
      }
    }
  },
  notifications: {
    label: "Notifications",
    icon: <FiBell />,
    fields: {
      emailNotifications: {
        label: "Notifications par email",
        type: "switch",
        defaultValue: true,
        description: "Active les notifications envoyées par email"
      },
      pushNotifications: {
        label: "Notifications push",
        type: "switch",
        defaultValue: true,
        description: "Active les notifications sur votre appareil"
      }
    }
  },
  advanced: {
    label: "Avancé",
    icon: <FiDatabase />,
    fields: {
      dataRetention: {
        label: "Rétention des données",
        type: "select",
        options: [
          { value: 30, label: "30 jours" },
          { value: 90, label: "3 mois" },
          { value: 365, label: "1 an" },
          { value: 0, label: "Indéfiniment" }
        ],
        defaultValue: 90,
        description: "Durée de conservation des données historiques"
      },
      analytics: {
        label: "Partage des données analytiques",
        type: "switch",
        defaultValue: false,
        description: "Contribuez à l'amélioration du produit en partageant des données anonymes"
      }
    }
  }
};

const Parametres = () => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({});
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [notification, setNotification] = useState({ show: false, message: '', type: '' });
  const [originalSettings, setOriginalSettings] = useState({});
  const [currentTheme, setCurrentTheme] = useState('light');

  // Initialisation des paramètres
  useEffect(() => {
    const initializeSettings = () => {
      // Charger depuis localStorage si disponible
      const savedSettings = localStorage.getItem('appSettings');
      let initialSettings = {};

      if (savedSettings) {
        initialSettings = JSON.parse(savedSettings);
      } else {
        // Créer des paramètres par défaut
        Object.keys(SETTINGS_SCHEMA).forEach(tab => {
          initialSettings[tab] = {};
          Object.keys(SETTINGS_SCHEMA[tab].fields).forEach(field => {
            initialSettings[tab][field] = SETTINGS_SCHEMA[tab].fields[field].defaultValue;
          });
        });
      }

      setSettings(initialSettings);
      setOriginalSettings(JSON.parse(JSON.stringify(initialSettings)));
      
      // Appliquer le thème
      applyTheme(initialSettings.general?.theme || 'light');
      setIsLoading(false);
    };

    initializeSettings();
  }, []);

  // Appliquer le thème sélectionné
  const applyTheme = (theme) => {
    let themeToApply = theme;
    
    if (theme === 'system') {
      themeToApply = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }

    setCurrentTheme(themeToApply);
    document.documentElement.setAttribute('data-theme', themeToApply);
    localStorage.setItem('theme', themeToApply);
    
    // Ajouter/supprimer la classe darkMode sur le body
    if (themeToApply === 'dark') {
      document.body.classList.add('darkMode');
    } else {
      document.body.classList.remove('darkMode');
    }
  };

  // Gérer les changements de préférence système pour le thème
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => {
      if (settings.general?.theme === 'system') {
        applyTheme('system');
      }
    };

    mediaQuery.addEventListener('change', handler);
    return () => mediaQuery.removeEventListener('change', handler);
  }, [settings.general?.theme]);

  const handleChange = (tab, field, value) => {
    const newSettings = {
      ...settings,
      [tab]: {
        ...settings[tab],
        [field]: value
      }
    };

    setSettings(newSettings);

    // Appliquer immédiatement les changements de thème
    if (tab === 'general' && field === 'theme') {
      applyTheme(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simuler une sauvegarde asynchrone
    setTimeout(() => {
      // Sauvegarder dans localStorage
      localStorage.setItem('appSettings', JSON.stringify(settings));
      setOriginalSettings(JSON.parse(JSON.stringify(settings)));
      setEditMode(false);
      showNotification('Paramètres sauvegardés avec succès', 'success');
      setIsLoading(false);
    }, 1000);
  };

  const handleCancel = () => {
    setSettings(JSON.parse(JSON.stringify(originalSettings)));
    setEditMode(false);
    
    // Restaurer le thème précédent
    if (originalSettings.general?.theme) {
      applyTheme(originalSettings.general.theme);
    }
  };

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: '', type: '' }), 3000);
  };

  const renderField = (tab, fieldName, fieldConfig) => {
    const value = settings[tab]?.[fieldName];
    
    if (isLoading) {
      return <div className={styles.skeletonLoader}></div>;
    }

    switch(fieldConfig.type) {
      case 'select':
        return (
          <div className={styles.fieldContainer}>
            {editMode ? (
              <select
                value={value}
                onChange={(e) => handleChange(tab, fieldName, e.target.value)}
                className={styles.inputField}
                disabled={isLoading}
              >
                {fieldConfig.options.map(opt => (
                  <option key={opt.value} value={opt.value}>{opt.label}</option>
                ))}
              </select>
            ) : (
              <div className={styles.settingValue}>
                {fieldConfig.options.find(o => o.value === value)?.label || value}
              </div>
            )}
          </div>
        );

      case 'switch':
        return (
          <div className={styles.fieldContainer}>
            <label className={styles.switch}>
              <input
                type="checkbox"
                checked={value}
                onChange={(e) => handleChange(tab, fieldName, e.target.checked)}
                disabled={!editMode || isLoading}
              />
              <span className={`${styles.slider} ${isLoading ? styles.disabled : ''}`}></span>
            </label>
          </div>
        );

      case 'text':
        return (
          <div className={styles.fieldContainer}>
            {editMode ? (
              <input
                type="text"
                value={value}
                onChange={(e) => handleChange(tab, fieldName, e.target.value)}
                className={styles.inputField}
                disabled={isLoading}
              />
            ) : (
              <div className={styles.settingValue}>{value}</div>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  if (isLoading && Object.keys(settings).length === 0) {
    return (
      <div className={styles.loadingContainer}>
        <div className={styles.spinner}></div>
        <p>Chargement des paramètres...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.container} ${currentTheme === 'dark' ? styles.darkMode : ''}`}>
      <header className={styles.header}>
        <h1 className={styles.title}>Paramètres du Système</h1>
        <p className={styles.subtitle}>Configurez les préférences selon vos besoins</p>
      </header>

      {notification.show && (
        <div className={`${styles.notification} ${styles[notification.type]}`}>
          {notification.message}
        </div>
      )}

      <div className={styles.tabsContainer}>
        <div className={styles.tabs}>
          {Object.entries(SETTINGS_SCHEMA).map(([tabKey, tabConfig]) => (
            <button
              key={tabKey}
              className={`${styles.tab} ${activeTab === tabKey ? styles.activeTab : ''}`}
              onClick={() => setActiveTab(tabKey)}
            >
              <span className={styles.tabIcon}>{tabConfig.icon}</span>
              <span className={styles.tabLabel}>{tabConfig.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className={styles.content}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.tabContent}>
            <h2 className={styles.tabTitle}>
              {SETTINGS_SCHEMA[activeTab].icon}
              {SETTINGS_SCHEMA[activeTab].label}
            </h2>
            
            <div className={styles.settingsGrid}>
              {Object.entries(SETTINGS_SCHEMA[activeTab].fields).map(([fieldName, fieldConfig]) => (
                <div key={fieldName} className={styles.settingItem}>
                  <div className={styles.settingHeader}>
                    <label className={styles.settingLabel}>{fieldConfig.label}</label>
                    {renderField(activeTab, fieldName, fieldConfig)}
                  </div>
                  {fieldConfig.description && (
                    <p className={styles.fieldDescription}>{fieldConfig.description}</p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className={styles.actions}>
            {editMode ? (
              <>
                <button
                  type="button"
                  className={`${styles.button} ${styles.secondaryButton}`}
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  <FiX /> Annuler
                </button>
                <button
                  type="submit"
                  className={`${styles.button} ${styles.primaryButton}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <span className={styles.spinner}></span>
                  ) : (
                    <>
                      <FiSave /> Enregistrer
                    </>
                  )}
                </button>
              </>
            ) : (
              <button
                type="button"
                className={`${styles.button} ${styles.primaryButton}`}
                onClick={() => setEditMode(true)}
              >
                <FiEdit2 /> Modifier
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Parametres;