import {JsonSchemaType} from "aws-cdk-lib/aws-apigateway";

export const createTodoSchema = {
    type: JsonSchemaType.OBJECT,
    required: ["description", "name", "reminderDate", "reminderTime", "email"],
    properties: {
        name: {
            type: JsonSchemaType.STRING
        },
        description: {
            type: JsonSchemaType.STRING
        },
        reminderDate: {
            type: JsonSchemaType.STRING
        },
        reminderTime: {
            type: JsonSchemaType.STRING
        },
        email: {
            type: JsonSchemaType.STRING
        },
        phone: {
            type: JsonSchemaType.STRING
        },
        emailReminder: {
            type: JsonSchemaType.BOOLEAN
        },
        phoneReminder: {
            type: JsonSchemaType.BOOLEAN
        },
    },
}

export const editTodoSchema = {
    type: JsonSchemaType.OBJECT,
    required: ["id", "description", "name", "reminderDate", "reminderTime", "email"],
    properties: {
        id: {
            type: JsonSchemaType.STRING
        },
        name: {
            type: JsonSchemaType.STRING
        },
        description: {
            type: JsonSchemaType.STRING
        },
        reminderDate: {
            type: JsonSchemaType.STRING
        },
        reminderTime: {
            type: JsonSchemaType.STRING
        },
        email: {
            type: JsonSchemaType.STRING
        },
        phone: {
            type: JsonSchemaType.STRING
        },
        emailReminder: {
            type: JsonSchemaType.BOOLEAN
        },
        phoneReminder: {
            type: JsonSchemaType.BOOLEAN
        },
    },
}
