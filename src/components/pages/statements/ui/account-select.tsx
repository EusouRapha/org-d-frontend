import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Account } from "../hooks/use-statements-queries";

export default function AccountSelect({
  accounts,
  handleSelectAccount,
}: {
  accounts: Account[] | undefined;
  handleSelectAccount: (accountId: string) => void;
}) {
  return (
    <Select
      defaultValue="all"
      onValueChange={(value) => {
        handleSelectAccount(value);
      }}
    >
      <SelectTrigger className="w-[180px] max-[768px]:w-34">
        <SelectValue defaultValue="all" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectItem value="all">Mostrar todos</SelectItem>
          {accounts?.map((account) => (
            <SelectItem key={account.id} value={account.id.toString()}>
              {account.account_number}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
