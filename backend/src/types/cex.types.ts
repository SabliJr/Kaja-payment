export interface CrossBridgeRequest {
  ethTxHash: string;
  amount: string;
  merchantId: string;
}

export interface MockCexTransaction {
  id: string;
  status: "pending" | "completed" | "failed";
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  exchangeRate: string;
  timestamp: Date;
}

export interface MockCexWithdrawal {
  id: string;
  transactionId: string;
  amount: string;
  currency: string;
  destinationAddress: string;
  status: "pending" | "completed" | "failed";
  timestamp: Date;
}

export interface CrossBridgeTransaction {
  id: string;
  ethTxHash: string;
  merchantId: string;
  usdtAmount: string;
  xrpAmount: string;
  status: "pending" | "processing" | "completed" | "failed";
  cexTransactionId?: string;
  xrpTransactionHash?: string;
  createdAt: Date;
  completedAt?: Date;
}
