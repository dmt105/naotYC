/**
 * Forgot password page
 */

import ForgotPasswordForm from '@/components/auth/ForgotPasswordForm';

export default function ForgotPasswordPage() {
	return (
		<div className="min-h-screen flex items-center justify-center p-4">
			<div className="w-700 max-w-md bg-white rounded-2xl shadow-2xl p-8">
				<ForgotPasswordForm />
			</div>
		</div>
	);
}
