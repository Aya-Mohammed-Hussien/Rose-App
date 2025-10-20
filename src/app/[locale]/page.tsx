import LoginForm from './(auth)/login/_components/login-form';
import VerifyOTPage from './(auth)/verify-otp/page';

export default async function page() {
  return (
    <main className="min-h-screen grid place-items-center">
      <LoginForm />
    </main>
  );
}
