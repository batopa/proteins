/**
 * Exec Object.prototype.hasOwnProperty against an object.
 * @param {Object} scope The scope object to check.
 * @param {string} property The property name to check.
 * @return {boolean}
 */
export default function has(scope, property) {
    return Object.prototype.hasOwnProperty.call(scope, property);
}
