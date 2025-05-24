import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleAccountsRedirect() {
  window.location.href = "/contas";
}

export function handleWithdrawRedirect() {
  window.location.href = "/saque";
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
