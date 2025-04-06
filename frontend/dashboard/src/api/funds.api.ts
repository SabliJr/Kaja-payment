import { API_BASE_URL } from "./config";

class FundsApi {
  async getBalances() {
    const response = await fetch(`${API_BASE_URL}/funds/balance`);
    if (!response.ok) {
      throw new Error("Failed to fetch balances");
    }
    return response.json();
  }

  async getExchangeRates() {
    return {
      rates: {
        "USD/XRP": 0.5,
        "XRP/USD": 2.0,
      },
      lastUpdated: "2024-04-03T12:00:00Z",
    };
  }

  async getWithdrawalHistory(params: { page: number; limit: number }) {
    const mockWithdrawals = [
      {
        id: "wd_1",
        amount: 1000.0,
        currency: "USD",
        status: "completed",
        method: "bank",
        date: "2024-03-15T10:30:00Z",
        destination: "Bank Account ****1234",
      },
      {
        id: "wd_2",
        amount: 500.0,
        currency: "XRP",
        status: "pending",
        method: "xrp_wallet",
        date: "2024-04-01T15:45:00Z",
        destination: "rXRPWallet123...",
      },
    ];

    // Pagination
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginatedWithdrawals = mockWithdrawals.slice(start, end);

    return {
      withdrawals: paginatedWithdrawals,
      total: mockWithdrawals.length,
      page: params.page,
      limit: params.limit,
    };
  }

  async convertFunds(data: {
    fromCurrency: string;
    toCurrency: string;
    amount: number;
  }) {
    return {
      id: `conv_${Date.now()}`,
      ...data,
      rate: 0.5,
      convertedAmount: data.amount * 0.5,
      status: "completed",
      date: new Date().toISOString(),
    };
  }

  async withdrawFunds(data: {
    amount: number;
    currency: string;
    method: "bank" | "xrp_wallet";
    destination: string;
  }) {
    return {
      id: `wd_${Date.now()}`,
      ...data,
      status: "pending",
      date: new Date().toISOString(),
    };
  }
}

export default new FundsApi();
