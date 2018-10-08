import { Injectable } from '@angular/core';
import { Configuration } from 'src/app/helpers/Configuration';
import { HttpClient } from '../../../node_modules/@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {

  constructor(private httpClient: HttpClient) { }

  public async congigure() {

    let configPath = environment.assetsPath+"config.json";//"../assets/config.json";
    console.log(configPath);
    let res: any = await this.httpClient.get(configPath).toPromise();

    // assign values to class
    Configuration.baseServerAPIEndpoint = res.baseServerAPIEndpoint;
    Configuration.appVersion = res.appVersion;
    Configuration.dateFormat = res.dateFormat;
    Configuration.doccumentPath = res.doccumentPath;
    Configuration.firstHomePage = res.firstHomePage;
    Configuration.assetsRootpath = res.assetsRootpath;
    Configuration.displayDateFormat=res.displayDateFormat;
  }



}
