import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint({ async: true })
export class IsPhoneConstraint implements ValidatorConstraintInterface {
  validate(phone: any) {
    const phoneString = String(phone);
    return !isNaN(phone) && !/\s/.test(phoneString) && phoneString.length === 9;
  }
}

export function IsPhone(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsPhoneConstraint,
    });
  };
}
