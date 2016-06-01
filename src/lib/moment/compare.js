/*
 * This file has different methods which are used for comparing two moments 
 */
import { isMoment } from './constructor';
import { normalizeUnits } from '../units/aliases';
import { createLocal } from '../create/local';
import isUndefined from '../utils/is-undefined';

/*
 * Method used to check whether the current(this) moment is after the input moment
 * returns true if 'this' moment is after input moment, returns false in all other cases (even when one of moment is invalid) 
 */
export function isAfter (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    // If any one of the two moments are not valid, return false 
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    // If units are not passed, by default in millisecond level moments are compared
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() > localInput.valueOf();
    } else {
        return localInput.valueOf() < this.clone().startOf(units).valueOf();
    }
}

/*
 * Method used to check whether the current(this) moment is before the input moment
 * returns true if 'this' moment is before input moment, returns false in all other cases (even when one of moment is invalid) 
 */
export function isBefore (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input);
    // If any one of the two moments are not valid, return false 
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    // If units are not passed, by default in millisecond level moments are compared
    units = normalizeUnits(!isUndefined(units) ? units : 'millisecond');
    if (units === 'millisecond') {
        return this.valueOf() < localInput.valueOf();
    } else {
        return this.clone().endOf(units).valueOf() < localInput.valueOf();
    }
}

/*
 * Method used to check whether the current(this) moment is in between given 2 input moments
 * returns true if 'this' moment is between input moments, returns false otherwise
 */
export function isBetween (from, to, units, inclusivity) {
    // A [ indicates inclusion of a value. A ( indicates exclusion. If the inclusivity parameter is used, both indicators must be passed
    inclusivity = inclusivity || '()';
    return (inclusivity[0] === '(' ? this.isAfter(from, units) : !this.isBefore(from, units)) &&
        (inclusivity[1] === ')' ? this.isBefore(to, units) : !this.isAfter(to, units));
}

/*
 * Method used to check whether the current(this) moment is same as the input moment
 * returns true if 'this' moment is same as input moment, returns false if not
 */
export function isSame (input, units) {
    var localInput = isMoment(input) ? input : createLocal(input),
        inputMs;
    // If any one of the two moments are not valid, return false 
    if (!(this.isValid() && localInput.isValid())) {
        return false;
    }
    units = normalizeUnits(units || 'millisecond');
    if (units === 'millisecond') { // The moments have to be equal upto millisecond level
        return this.valueOf() === localInput.valueOf();
    } else {
        inputMs = localInput.valueOf();
        return this.clone().startOf(units).valueOf() <= inputMs && inputMs <= this.clone().endOf(units).valueOf();
    }
}

/*
 * Method used to check whether the current(this) moment is same as or after the input moment
 * returns false if 'this' moment is before input moment, returns true otherwise
 */
export function isSameOrAfter (input, units) {
    return this.isSame(input, units) || this.isAfter(input,units);
}

/*
 * Method used to check whether the current(this) moment is same as or before the input moment
 * returns false if 'this' moment is after input moment, returns true otherwise
 */
export function isSameOrBefore (input, units) {
    return this.isSame(input, units) || this.isBefore(input,units);
}
