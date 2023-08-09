import { HttpHeaders } from '@angular/common/http';

// TODO: Move this values to .env file

export const API_BASE_URL = ' https://moviesdatabase.p.rapidapi.com/titles';

export const API_OPTIONS: { headers: HttpHeaders } = {
  headers: new HttpHeaders({
    'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com',
    'X-RapidAPI-Key': '93ae563931msh65c4955e731b004p15c438jsnc85cec8f6def',
  }),
};
