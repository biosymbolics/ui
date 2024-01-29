'use server';

import { ChatsProps, UserProps } from '@/components/chat';

const biosymBot: UserProps = {
    name: 'Biosym Bot',
    username: '@biosymbolics',
};

export const getChats: () => Promise<Record<string, ChatsProps>> = async () =>
    Promise.resolve({
        belowCash: {
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
        highDropout: {
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
        terminationReason: {
            id: '1',
            sender: biosymBot,
            messages: [
                {
                    id: '1',
                    content:
                        'In the past 5 years, what are the top reasons for clinical trial termination?',
                    timestamp: 'Wednesday 9:20am',
                    sender: 'You',
                },
                {
                    id: '2',
                    content:
                        'Here are the top reasons for clinical trial termination in the past 5 years: \n * enrollment (40%) \n * strategy (18%) \n * efficacy (8%) \n * safety (5%) \n * other (29%)',
                    timestamp: 'Wednesday 9:21am',
                    sender: biosymBot,
                },
                {
                    id: '3',
                    content:
                        'What are the compounds for which the termination reason was "strategy"?',
                    timestamp: 'Wednesday 9:22am',
                    sender: 'You',
                },
                {
                    id: '4',
                    content: '<<< Strategy answer >>>',
                    timestamp: 'Wednesday 9:23am',
                    sender: biosymBot,
                },
            ],
        },
    });
