import { Headers } from '@angular/http';


export const contentHeaders = new Headers();
contentHeaders.append('Content-Type', 'application/json');
contentHeaders.append('Accept', 'application/json');
