import { v4 as uuidv4 } from "uuid";
import { MockCexTransaction, MockCexWithdrawal } from "../types/cex.types.js";

class MockCexService {
  private transactions: Map<string, MockCexTransaction>;
  private withdrawals: Map<string, MockCexWithdrawal>;
  private readonly mockExchangeRate: string = "0.5"; // 1 USDT = 0.5 XRP (mock rate)

  constructor() {
    this.transactions = new Map();
    this.withdrawals = new Map();
  }

  async depositUSDT(amount: string): Promise<MockCexTransaction> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transaction: MockCexTransaction = {
      id: uuidv4(),
      status: "completed",
      fromCurrency: "USDT",
      toCurrency: "XRP",
      amount,
      exchangeRate: this.mockExchangeRate,
      timestamp: new Date(),
    };

    this.transactions.set(transaction.id, transaction);
    return transaction;
  }

  async convertToXRP(transactionId: string): Promise<MockCexTransaction> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const transaction = this.transactions.get(transactionId);
    if (!transaction) {
      throw new Error("Transaction not found");
    }

    // Calculate XRP amount based on mock exchange rate
    const xrpAmount = (
      parseFloat(transaction.amount) * parseFloat(this.mockExchangeRate)
    ).toString();

    const conversionTx: MockCexTransaction = {
      id: uuidv4(),
      status: "completed",
      fromCurrency: "USDT",
      toCurrency: "XRP",
      amount: xrpAmount,
      exchangeRate: this.mockExchangeRate,
      timestamp: new Date(),
    };

    this.transactions.set(conversionTx.id, conversionTx);
    return conversionTx;
  }

  async withdrawXRP(
    amount: string,
    destinationAddress: string
  ): Promise<MockCexWithdrawal> {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const withdrawal: MockCexWithdrawal = {
      id: uuidv4(),
      transactionId: uuidv4(),
      amount,
      currency: "XRP",
      destinationAddress,
      status: "completed",
      timestamp: new Date(),
    };

    this.withdrawals.set(withdrawal.id, withdrawal);
    return withdrawal;
  }

  async getTransactionStatus(
    transactionId: string
  ): Promise<MockCexTransaction | undefined> {
    return this.transactions.get(transactionId);
  }

  async getWithdrawalStatus(
    withdrawalId: string
  ): Promise<MockCexWithdrawal | undefined> {
    return this.withdrawals.get(withdrawalId);
  }
}

export default new MockCexService();
