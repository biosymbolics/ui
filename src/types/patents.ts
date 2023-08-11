import { z } from 'zod';

export const PatentSchema = z.object({
    // eslint-disable-next-line @typescript-eslint/naming-convention
    publication_number: z.string(),
    title: z.string(),
    abstract: z.string(),
    assignees: z.array(z.string()),
    compounds: z.array(z.string()),
    diseases: z.array(z.string()),
    genes: z.array(z.string()),
    inventors: z.array(z.string()),
    mechanisms: z.array(z.string()),
    url: z.string(),
});

export const PatentResponse = z.array(PatentSchema);

export type Patent = z.infer<typeof PatentSchema>;
