import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type DollarQuoteValue = {
  code: string;
  codein: string;
  name: string;
  high: string;
  low: string;
  varBid: string;
  pctChange: string;
  bid: string;
  ask: string;
  timestamp: string;
  create_date: string;
};

type DollarQuoteResponse = {
  USDBRL: DollarQuoteValue;
};

async function fetchDollarQuote(): Promise<DollarQuoteResponse> {
  const url = "https://economia.awesomeapi.com.br/last/USD-BRL";
  const response = await axios.get(url);
  return response.data;
}

export function useGetDollarQuoteQuery() {
  const getDollarQuote = useQuery<DollarQuoteResponse>({
    queryKey: ["dollarQuote"],
    queryFn: fetchDollarQuote,
  });

  return getDollarQuote;
}
