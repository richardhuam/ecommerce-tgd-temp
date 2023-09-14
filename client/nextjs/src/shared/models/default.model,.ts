import { GetServerSidePropsContext, PreviewData } from 'next';
import { ParsedUrlQuery } from 'querystring';

export type IContext = GetServerSidePropsContext<ParsedUrlQuery, PreviewData>;
