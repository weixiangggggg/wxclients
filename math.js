/* Pure calculation functions. Annual returns are effective, net assumptions. */
(function(root){
const rate = annual => Math.pow(1+annual/100,1/12)-1;
function future(initial,monthly,years,annual){const n=Math.round(years*12),r=rate(annual);return Math.abs(r)<1e-12?initial+monthly*n:initial*Math.pow(1+r,n)+monthly*Math.expm1(n*Math.log1p(r))/r;}
function retirement(x){const years=x.retire-x.age,n=x.end-x.retire,infl=1+x.inflation/100;const spending=x.spend*Math.pow(infl,years),gap=Math.max(0,spending-x.income);const realMonthly=Math.pow((1+x.post/100)/infl,1/12)-1;const months=n*12;const capital=Math.abs(realMonthly)<1e-12?gap*months:gap*(-Math.expm1(-months*Math.log1p(realMonthly)))/realMonthly;const projected=future(x.saved,x.monthly,years,x.pre),shortfall=Math.max(0,capital-projected);const factor=future(0,1,years,x.pre);return {years,spending,gap,capital,projected,shortfall,extra:factor?shortfall/factor:null};}
const api={future,retirement};if(typeof module!=='undefined')module.exports=api;root.PlanningMath=api;
})(typeof window!=='undefined'?window:globalThis);
