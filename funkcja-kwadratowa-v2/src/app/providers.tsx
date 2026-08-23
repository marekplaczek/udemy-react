"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { authClient } from "@/lib/auth/client";

const plLocalization = {
  auth: {
    account: "Konto",
    alreadyHaveAnAccount: "Masz już konto?",
    alreadyVerifiedYourEmail: "Adres e-mail jest już potwierdzony?",
    confirmPassword: "Potwierdź hasło",
    confirmPasswordPlaceholder: "Powtórz hasło",
    checkYourEmail: "Sprawdź skrzynkę e-mail i użyj linku weryfikacyjnego",
    checkYourEmailTitle: "Sprawdź pocztę",
    continueWith: "Kontynuuj z {{provider}}",
    email: "E-mail",
    emailPlaceholder: "uczen@szkola.pl",
    fieldRequired: "To pole jest wymagane",
    forgotPassword: "Nie pamiętasz hasła",
    forgotPasswordLink: "Nie pamiętasz hasła?",
    hidePassword: "Ukryj hasło",
    invalidEmail: "Podaj poprawny adres e-mail",
    invalidResetPasswordToken: "Link do zmiany hasła jest nieprawidłowy lub wygasł",
    name: "Imię i nazwisko",
    namePlaceholder: "Imię i nazwisko",
    needToCreateAnAccount: "Nie masz jeszcze konta?",
    newPassword: "Nowe hasło",
    newPasswordPlaceholder: "Nowe hasło",
    openEmailProvider: "Otwórz {{provider}}",
    or: "LUB",
    optional: " (opcjonalnie)",
    password: "Hasło",
    passwordCompromised: "To hasło pojawiło się w wycieku danych. Wybierz inne hasło.",
    passwordFair: "Średnie",
    passwordGood: "Dobre",
    passwordPlaceholder: "Hasło",
    passwordResetEmailSent: "Wysłano wiadomość do zmiany hasła",
    passwordResetErrorDescription: "Nie udało się zmienić hasła. Spróbuj ponownie.",
    passwordResetSuccess: "Hasło zostało zmienione",
    passwordResetSuccessDescription: "Hasło zostało zmienione. Możesz zalogować się nowym hasłem.",
    passwordStrength: "Siła hasła",
    passwordStrong: "Silne",
    passwordWeak: "Słabe",
    passwordsDoNotMatch: "Hasła nie są identyczne",
    rememberMe: "Zapamiętaj mnie",
    tooLong: "Maksymalna długość to {{max}} znaków",
    tooShort: "Minimalna długość to {{min}} znaków",
    rememberYourPassword: "Pamiętasz hasło?",
    resend: "Wyślij ponownie",
    resendIn: "Wyślij ponownie za {{seconds}} s",
    resetLinkSentTo: "Link do zmiany hasła został wysłany na {{email}}",
    resetPassword: "Ustaw nowe hasło",
    sendResetLink: "Wyślij link do zmiany hasła",
    scanToOpenEmailProvider: "Zeskanuj kod, aby otworzyć {{provider}} na telefonie",
    showPassword: "Pokaż hasło",
    signIn: "Zaloguj się",
    signOut: "Wyloguj się",
    signUp: "Utwórz konto",
    verificationEmailSent: "Wysłano wiadomość weryfikacyjną",
    verifyEmail: "Potwierdź adres e-mail",
  },
};

export function Providers({ children }: { children: ReactNode }) {
  const router = useRouter();

  return (
    <NeonAuthUIProvider
      authClient={authClient}
      navigate={router.push}
      replace={router.replace}
      onSessionChange={() => router.refresh()}
      redirectTo="/student"
      Link={Link}
      localization={plLocalization}
    >
      {children}
    </NeonAuthUIProvider>
  );
}
