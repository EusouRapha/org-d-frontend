import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleAccountsRedirect() {
  window.location.href = "/contas";
}

export function handleTransactionsRedirect() {
  window.location.href = "/transacoes";
}

export function handleDepositRedirect() {
  window.location.href = "/deposito";
}

export function handleStatementRedirect() {
  window.location.href = "/extrato";
}

export function handleHomeRedirect() {
  window.location.href = "/";
}

export function handleProfileRedirect() {
  window.location.href = "/perfil";
}
