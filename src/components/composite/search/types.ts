import { Option } from '@/types/select';

export type AutocompleteMode = 'id' | 'term';
export type FetchAutocompletions = (
    str: string,
    mode?: AutocompleteMode
) => Promise<Option[]>;

export type SearchBarVariant = 'patents' | 'assets';
