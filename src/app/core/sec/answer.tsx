'use server';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import 'server-only';

import { askSec } from './actions';

export const Answer = async (args: {
    question: string;
    questionType?: string;
}) => {
    try {
        const answer = await askSec(args.question, args.questionType);
        return (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
        );
    } catch (e) {
        if (e instanceof Error) {
            return <div>Failed to ask SEC: {e.message}</div>;
        }
        return <div>Failed to ask SEC</div>;
    }
};
