/**
 * WuzlHub API
 * A simple api
 *
 * OpenAPI spec version: v1
 *
 *
 * NOTE: This class is auto generated by the swagger code generator program.
 * https://github.com/swagger-api/swagger-codegen.git
 * Do not edit the class manually.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Http, Headers, RequestOptionsArgs, Response, URLSearchParams} from '@angular/http';
import {Injectable, Optional} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

/* tslint:disable:no-unused-variable member-ordering */

'use strict';
import {Player} from "../model/player";
import {environment} from "../../environments/environment";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class PlayerApi {
  protected basePath = environment.baseApiPath;
  public defaultHeaders: Headers = new Headers();


  public players: [Player];

  constructor(protected http: Http, protected authHttp: AuthHttp, @Optional() basePath: string) {
    if (basePath) {
      this.basePath = basePath;
    }

    this.defaultHeaders.append("Content-Type", "application/json");
  }

  /**
   *
   *
   * @param playerId
   */
  public PlayerByPlayerIdDelete(playerId: number, extraHttpRequestParams?: any): Observable<{}> {
    const path = this.basePath + '/api/Player/{playerId}'
        .replace('{' + 'playerId' + '}', String(playerId));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'playerId' is not null or undefined
    if (playerId === null || playerId === undefined) {
      throw new Error('Required parameter playerId was null or undefined when calling apiPlayerByPlayerIdDelete.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'DELETE',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param playerId
   */
  public PlayerByPlayerIdGet(playerId: number, extraHttpRequestParams?: any) {
    const path = this.basePath + '/api/Player/{playerId}'
        .replace('{' + 'playerId' + '}', String(playerId));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'playerId' is not null or undefined
    if (playerId === null || playerId === undefined) {
      throw new Error('Required parameter playerId was null or undefined when calling apiPlayerByPlayerIdGet.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });

  }

  /**
   *
   *
   * @param playerId
   */
  public PlayerByPlayerIdProfilepicGet(playerId: number, extraHttpRequestParams?: any): Observable<{}> {
    const path = this.basePath + '/api/Player/{playerId}/profilepic'
        .replace('{' + 'playerId' + '}', String(playerId));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'playerId' is not null or undefined
    if (playerId === null || playerId === undefined) {
      throw new Error('Required parameter playerId was null or undefined when calling apiPlayerByPlayerIdProfilepicGet.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param playerId
   */
  public PlayerByPlayerIdProfilepicPost(playerId: number, extraHttpRequestParams?: any) {
    const path = this.basePath + '/api/Player/{playerId}/profilepic'
        .replace('{' + 'playerId' + '}', String(playerId));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'playerId' is not null or undefined
    if (playerId === null || playerId === undefined) {
      throw new Error('Required parameter playerId was null or undefined when calling apiPlayerByPlayerIdProfilepicPost.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'POST',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  public UploadProfilePic(playerId, file: File) {
    const path = this.basePath + '/api/Player/{playerId}/profilepic'
        .replace('{' + 'playerId' + '}', String(playerId));
    return Observable.create(observer => {
      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      formData.append("file", file);

      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            observer.next(JSON.parse(xhr.response));
            observer.complete();
          } else {
            observer.error(xhr.response);
          }
        }
      };

      xhr.open('POST', path, true);
      xhr.send(formData);
    });
  }

  /**
   *
   *
   * @param playerId
   * @param player
   */
  public PlayerByPlayerIdPut(playerId: number, player?: Player, extraHttpRequestParams?: any) {
    const path = this.basePath + '/api/Player/{playerId}'
        .replace('{' + 'playerId' + '}', String(playerId));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'playerId' is not null or undefined
    if (playerId === null || playerId === undefined) {
      throw new Error('Required parameter playerId was null or undefined when calling apiPlayerByPlayerIdPut.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'PUT',
      headers: headerParams,
      search: queryParameters
    };
    requestOptions.body = JSON.stringify(player);

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param attendance
   */
  public PlayerFindbyattendanceByAttendanceGet(attendance: string, extraHttpRequestParams?: any): Observable<{}> {
    const path = this.basePath + '/api/Player/findbyattendance/{attendance}'
        .replace('{' + 'attendance' + '}', String(attendance));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'attendance' is not null or undefined
    if (attendance === null || attendance === undefined) {
      throw new Error('Required parameter attendance was null or undefined when calling apiPlayerFindbyattendanceByAttendanceGet.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param email
   */
  public PlayerFindbyemailByEmailGet(email: string, extraHttpRequestParams?: any): Observable<Array<Player>> {
    const path = this.basePath + '/api/Player/findbyemail/{email}'
        .replace('{' + 'email' + '}', String(email));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'email' is not null or undefined
    if (email === null || email === undefined) {
      throw new Error('Required parameter email was null or undefined when calling apiPlayerFindbyemailByEmailGet.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param roleId
   */
  public PlayerFindbyroleByRoleIdGet(roleId: number, extraHttpRequestParams?: any): Observable<{}> {
    const path = this.basePath + '/api/Player/findbyrole/{roleId}'
        .replace('{' + 'roleId' + '}', String(roleId));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'roleId' is not null or undefined
    if (roleId === null || roleId === undefined) {
      throw new Error('Required parameter roleId was null or undefined when calling apiPlayerFindbyroleByRoleIdGet.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param username
   */
  public PlayerFindbyusernameByUsernameGet(username: string, extraHttpRequestParams?: any): Observable<{}> {
    const path = this.basePath + '/api/Player/findbyusername/{username}'
        .replace('{' + 'username' + '}', String(username));

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    // verify required parameter 'username' is not null or undefined
    if (username === null || username === undefined) {
      throw new Error('Required parameter username was null or undefined when calling apiPlayerFindbyusernameByUsernameGet.');
    }
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   */
  public PlayerGet(extraHttpRequestParams?: any) {
    const path = this.basePath + '/api/Player';

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    let requestOptions: RequestOptionsArgs = {
      method: 'GET',
      headers: headerParams,
      search: queryParameters
    };

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

  /**
   *
   *
   * @param player
   */
  public PlayerPost(player?: Player, extraHttpRequestParams?: any) {
    const path = this.basePath + '/api/Player';

    let queryParameters = new URLSearchParams();
    let headerParams = this.defaultHeaders;
    let requestOptions: RequestOptionsArgs = {
      method: 'POST',
      headers: headerParams,
      search: queryParameters
    };
    requestOptions.body = JSON.stringify(player);

    return this.http.request(path, requestOptions)
      .map((response: Response) => {
        if (response.status === 204) {
          return undefined;
        } else {
          return response.json();
        }
      });
  }

}
