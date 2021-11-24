/**
 *
 * @param Theme can be spread like {Colors, NavigationColors, Gutters, Layout, Common, ...args}
 * @return {*}
 */

// SVGS
import RaceFlagIcon from '@/Assets/Svgs/flag-icon.svg';
import FundRaisingIcon from '@/Assets/Svgs/fund-raising-icon.svg';
import MPIcon from '@/Assets/Svgs/moontrekker-points-icon.svg';
import MPIconPrimary from '@/Assets/Svgs/moontrekker-points-icon-primary.svg';
import CorporateBg from '@/Assets/Svgs/corporate-logo-bg.svg';
import FacebookIcon from '@/Assets/Svgs/facebook-icon.svg';
import GalleryIcon from '@/Assets/Svgs/gallery-icon.svg';
import JoinChallengeIcon from '@/Assets/Svgs/join-challenge-icon.svg';

export default function () {
  return {
    logo: require('@/Assets/Images/TOM.png'),
    welcomeBG: require('@/Assets/Images/welcomeBG.png'),
    moontrekkerLogo: require('@/Assets/Images/moontrekkerLogo.png'),
    moontrekkerLogoColor: require('@/Assets/Images/moontrekkerLogoColor.png'),
    barclayLogo: require('@/Assets/Images/BarclayLogo.png'),
    inputBG: require('@/Assets/Images/inputBG.png'),
    inputBGSmall: require('@/Assets/Images/inputBGSmall.png'),
    inputBGLarge: require('@/Assets/Images/inputBGLarge.png'),
    menuIcon: require('@/Assets/Images/menuIcon.png'),
    pointIcon: require('@/Assets/Images/pointIcon.png'),
    sponsorList: require('@/Assets/Images/sponsorList.png'),
    checkerBG: require('@/Assets/Images/checkerBG.png'),
    raceSymbol: require('@/Assets/Images/raceSymbol.png'),
    raceSymbolGrey: require('@/Assets/Images/raceSymbolGrey.png'),
    dateIcon: require('@/Assets/Images/dateIcon.png'),
    rewardIcon: require('@/Assets/Images/rewardIcon.png'),
    locationIcon: require('@/Assets/Images/locationIcon.png'),
    completeIcon: require('@/Assets/Images/completeIcon.png'),
    fullRedemptIcon: require('@/Assets/Images/fullRedemptIcon.png'),
    flagIcon: require('@/Assets/Images/flagIcon.png'),
    timingIcon: require('@/Assets/Images/timingIcon.png'),
    timingIconWhite: require('@/Assets/Images/timingIconWhite.png'),
    leftArrow: require('@/Assets/Images/leftArrow.png'),
    leftArrowBordered: require('@/Assets/Images/leftArrowBordered.png'),
    rightArrow: require('@/Assets/Images/rightArrow.png'),
    rightArrowBordered: require('@/Assets/Images/rightArrowBordered.png'),
    corporateBG: require('@/Assets/Images/corporateBG.png'),
    infoIcon: require('@/Assets/Images/infoIcon.png'),
    endIcon: require('@/Assets/Images/endIcon.png'),
    flagIconGrey: require('@/Assets/Images/flagIconGrey.png'),
    completeRace: require('@/Assets/Images/completeRace.png'),
    completeTraining: require('@/Assets/Images/completeTraining.png'),
    completeChallenge: require('@/Assets/Images/completeChallenge.png'),
    shareIcon: require('@/Assets/Images/shareIcon.png'),
    cameraIcon: require('@/Assets/Images/cameraIcon.png'),
    joinChallengeIcon: require('@/Assets/Images/joinChallengeIcon.png'),
    imagePlaceholder: require('@/Assets/Images/imagePlaceholder.png'),
    trainingImagePlaceholder: require('@/Assets/Images/trainingImagePlaceholder.png'),
    raceImagePlaceholder: require('@/Assets/Images/raceImagePlaceholder.png'),

    navigation: {
      leaderboardIcon: require('@/Assets/Images/Navigation/leaderboardIcon.png'),
      challengeIcon: require('@/Assets/Images/Navigation/challengeIcon.png'),
      profileIcon: require('@/Assets/Images/Navigation/profileIcon.png'),
      raceIcon: require('@/Assets/Images/Navigation/raceIcon.png'),
      settingIcon: require('@/Assets/Images/Navigation/settingIcon.png'),
      sponsorIcon: require('@/Assets/Images/Navigation/sponsorIcon.png'),
      trainingIcon: require('@/Assets/Images/Navigation/trainingIcon.png'),
    },
    badges: [
      require('@/Assets/Images/Badge/badgeBronze.png'),
      require('@/Assets/Images/Badge/badgeSilver.png'),
      require('@/Assets/Images/Badge/badgeGold.png'),
      require('@/Assets/Images/Badge/badgePlatinum.png'),
      require('@/Assets/Images/Badge/badgeDiamond.png'),
    ],
    // SVGS
    RaceFlagIcon,
    MPIcon,
    MPIconPrimary,
    FundRaisingIcon,
    CorporateBg,
    FacebookIcon,
    GalleryIcon,
    JoinChallengeIcon,
  };
}
