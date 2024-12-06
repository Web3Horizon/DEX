export class AppError extends Error {
	originalErr: string | null;

	constructor(msg: string, originalErr: string | null = null) {
		super(msg); // Call the base class constructor with the error message
		this.name = 'AppError'; // Set the error name
		this.originalErr = originalErr;

		// Ensure proper stack trace (only required in V8 environments like Node.js)
		if (Error.captureStackTrace) {
			Error.captureStackTrace(this, AppError);
		}
	}
}

export function isAppError(value: unknown): value is AppError {
	return value instanceof AppError;
}
