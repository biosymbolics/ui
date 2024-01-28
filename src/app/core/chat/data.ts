import { ChatsProps, UserProps } from '@/components/chat';

const biosymBot: UserProps = {
    name: 'Biosym Bot',
    username: '@biosymbolics',
};

export const chats: ChatsProps[] = [
    {
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
        ],
    },
];
