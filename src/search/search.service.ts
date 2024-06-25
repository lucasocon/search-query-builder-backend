import { Injectable } from '@nestjs/common';

@Injectable()
export class SearchService {
  
  getEmployees(params: any) {
    console.log(params);

    return [1, 2, 3];
  }
}
