'use strict';
const anchors = [
  { amount: 50000, at65: 490, at70: 670 },
  { amount: 110200, at65: 950, at70: 1280 },
  { amount: 150000, at65: 1250, at70: 1670 },
  { amount: 220400, at65: 1780, at70: 2380 },
  { amount: 300000, at65: 2380, at70: 3170 },
  { amount: 440800, at65: 3440, at70: 4580 },
];
const interpolate = (value, x1, y1, x2, y2) => y1 + (value - x1) * (y2 - y1) / (x2 - x1);
function cpfLifeEstimate({ raAt55, startAge, inflation }) {
  if (![raAt55, startAge, inflation].every(Number.isFinite) || raAt55 < 0 || startAge < 65 || startAge > 70 || inflation < 0 || inflation > 10) {
    throw new Error('Enter a valid RA amount, payout start age from 65 to 70, and inflation assumption from 0% to 10%.');
  }
  const amount = Math.min(raAt55, 440800);
  let at65;
  let at70;
  if (amount <= anchors[0].amount) {
    at65 = interpolate(amount, 0, 0, anchors[0].amount, anchors[0].at65);
    at70 = interpolate(amount, 0, 0, anchors[0].amount, anchors[0].at70);
  } else {
    const upperIndex = anchors.findIndex(point => point.amount >= amount);
    const lower = anchors[upperIndex - 1];
    const upper = anchors[upperIndex];
    at65 = interpolate(amount, lower.amount, lower.at65, upper.amount, upper.at65);
    at70 = interpolate(amount, lower.amount, lower.at70, upper.amount, upper.at70);
  }
  const payout = interpolate(startAge, 65, at65, 70, at70);
  const totalPaid = [80, 85, 90, 95].map(age => ({ age, amount: payout * 12 * Math.max(0, age - startAge) }));
  const todayDollars = [80, 90, 95].map(age => ({ age, amount: payout / Math.pow(1 + inflation / 100, Math.max(0, age - startAge)) }));
  return { payout, annual: payout * 12, amount, capped: raAt55 > 440800, totalPaid, todayDollars };
}
if (typeof module !== 'undefined') module.exports = { cpfLifeEstimate };
if (typeof window !== 'undefined') window.CpfLifeMath = { cpfLifeEstimate, payoutTable: anchors };
