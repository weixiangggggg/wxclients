# Wei Xiang — Your Planning Space

A self-contained static website for Vercel. No npm packages, build step, API keys, accounts or database required.

## Preview
Open index.html in a web browser. Keep the files together in this folder.

## Connect your contact button
Edit config.js. Set whatsapp to your own international number, digits only (65 followed by your 8-digit Singapore number). Or supply an email address. Do not use another person's number. Until configured, the contact dialog clearly says online contact is not connected. Name/display copy is in index.html.

## Publish on Vercel
Option A — direct folder upload:
1. Unzip this package.
2. Visit https://vercel.com/drop and sign in.
3. Drag the extracted client-tools-hub folder onto the page.
4. Choose your team and project name, then Deploy.

Option B — GitHub (convenient for ongoing updates):
1. Create a GitHub repository and upload this folder's contents. index.html and vercel.json should be at the repository root.
2. In Vercel select Add New > Project and import that repository.
3. Use framework preset Other, no build command, and output directory `.`. The supplied vercel.json specifies a static project.
4. Deploy. Future commits to the connected production branch update the site.

Vercel documentation: https://vercel.com/docs/deployments
Use a plan appropriate for commercial use. This package has not been deployed.

## Included
- Home with three calculator cards, resources and contact buttons.
- Retirement estimate: inflation-adjusted spending, retirement income offset, capital target, projected savings and extra contribution estimate.
- Investment growth with negative-return support, milestone chart and accessible data table.
- Monthly budget separating expenses, savings and unallocated cash/shortfall.
- 18 checklist items across three printable checklists, short explainers and official resource links.
- Print / save as PDF using your browser's print dialog.
- Mobile layouts, visible keyboard focus, form labels, validation and accessible contact dialog.

Inputs remain only in page memory and reset on reload. No financial data is sent to a server or stored locally. WhatsApp opens only when a visitor chooses it; no calculator values are included in that message. Hosting providers may log normal requests.

## Calculation assumptions
All money is SGD. Defaults are illustrative, not advice, projections for a specific policy, or guaranteed returns. Rates are effective annual rates converted to monthly rates. Contributions and retirement withdrawals occur at month end. Rates should be entered after fees and taxes.

Investment FV = principal × (1+r)^n + monthly contribution × ((1+r)^n−1)/r. At zero return, FV = principal + contributions.

Retirement spending is inflated until retirement. Entered income is its estimated monthly amount at retirement. The positive difference is the initial withdrawal gap. Capital is the present value of the inflation-adjusted gap over retirement, using real monthly return ((1+return)/(1+inflation))^(1/12)−1. This assumes offsetting income also rises with inflation, and a zero balance at the horizon. Fixed income, CPF start-age differences, one-off costs, sequence risk and changing circumstances require a more detailed model. The tool does not calculate CPF LIFE payouts or CPF rules.

## Validation
Run `node test.cjs` for independent calculation checks. JavaScript syntax was checked. Interactive browser and visual QA were unavailable in this creation environment; open index.html and test on phone and desktop before publishing.

## Editing
index.html: wording and page structure
styles.css: colours, typography, layout
app.js: fields, navigation, checklists and interactions
math.js: pure financial calculations
config.js: WhatsApp / email destination
