import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return <main className="auth-wrap"><SignIn fallbackRedirectUrl="/student" /></main>;
}
