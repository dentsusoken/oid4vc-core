/**
 * Converts an unknown value to a string representation for error messages.
 *
 * @param {unknown} e - The value to convert to an error message.
 * @returns {string} The string representation of the value for error messages.
 *
 * @example
 * getErrorMessage(undefined); // returns 'undefined'
 * getErrorMessage(null); // returns 'null'
 * getErrorMessage('Something went wrong'); // returns 'Something went wrong'
 * getErrorMessage(new Error('An error occurred')); // returns 'An error occurred'
 * getErrorMessage({ code: 'ERR_INVALID_DATA' }); // returns '{"code":"ERR_INVALID_DATA"}'
 */
export const getErrorMessage = (e: unknown): string => {
  if (e === undefined) {
    return 'undefined';
  }

  if (e === null) {
    return 'null';
  }

  if (typeof e === 'string') {
    return e;
  }

  if (e instanceof Error) {
    return e.message;
  }

  return JSON.stringify(e);
};

/**
 * Converts an unknown value to an Error object.
 *
 * @param {unknown} e - The value to convert to an Error object.
 * @returns {Error} An Error object representing the provided value.
 *
 * @example
 * convertToError(new Error('An error occurred')); // returns the same Error object
 * convertToError('Something went wrong'); // returns a new Error object with the message 'Something went wrong'
 * convertToError(404); // returns a new Error object with the message '404'
 * convertToError({ code: 'ERR_INVALID_DATA' }); // returns a new Error object with the message '{"code":"ERR_INVALID_DATA"}'
 */
export const convertToError = (e: unknown): Error => {
  if (e instanceof Error) {
    return e;
  }

  return new Error(getErrorMessage(e));
};
