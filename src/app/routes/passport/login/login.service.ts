import { Injectable, Inject } from "@angular/core";
import { TokenAuthServiceProxy, AuthenticateModel, AuthenticateResultModel } from "@shared/service-proxies/service-proxies";
import { finalize } from "rxjs/operators";
import { Router } from "@angular/router";
import { TokenService, DA_SERVICE_TOKEN } from "@delon/auth";
import { AppConsts } from "@shared/AppConsts";


//import { LogService } from 'abp-ng2-module/src/log/log.service';

@Injectable()
export class LoginService {
    authenticateModel: AuthenticateModel;
    authenticateResult: AuthenticateResultModel;
    
    rememberMe: boolean;

    constructor(
        private _tokenAuthService: TokenAuthServiceProxy,
        private _router: Router,
        @Inject(DA_SERVICE_TOKEN) private _tokenService: TokenService,
        //private _logService: LogService
    ) {
        this.clear();
    }

    authenticate(finallyCallback?: () => void): void {
        finallyCallback = finallyCallback || (() => { });

        this._tokenAuthService
            .authenticate(this.authenticateModel)
            .pipe(finalize(() => { finallyCallback() }))
            .subscribe((result: AuthenticateResultModel) => {
                this.processAuthenticateResult(result);
            });
    }

    private processAuthenticateResult(authenticateResult: AuthenticateResultModel) {
        this.authenticateResult = authenticateResult;

        if (authenticateResult.accessToken) {
            //Successfully logged in
            this.login(authenticateResult.accessToken, authenticateResult.encryptedAccessToken, authenticateResult.expireInSeconds, this.rememberMe);

        } else {
            //Unexpected result!

            //this._logService.warn('Unexpected authenticateResult!');
            this._router.navigate(['passort/login']);
        }
    }

    private login(accessToken: string, encryptedAccessToken: string, expireInSeconds: number, rememberMe?: boolean): void {

        var tokenExpireDate = rememberMe ? (new Date(new Date().getTime() + 1000 * expireInSeconds)) : undefined;

        this._tokenService.set({
            token: accessToken,
            name: this.authenticateModel.userNameOrEmailAddress,
            email: `cipchk@qq.com`,
            id: this.authenticateResult.userId,
            time: +new Date(),
          });
        this._router.navigate(['/']);
    }

    private clear(): void {
        this.authenticateModel = new AuthenticateModel();
        this.authenticateModel.rememberClient = false;
        this.authenticateResult = null;
        this.rememberMe = false;
    }
}