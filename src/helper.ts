import {Result} from './type';
import {Fail, Success} from './class';

/**
 * Result matcher, returns success/error data
 *
 * Example:
 * const accounts = new AccountPresenter(user).getAccounts();
 * const value = match(accounts)((data) => data, (e) => e);
 *
 * @param input: Result<R, E> - result container
 */
export const match = <R, E>(input: Result<R, E>) =>
	/**
	 * @param success: R | void - success callback
	 * @param fail: E | void - fail callback
	 *
	 * @throws Error - exception while matching
	 */
	(success: (r: R) => R | void, fail: (e: E) => E | void) => {
		if (input instanceof Success) {
			return success(input.result);
		} else if (input instanceof Fail) {
			return fail(input.error);
		}

		throw Error('Error while matching');
	};

/**
 * Result matcher, returns success or null if there are no results
 *
 * Example:
 * const accounts = new AccountPresenter(user).getAccounts();
 * option(accounts, (data) => console.log(data));
 *
 * @param input: Result<R, E> - result container
 */
export const option = <R, E>(input: Result<R, E>) =>
	/**
	 * @param onResult: R | E | void - result callback
	 */
	(onResult: (r: R | E) => R | E | void) => {
		if (input instanceof Success) {
			return onResult(input.result);
		}

		return null;
	};

/**
 * Functional wrapper for Success class
 * @param data: R - input data
 *
 * Example: return success from service
 *  if (user.account) {
 *      const data = {...user.account, name: 'New Name'};
 *
 *      return success(data);
 *  }
 */
export const success = <R>(data: R) => new Success(data);

/**
 * Functional wrapper for Fail class
 * @param data: R - input data
 *
 * Example: return failure from service
 *  if (!user.account) {
 *      return failure({data: null, msg: 'User not valid, empty account!'});
 *  }
 */
export const failure = <E>(data: E) => new Fail(data);
