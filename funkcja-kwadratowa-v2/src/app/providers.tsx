"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { NeonAuthUIProvider } from "@neondatabase/auth-ui";
import { authClient } from "@/lib/auth/client";

const plLocalization = {
  SIGN_IN: "Logowanie",
  SIGN_IN_ACTION: "Zaloguj się",
  SIGN_IN_DESCRIPTION: "Zaloguj się do swojego konta ucznia lub nauczyciela",
  SIGN_UP: "Rejestracja",
  SIGN_UP_ACTION: "Utwórz konto",
  SIGN_UP_DESCRIPTION: "Wprowadź dane, aby utworzyć konto",
  SIGN_UP_EMAIL: "Sprawdź pocztę i użyj linku weryfikacyjnego.",
  SIGN_OUT: "Wyloguj się",
  DONT_HAVE_AN_ACCOUNT: "Nie masz jeszcze konta?",
  ALREADY_HAVE_AN_ACCOUNT: "Masz już konto?",
  EMAIL: "E-mail",
  EMAIL_DESCRIPTION: "Adres e-mail używany do logowania.",
  EMAIL_INSTRUCTIONS: "Podaj poprawny adres e-mail.",
  EMAIL_PLACEHOLDER: "uczen@szkola.pl",
  EMAIL_REQUIRED: "Adres e-mail jest wymagany",
  NAME: "Imię i nazwisko",
  NAME_DESCRIPTION: "Podaj imię i nazwisko lub nazwę wyświetlaną.",
  NAME_PLACEHOLDER: "Imię i nazwisko",
  PASSWORD: "Hasło",
  PASSWORD_PLACEHOLDER: "Hasło",
  PASSWORD_REQUIRED: "Hasło jest wymagane",
  CONFIRM_PASSWORD: "Potwierdź hasło",
  CONFIRM_PASSWORD_PLACEHOLDER: "Powtórz hasło",
  CONFIRM_PASSWORD_REQUIRED: "Potwierdzenie hasła jest wymagane",
  PASSWORDS_DO_NOT_MATCH: "Hasła nie są identyczne",
  REMEMBER_ME: "Zapamiętaj mnie",
  OR_CONTINUE_WITH: "Lub kontynuuj przez",
  FORGOT_PASSWORD: "Nie pamiętasz hasła",
  FORGOT_PASSWORD_ACTION: "Wyślij link do zmiany hasła",
  FORGOT_PASSWORD_DESCRIPTION: "Podaj adres e-mail, aby ustawić nowe hasło",
  FORGOT_PASSWORD_EMAIL: "Sprawdź pocztę — wysłaliśmy link do zmiany hasła.",
  FORGOT_PASSWORD_LINK: "Nie pamiętasz hasła?",
  RESET_PASSWORD: "Ustaw nowe hasło",
  RESET_PASSWORD_ACTION: "Zapisz nowe hasło",
  RESET_PASSWORD_DESCRIPTION: "Wprowadź nowe hasło",
  RESET_PASSWORD_SUCCESS: "Hasło zostało zmienione",
  NEW_PASSWORD: "Nowe hasło",
  NEW_PASSWORD_PLACEHOLDER: "Nowe hasło",
  NEW_PASSWORD_REQUIRED: "Nowe hasło jest wymagane",
  VERIFY_YOUR_EMAIL: "Potwierdź adres e-mail",
  VERIFY_YOUR_EMAIL_DESCRIPTION: "Sprawdź skrzynkę pocztową i potwierdź adres e-mail.",
  RESEND_VERIFICATION_EMAIL: "Wyślij wiadomość weryfikacyjną ponownie",
  CONTINUE: "Kontynuuj",
  GO_BACK: "Wróć",
  REQUEST_FAILED: "Operacja nie powiodła się",
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
