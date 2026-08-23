import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return <main className="auth-wrap"><SignUp fallbackRedirectUrl="/student" /></main>;
}
