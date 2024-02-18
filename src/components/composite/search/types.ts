import { Option } from '@/types/select';

export type FetchAutocompletions = (str: string) => Promise<Option[]>;
