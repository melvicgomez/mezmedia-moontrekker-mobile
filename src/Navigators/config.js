/**
 * app://moontrekker/bcoin-history
 *
 * Announcement: announcement/{announcementId}
 * Leaderboards: leaderboards
 * Training Index: race
 * Challenge Index: challenges
 * Race Index: race
 * Profile: my-profile
 * Sponsors: sponsors
 * Settings: settings
 *
 * To Follow:
 * Challenge Details: challenges/{challenge_id}
 * Challenge Details Continuation: challenges/{challenge_id}/timer   // should I call the page timer?
 * Race Details: race/{challenge_id}
 * Race Details Continuation: race/{challenge_id}/timer   // should I call the page timer?
 * Training Details: training/{challenge_id}
 * Training Details Continuation: training/{challenge_id}/timer   // should I call the page timer?
 *
 */
const config = {
  screens: {
    Home: {
      screens: {
        Leaderboards: {
          screens: {
            Leaderboards: {
              path: 'leaderboards',
            },
          },
        },
        Training: {
          screens: {
            Training: {
              path: 'training',
            },
          },
        },
        Challenges: {
          screens: {
            Challenges: {
              path: 'challenges',
            },
          },
        },
        Race: {
          screens: {
            Race: {
              path: 'race',
            },
          },
        },
        Profile: {
          screens: {
            ['My Profile']: {
              path: 'my-profile',
            },
          },
        },
        Sponsors: {
          screens: {
            Sponsors: {
              path: 'sponsors',
            },
          },
        },
        Settings: {
          screens: {
            Settings: {
              path: 'settings',
            },
          },
        },
      },
    },
    ['Announcement Details']: {
      path: 'announcement/:announcementId',
      parse: {
        announcementId: (announcementId) => `${announcementId}`,
      },
    },
  },
};

export default config;
