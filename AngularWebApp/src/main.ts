import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { Amplify } from '@aws-amplify/core';

Amplify.configure({
  aws_cognito_region: "us-east-1", // (required) - Region where Amazon Cognito project was created
  aws_user_pools_id:  "us-east-1_QOqHEMwX9", // (optional) -  Amazon Cognito User Pool ID
  aws_user_pools_web_client_id: "5t3le8878kgc72", // (optional) - Amazon Cognito App Client ID (App client secret needs to be disabled)
  aws_cognito_identity_pool_id: "us-east-1:f602c14b-0fde-409c-9a7e-0baccbfd87d0", // (optional) - Amazon Cognito Identity Pool ID
  aws_mandatory_sign_in: "enable" // (optional) - Users are not allowed to get the aws credentials unless they are signed in
})

// if (environment.production) {
  enableProdMode();
// }

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
