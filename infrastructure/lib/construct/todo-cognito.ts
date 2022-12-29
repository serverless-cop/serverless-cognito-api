import {Construct} from "constructs";
import {GenericDynamoTable} from "../generic/GenericDynamoTable";
import {GenericApi} from "../generic/GenericApi";
import {NodejsFunction} from "aws-cdk-lib/aws-lambda-nodejs";
import {createTodoSchema, editTodoSchema} from "./todo-schema";
import {GenericCognito} from "../generic/GenericCognito";
import {UserPool} from "aws-cdk-lib/aws-cognito";

export interface TodoCognitoProps {
    suffixId: string
}

export class TodoCognito extends GenericCognito {
    suffixId: string

    public constructor(scope: Construct, id: string, props: TodoCognitoProps) {
        super(scope, id, props)
        this.suffixId = props.suffixId
        this.initializeCognito()
    }

    public initializeCognito(){
        this.createUserPool({
            id: 'todoUserPoolId',
            userPoolName: 'todoUserPool-' + this.suffixId,
            selfSignUpEnabled: true,
            emailSignInAliases: true,
            userNameSignInAliases: true,
            phoneSignInAliases: false,
        })

        this.createUserPoolClient({
            id: 'todoUserPoolClientId',
            userPoolClientName: 'todoUserPoolClient',
            generateSecret: false,
            authFlow:{
                adminUserPassword: true,
                custom: true,
                userPassword: true,
                userSrp: true
            }
        })

        this.initializeIdentityPool({
            id: 'identityPoolId',
            userPool: this.userPool,
            userPoolClient: this.userPoolClient,
            allowUnauthenticatedIdentities: false,
        })

        this.initializeRoles(this.identityPool)

        this.createAdminsGroup()

        this.attachRoles()
    }


}
