'use strict';
(function(){
  const sums = [
    { year: 2025, brs: 106500, frs: 213000, ers: 426000 },
    { year: 2026, brs: 110200, frs: 220400, ers: 440800 },
    { year: 2027, brs: 114100, frs: 228200, ers: 456400 },
  ];
  const currency = value => new Intl.NumberFormat('en-SG', { style: 'currency', currency: 'SGD', maximumFractionDigits: 0 }).format(value);
  const anchors = window.CpfLifeMath.payoutTable;
  const amountInput = document.getElementById('cpf-ra-amount');
  if (!amountInput) return;
  const rangeInput = document.getElementById('cpf-ra-range');
  const ageInput = document.getElementById('cpf-start-age');
  const inflationInput = document.getElementById('cpf-inflation');
  const fmt = value => currency(value).replace('.00', '');
  const tableRows = (rows, label) => rows.map(row => `<tr><th scope="row">${label(row)}</th><td>${fmt(row.amount)}</td></tr>`).join('');

  function render() {
    const rawAmount = Number(amountInput.value);
    if (!Number.isFinite(rawAmount) || rawAmount < 0) return;
    const estimate = window.CpfLifeMath.cpfLifeEstimate({ raAt55: rawAmount, startAge: Number(ageInput.value), inflation: Number(inflationInput.value) });
    document.getElementById('cpf-monthly-payout').textContent = fmt(estimate.payout);
    document.getElementById('cpf-annual-payout').textContent = fmt(estimate.annual);
    document.getElementById('cpf-monthly-subtitle').textContent = `from age ${ageInput.value} · Standard Plan`;
    document.getElementById('cpf-annual-subtitle').textContent = 'paid for as long as you live';
    document.getElementById('cpf-total-rows').innerHTML = tableRows(estimate.totalPaid, row => row.age);
    document.getElementById('cpf-today-title').textContent = `${fmt(estimate.payout)} in today’s dollars`;
    document.getElementById('cpf-today-rows').innerHTML = tableRows(estimate.todayDollars, row => row.age);
    document.getElementById('cpf-total-caption').textContent = `Estimated total payouts from age ${ageInput.value}`;
    document.getElementById('cpf-inflation-note').textContent = `At ${inflationInput.value}% inflation a year. This adjusts the payout for purchasing power; the nominal Standard Plan payout remains level.`;
    document.getElementById('cpf-cap-notice').hidden = !estimate.capped;
    document.getElementById('cpf-low-savings-notice').hidden = rawAmount >= 60000;
    rangeInput.value = Math.min(rawAmount, 440800);
    document.querySelectorAll('[data-cpf-sum]').forEach(button => {
      button.setAttribute('aria-pressed', Number(button.dataset.cpfSum) === rawAmount ? 'true' : 'false');
    });
    document.getElementById('cpf-table-rows').innerHTML = anchors.map(point => `<tr><th scope="row">${fmt(point.amount)}${point.amount === 110200 ? ' (BRS)' : point.amount === 220400 ? ' (FRS)' : point.amount === 440800 ? ' (ERS)' : ''}</th><td>${fmt(point.at65)}</td><td>${fmt(point.at70)}</td></tr>`).join('');
    document.getElementById('cpf-sum-rows').innerHTML = sums.map(sum => `<tr${sum.year === 2026 ? ' class="cpf-current-sum"' : ''}><th scope="row">${sum.year}</th><td>${fmt(sum.brs)}</td><td>${fmt(sum.frs)}</td><td>${fmt(sum.ers)}</td></tr>`).join('');
  }

  amountInput.addEventListener('input', render);
  rangeInput.addEventListener('input', () => { amountInput.value = rangeInput.value; render(); });
  ageInput.addEventListener('change', render);
  inflationInput.addEventListener('input', render);
  document.querySelectorAll('[data-cpf-sum]').forEach(button => button.addEventListener('click', () => {
    amountInput.value = button.dataset.cpfSum;
    render();
    amountInput.focus();
  }));
  render();
})();
