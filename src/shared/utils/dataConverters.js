import toPercent from './toPercent';

export function convertWinsByMatchLength(winsByMatchLength) {
  return [
    { name: '0-15', value: toPercent(winsByMatchLength.zeroToFifteen.winRate) },
    { name: '15-20', value: toPercent(winsByMatchLength.fifteenToTwenty.winRate) },
    { name: '20-25', value: toPercent(winsByMatchLength.twentyToTwentyFive.winRate) },
    { name: '25-30', value: toPercent(winsByMatchLength.twentyFiveToThirty.winRate) },
    { name: '30-35', value: toPercent(winsByMatchLength.thirtyToThirtyFive.winRate) },
    { name: '35-40', value: toPercent(winsByMatchLength.thirtyFiveToForty.winRate) },
    { name: '40+', value: toPercent(winsByMatchLength.fortyPlus.winRate) }
  ];
}

export function convertWinsByMatchesPlayed(winsByMatchPlayed) {
  return [
    { name: '1-50', value: toPercent(winsByMatchPlayed.oneToFifty.winRate) },
    { name: '51-100', value: toPercent(winsByMatchPlayed.fiftyOneToHundred.winRate) },
    { name: '101-150', value: toPercent(winsByMatchPlayed.hundredOneToHundredFifty.winRate) },
    { name: '151-200', value: toPercent(winsByMatchPlayed.hundredFiftyOneToTwoHundred.winRate) },
    { name: '200+', value: toPercent(winsByMatchPlayed.twoHundredOnePlus.winRate) }
  ];
}
