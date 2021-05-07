import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { take } from 'rxjs/operators';
import {AccountService} from '../../service/account.service';

@Injectable()
export class AccountResolver implements Resolve<any> {

  constructor(
    private service: AccountService,
  ) { }

  public resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.service.getById(
      route.paramMap.get('id'),
    )
    .pipe(take(1));
  }
}
