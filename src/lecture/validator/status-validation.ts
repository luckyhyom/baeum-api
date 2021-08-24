import { NotFoundException } from '@nestjs/common';
import { ValidatorConstraint, ValidatorConstraintInterface, ValidationArguments } from 'class-validator';
import * as lecture from '../lecture.model'


@ValidatorConstraint({ name: 'lectureStatus', async: false })
export class LectureStatus implements ValidatorConstraintInterface {

    validate(value: string, args: ValidationArguments): boolean {
        value = value.toUpperCase();
        return this.validateStatus(value);
    }


    validateStatus(value: string): boolean {
        const regex = new RegExp(`${lecture.PRIVATE}|${lecture.PUBLIC}`,'gi');
        return regex.test(value);
    }

    defaultMessage(args: ValidationArguments) {
        // console.log(args);
        return `lecture\'s status should be "PUBLIC" or "PRIVATE".`;
    }
}