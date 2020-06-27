require('dotenv').config();
import * as cdk from '@aws-cdk/core';
import {AppStack} from './AppStack';

const app = new cdk.App();
new AppStack(app, 'test1', {

});

app.synth();