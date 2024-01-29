'use server';

import { ChatsProps, UserProps } from '@/components/chat';

const biosymBot: UserProps = {
    name: 'Biosym Bot',
    username: '@biosymbolics',
};

export const getChats: () => Promise<Record<string, ChatsProps>> = async () =>
    Promise.resolve({
        tradingBelowCash: {
            id: '1',
            sender: biosymBot,
            messages: [
                {
                    id: '1',
                    content:
                        'What biopharma companies are trading below cash value?',
                    timestamp: 'Wednesday 9:00am',
                    sender: 'You',
                },
                {
                    // select name, round(market_cap), round(net_debt),  round(market_cap-net_debt) as delta, ROUND((market_cap/net_debt)::Decimal, 2) as pct, symbol from financials, owner where owner.id=financials.owner_id and market_cap < net_debt order by round(market_cap-net_debt) desc
                    id: '2',
                    timestamp: 'Wednesday 11:30am',
                    sender: biosymBot,
                    content: `Here are some biopharma companies that are trading below cash value: \n
* Amneal Pharmaceuticals, Inc. ([AMRX](https://finance.yahoo.com/quote/AMRX)) (62%)\n
* Grifols, S.A. ([GRFS](https://finance.yahoo.com/quote/GRFS)) (78%)\n
* Embecta Corporation ([EMBI](https://finance.yahoo.com/quote/EMBI)) (78%)\n
* Coherus BioSciences, Inc. ([CHRS](https://finance.yahoo.com/quote/CHRS)) (64%)\n
* 2seventy bio, Inc. ([TSVT](https://finance.yahoo.com/quote/TSVT)) (82%)\n
* Viatris Inc. ([VTRS](https://finance.yahoo.com/quote/VTRS)) (79%)\n
[See 43 more](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=grifols)
                `,
                },
                {
                    id: '3',
                    timestamp: 'Wednesday 2:00pm',
                    sender: 'You',
                    content: 'What drug assets are owned by those companies?',
                },
                {
                    id: '4',
                    timestamp: 'Wednesday 4:30pm',
                    sender: biosymBot,
                    content: `Some assets include:
* [alpha1-proteinase inhibitor](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=alpha1-proteinase%20inhibitor)\n
* [alfa ανβ3 integrin antagonist](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=ανβ3%20integrin)\n
* [il6 inhibitor](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=il6%20inhibitor)\n
* [anti-d-dimer recombinant antibodies](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=anti-d-dimer%20antibody)\n
[View all 250 assets](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=grifols)`,
                },
                {
                    id: '5',
                    timestamp: 'Wednesday 2:01pm',
                    sender: 'You',
                    content:
                        'Which of those drugs are first-in-class or a novel mechanism of action?',
                },
                {
                    id: '6',
                    timestamp: 'Wednesday 2:02pm',
                    sender: biosymBot,
                    content: `10 of those assets are first-in-class or a novel mechanism of action:
* [alpha1-proteinase inhibitor](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=alpha1-proteinase%20inhibitor)\n
* [ανβ3 integrin antagonist](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=ανβ3%20integrin)\n
* [il6 inhibitor](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=il6%20inhibitor)\n
* [anti-d-dimer recombinant antibodies](http://localhost:3000/core/dashboard?endYear=2024&queryType=OR&startYear=2014&terms=anti-d-dimer%20antibody)\n`,
                },
                {
                    id: '7',
                    timestamp: 'Wednesday 2:01pm',
                    sender: 'You',
                    content:
                        'What are the primary indications for ανβ3 integrin antagonists?',
                },
                {
                    id: '8',
                    timestamp: 'Wednesday 2:02pm',
                    sender: biosymBot,
                    content: `No ανβ3 integrin antagonists are yet approved. However, they are being investigated for the treatment of:
* sickle cell disease vaso-occlusion
* tumor angiogenesis
* tumor-induced bone resorption
* herpes simplex and hantavirus viral invasion
* disruption of glomerular barrier function
* dermal and hepatic fibrosis
* acute myelogenous leukemia
* postcardiac transplant coronary vasculopathy
* bone resorption by multiple myeloma plasma cells
* supravalvular aortic stenosis associated with Williams syndrome
* Crohn’s disease strictures
* t-cell lymphoma
                `,
                },
            ],
        },
        clinicalTrialHighDropout: {
            // select canonical_name, count(*), sum(enrollment) total_enrollment, sum(dropout_count) total_dropouts,  avg(enrollment) enrollment, avg(trial.dropout_count) dropout , avg(trial.dropout_count)/avg(enrollment) pct from indicatable, trial where trial.id=indicatable.trial_id and trial.dropout_count > 1 and enrollment > 0 and (trial.dropout_count + 10) < enrollment group by canonical_name having count(*) > 100 order by avg(trial.dropout_count)/avg(enrollment) desc limit 100;
            id: '1',
            sender: biosymBot,
            messages: [
                {
                    id: '1',
                    content:
                        'What indications have the highest clinical trial dropout rates?',
                    timestamp: 'Wednesday 9:20am',
                    sender: 'You',
                },
                {
                    id: '2',
                    content: `The following indications have the highest clinical trial dropout rates:
* [ph1-positive chronic myelogenous leukemia](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=ph1-positive%20cml) (58%)
* [small cell carcinoma of the lung](http://localhost:3000/core/dashboard?endYear=2024startYear=2014&terms=sccl) (53%)
* [hematologic cancers](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=hematologic%20neoplasms) (53%)
* [non-small cell lung carcinoma](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=non-small%20cell%20lung%20carcinoma) (52%)
* [melanoma](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=melanoma) (51%)
                    `,
                    timestamp: 'Wednesday 9:21am',
                    sender: biosymBot,
                },
                {
                    id: '4',
                    content:
                        'What are non-cancer indications with the highest clinical trial dropout rates?',
                    timestamp: 'Wednesday 9:23am',
                    sender: 'You',
                },
                {
                    id: '5',
                    content: `The following non-cancer indications have the highest clinical trial dropout rates:
* [alzheimer's disease](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=alzheimer's%20disease) (50%)
* [contraceptive methods](http://localhost:3000/core/dashboard?endYear=2024startYear=2014&terms=contraceptive%20methods) (53%)
* [schizophrenia](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=schizophrenia) (43%)
* [crohn disease](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=crohn%20disease) (52%)
* [idiopathic pulmonary arterial hypertension](http://localhost:3000/core/dashboard?endYear=2024&startYear=2014&terms=idiopathic%20pulmonary%20arterial%20hypertension) (51%)
                    `,
                    timestamp: 'Wednesday 9:24am',
                    sender: biosymBot,
                },
                {
                    id: '6',
                    content:
                        'In idiopathic pulmonary arterial hypertension, show me a chart of investigational drugs by top dropout reasons.',
                    timestamp: 'Wednesday 9:25am',
                    sender: 'You',
                },
                {
                    // select json_build_object('intervention', browse_interventions.downcase_mesh_term, 'reason', reason, 'count', count(*)) from studies, browse_conditions, browse_interventions,  drop_withdrawals where studies.nct_id=browse_conditions.nct_id and drop_withdrawals.nct_id=studies.nct_id and browse_interventions.nct_id=studies.nct_id and browse_conditions.downcase_mesh_term='pulmonary arterial hypertension' and reason not in ('Adverse Event', 'Other') group by reason, browse_interventions.downcase_mesh_term order by count(*) desc;
                    id: '7',
                    content: `[{"intervention" : "enzyme inhibitors", "reason" : "Death", "count" : 66},
                    {"intervention" : "vasodilator agents", "reason" : "Withdrawal by Subject", "count" : 57},
                    {"intervention" : "vasodilator agents", "reason" : "Death", "count" : 56},
                    {"intervention" : "antihypertensive agents", "reason" : "Withdrawal by Subject", "count" : 56},
                    {"intervention" : "enzyme inhibitors", "reason" : "Withdrawal by Subject", "count" : 53},
                    {"intervention" : "urological agents", "reason" : "Withdrawal by Subject", "count" : 47},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Withdrawal by Subject", "count" : 47},
                    {"intervention" : "antihypertensive agents", "reason" : "Death", "count" : 43},
                    {"intervention" : "urological agents", "reason" : "Death", "count" : 41},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Death", "count" : 41},
                    {"intervention" : "enzyme inhibitors", "reason" : "Protocol Violation", "count" : 41},
                    {"intervention" : "endothelin receptor antagonists", "reason" : "Death", "count" : 40},
                    {"intervention" : "vasodilator agents", "reason" : "Lost to Follow-up", "count" : 39},
                    {"intervention" : "endothelin receptor antagonists", "reason" : "Withdrawal by Subject", "count" : 38},
                    {"intervention" : "endothelin receptor antagonists", "reason" : "Investigator", "count" : 22},
                    {"intervention" : "endothelin receptor antagonists", "reason" : "Lack of Efficacy", "count" : 22},
                    {"intervention" : "sildenafil citrate", "reason" : "Withdrawal by Subject", "count" : 38},
                    {"intervention" : "sildenafil citrate", "reason" : "Death", "count" : 36},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Protocol Violation", "count" : 32},
                    {"intervention" : "vasodilator agents", "reason" : "Protocol Violation", "count" : 32},
                    {"intervention" : "urological agents", "reason" : "Protocol Violation", "count" : 32},
                    {"intervention" : "antihypertensive agents", "reason" : "Lost to Follow-up", "count" : 32},
                    {"intervention" : "enzyme inhibitors", "reason" : "Lost to Follow-up", "count" : 32},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Lost to Follow-up", "count" : 30},
                    {"intervention" : "urological agents", "reason" : "Lost to Follow-up", "count" : 30},
                    {"intervention" : "sildenafil citrate", "reason" : "Protocol Violation", "count" : 29},
                    {"intervention" : "antihypertensive agents", "reason" : "Investigator", "count" : 26},
                    {"intervention" : "vasodilator agents", "reason" : "Investigator", "count" : 25},
                    {"intervention" : "sildenafil citrate", "reason" : "Lost to Follow-up", "count" : 25},
                    {"intervention" : "protein kinase inhibitors", "reason" : "Death", "count" : 25},
                    {"intervention" : "bosentan", "reason" : "Withdrawal by Subject", "count" : 24},
                    {"intervention" : "endothelin receptor antagonists", "reason" : "Lost to Follow-up", "count" : 22},
                    {"intervention" : "antihypertensive agents", "reason" : "Protocol Violation", "count" : 20},
                    {"intervention" : "platelet aggregation inhibitors", "reason" : "Withdrawal by Subject", "count" : 20},
                    {"intervention" : "platelet aggregation inhibitors", "reason" : "Death", "count" : 20},
                    {"intervention" : "bosentan", "reason" : "Death", "count" : 19},
                    {"intervention" : "urological agents", "reason" : "Investigator", "count" : 18},
                    {"intervention" : "enzyme inhibitors", "reason" : "Lack of Efficacy", "count" : 18},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Investigator", "count" : 18},
                    {"intervention" : "enzyme inhibitors", "reason" : "Investigator", "count" : 18},
                    {"intervention" : "vasodilator agents", "reason" : "Lack of Efficacy", "count" : 17},
                    {"intervention" : "citric acid", "reason" : "Protocol Violation", "count" : 17},
                    {"intervention" : "citric acid", "reason" : "Lost to Follow-up", "count" : 17},
                    {"intervention" : "anticoagulants", "reason" : "Protocol Violation", "count" : 17},
                    {"intervention" : "anticoagulants", "reason" : "Lost to Follow-up", "count" : 17},
                    {"intervention" : "sequestering agents", "reason" : "Protocol Violation", "count" : 17},
                    {"intervention" : "chelating agents", "reason" : "Lost to Follow-up", "count" : 17},
                    {"intervention" : "sequestering agents", "reason" : "Lost to Follow-up", "count" : 17},
                    {"intervention" : "chelating agents", "reason" : "Protocol Violation", "count" : 17},
                    {"intervention" : "tadalafil", "reason" : "Investigator", "count" : 17},
                    {"intervention" : "platelet aggregation inhibitors", "reason" : "Lost to Follow-up", "count" : 16},
                    {"intervention" : "tadalafil", "reason" : "Withdrawal by Subject", "count" : 16},
                    {"intervention" : "enzyme inhibitors", "reason" : "Investigator", "count" : 14},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Lack of Efficacy", "count" : 14},
                    {"intervention" : "sequestering agents", "reason" : "Withdrawal by Subject", "count" : 14},
                    {"intervention" : "chelating agents", "reason" : "Withdrawal by Subject", "count" : 14},
                    {"intervention" : "sildenafil citrate", "reason" : "Lack of Efficacy", "count" : 14},
                    {"intervention" : "iloprost", "reason" : "Lost to Follow-up", "count" : 14},
                    {"intervention" : "macitentan", "reason" : "Death", "count" : 14},
                    {"intervention" : "urological agents", "reason" : "Lack of Efficacy", "count" : 14},
                    {"intervention" : "iloprost", "reason" : "Withdrawal by Subject", "count" : 14},
                    {"intervention" : "anticoagulants", "reason" : "Withdrawal by Subject", "count" : 14},
                    {"intervention" : "protein kinase inhibitors", "reason" : "Investigator", "count" : 14},
                    {"intervention" : "citric acid", "reason" : "Withdrawal by Subject", "count" : 14},
                    {"intervention" : "citric acid", "reason" : "Death", "count" : 13},
                    {"intervention" : "chelating agents", "reason" : "Death", "count" : 13},
                    {"intervention" : "anticoagulants", "reason" : "Death", "count" : 13},
                    {"intervention" : "iloprost", "reason" : "Death", "count" : 13},
                    {"intervention" : "antihypertensive agents", "reason" : "Disease progression", "count" : 13},
                    {"intervention" : "sequestering agents", "reason" : "Death", "count" : 13},
                    {"intervention" : "treprostinil", "reason" : "Death", "count" : 12},
                    {"intervention" : "endothelin receptor antagonists", "reason" : "Disease progression", "count" : 12},
                    {"intervention" : "bosentan", "reason" : "Disease progression", "count" : 12},
                    {"intervention" : "tadalafil", "reason" : "Death", "count" : 12},
                    {"intervention" : "riociguat", "reason" : "Death", "count" : 12},
                    {"intervention" : "riociguat", "reason" : "Withdrawal by Subject", "count" : 12},
                    {"intervention" : "vasodilator agents", "reason" : "Investigator", "count" : 11},
                    {"intervention" : "imatinib mesylate", "reason" : "Death", "count" : 11},
                    {"intervention" : "platelet aggregation inhibitors", "reason" : "Investigator", "count" : 11},
                    {"intervention" : "iloprost", "reason" : "Investigator", "count" : 11},
                    {"intervention" : "treprostinil", "reason" : "Withdrawal by Subject", "count" : 11},
                    {"intervention" : "macitentan", "reason" : "Lost to Follow-up", "count" : 11},
                    {"intervention" : "citric acid", "reason" : "Lack of Efficacy", "count" : 10},
                    {"intervention" : "platelet aggregation inhibitors", "reason" : "Disease progression", "count" : 10},
                    {"intervention" : "phosphodiesterase inhibitors", "reason" : "Disease progression", "count" : 10},
                    {"intervention" : "sildenafil citrate", "reason" : "Disease progression", "count" : 10},
                    {"intervention" : "protein kinase inhibitors", "reason" : "Protocol Violation", "count" : 10},
                    {"intervention" : "antihypertensive agents", "reason" : "Investigator", "count" : 10},
                    {"intervention" : "sequestering agents", "reason" : "Lack of Efficacy", "count" : 10},
                    {"intervention" : "vasodilator agents", "reason" : "Disease progression", "count" : 10},
                    {"intervention" : "chelating agents", "reason" : "Lack of Efficacy", "count" : 10}]`,
                    type: 'heatmap',
                    timestamp: 'Wednesday 9:25am',
                    sender: 'You',
                },
                {
                    id: '8',
                    content:
                        'What are typical clinical development timelines in PAH?',
                    timestamp: 'Wednesday 9:30am',
                    sender: 'You',
                },
                {
                    id: '9',
                    type: 'timeline',
                    description:
                        'Here are typical clinical development timelines in PAH, in years:',
                    content: `
                        [
                            {
                                "stage": "Phase 1",
                                "offset": 0,
                                "median_duration": 1.5,
                                "iqr": 0.5
                            },
                            {
                                "stage": "Phase 2",
                                "offset": 1.5,
                                "median_duration": 2,
                                "iqr": 0.7
                            },
                            {
                                "stage": "Phase 3",
                                "offset": 3.5,
                                "median_duration": 3,
                                "iqr": 1
                            },
                            {
                                "stage": "FDA Review",
                                "offset": 6.5,
                                "median_duration": 1.5,
                                "iqr": 0.5
                            }
                        ]
                        `,
                    timestamp: 'Wednesday 9:30am',
                    sender: biosymBot,
                },
            ],
        },
        drugDeliverySystems: {
            id: '1',
            sender: biosymBot,
            messages: [
                {
                    id: '1',
                    content:
                        'What are characteristics of drugs that would have more efficacy given BBB penetrance?',
                    timestamp: 'Wednesday 9:20am',
                    sender: 'You',
                },
                {
                    id: '2',
                    content: `Here are some key characteristics that would make a drug more likely to have improved efficacy if its ability to cross the blood-brain barrier (BBB) was enhanced:
* Targets the central nervous system - The drug's intended mechanism of action or therapeutic target is located in the brain or spinal cord. For example, drugs treating Alzheimer's, Parkinson's, psychiatric disorders, chronic pain, etc.
* Hydrophilic - Highly lipophilic (fat-soluble) small molecules can sometimes passively diffuse across the BBB. Hydrophilic compounds have a harder time crossing. Making hydrophilic drugs more hydrophobic can improve permeation.
* Large molecular weight - Small molecules under 500 Da can more easily cross the BBB compared to larger compounds like peptides or antibodies. Strategies like nanoparticle encapsulation can help transport large molecules.
* Substrate for efflux pumps - Transporters like p-glycoprotein at the BBB actively pump many drugs back into the bloodstream. Inhibiting these pumps could give more brain exposure.
* Positive charge - The BBB favors passive diffusion of neutral or negatively charged molecules. Adding negative charge via salts or esters can sometimes improve penetration.
* Brain-specific delivery - Having a targeting mechanism for enhanced brain vs peripheral uptake helps minimize side effects and maximize CNS action.

The ideal candidate is a hydrophilic, high molecular weight CNS-active compound that is subject to extensive efflux. Overcoming these barriers to improve brain penetration would significantly enhance its efficacy.
                    `,
                    timestamp: 'Wednesday 9:21am',
                    sender: biosymBot,
                },
                {
                    id: '3',
                    content:
                        'What are some compounds that failed clinical trials for indications in CNS, with off-target effects in the periphery?',
                    timestamp: 'Wednesday 9:22am',
                    sender: 'You',
                },
                {
                    id: '4',
                    content: '<<< answer >>>',
                    timestamp: 'Wednesday 9:23am',
                    sender: biosymBot,
                },
            ],
        },
    });
