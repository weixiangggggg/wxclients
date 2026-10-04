const assert=require('node:assert/strict');const {future,monthlyContribution,retirement}=require('./math.js');const near=(a,b)=>assert.ok(Math.abs(a-b)<Math.max(1,Math.abs(b))*1e-9,`${a} != ${b}`);
near(future(10000,500,20,0),130000);
near(future(10000,0,1,5),10500);
for(const annual of [-20,0,4,20]){let balance=10000;const monthly=Math.pow(1+annual/100,1/12)-1;for(let n=0;n<240;n++)balance=balance*(1+monthly)+500;near(future(10000,500,20,annual),balance);}
const base={age:50,retire:65,end:90,spend:3000,saved:100000,monthly:500,income:1500,inflation:0,pre:0,post:0};let r=retirement(base);near(r.capital,450000);near(r.projected,190000);near(r.extra,260000/180);
near(retirement({...base,income:4000}).capital,0);
assert.equal(retirement({...base,age:65}).extra,null);
assert.equal(retirement({...base,income:base.spend*0.5}).gap,1500);
near(retirement({...base,income:base.spend*0.5*Math.pow(1.03,15),inflation:3}).gap,1500*Math.pow(1.03,15));
r=retirement({...base,inflation:2.5,pre:4,post:3});let balance=r.capital;const real=Math.pow(1.03/1.025,1/12)-1;for(let n=0;n<300;n++)balance=balance*(1+real)-r.gap;assert.ok(Math.abs(balance)<1e-5);near(future(base.saved,base.monthly+r.extra,15,4),r.capital);
assert.ok(retirement({...base,post:-5}).capital>450000);
const goalPayment=monthlyContribution(500000,25000,30*12,8);near(future(25000,goalPayment,30,8),500000);near(monthlyContribution(12000,0,12,0),1000);assert.equal(monthlyContribution(100000,100000,120,8),0);assert.equal(monthlyContribution(1000,0,0,8),null);near(monthlyContribution(120000,0,120,0),1000);near(25000+monthlyContribution(500000,25000,30*12,0)*30*12,500000);
console.log('PASS: zero, positive and negative returns; independent monthly simulation; retirement drawdown; income coverage; retirement-now boundary; shortfall contributions; target contribution solver.');
