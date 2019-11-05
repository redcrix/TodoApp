import { Comment } from './Comment';
 
export type Item = {
    'slug': string;
    'title': string;
    'description': string;
    'start': string;
    'end': string;
    'due': string;
    'comments': Comment[];
}



