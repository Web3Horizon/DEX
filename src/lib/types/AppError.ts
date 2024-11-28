export interface AppError {
	msg: string;
	originalErr: string | null;
}

export const newAppError = (msg: string, originalErr: string | null) => {
	return { msg, originalErr };
};
