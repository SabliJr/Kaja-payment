class TransactionsApi {
  async getTransactions(params: {
    page: number;
    limit: number;
    status?: string;
  }) {
    const mockTransactions = [
      {
        id: "tx_1",
        amount: 99.99,
        currency: "USD",
        customer: "John Doe",
        customerEmail: "john@example.com",
        status: "completed",
        date: "2024-04-03T10:30:00Z",
        xrplTxHash: "ABC123...XYZ789",
      },
      {
        id: "tx_2",
        amount: 49.99,
        currency: "USD",
        customer: "Jane Smith",
        customerEmail: "jane@example.com",
        status: "pending",
        date: "2024-04-02T15:45:00Z",
        xrplTxHash: "DEF456...UVW012",
      },
      {
        id: "tx_3",
        amount: 199.99,
        currency: "USD",
        customer: "Bob Johnson",
        customerEmail: "bob@example.com",
        status: "failed",
        date: "2024-04-01T09:15:00Z",
        xrplTxHash: "GHI789...RST345",
      },
    ];

    // Filter by status if provided
    const filteredTransactions = params.status
      ? mockTransactions.filter((tx) => tx.status === params.status)
      : mockTransactions;

    // Pagination
    const start = (params.page - 1) * params.limit;
    const end = start + params.limit;
    const paginatedTransactions = filteredTransactions.slice(start, end);

    return {
      transactions: paginatedTransactions,
      total: filteredTransactions.length,
      page: params.page,
      limit: params.limit,
    };
  }

  async getTransactionById(id: string) {
    const mockTransactions = [
      {
        id: "tx_1",
        amount: 99.99,
        currency: "USD",
        customer: "John Doe",
        customerEmail: "john@example.com",
        status: "completed",
        date: "2024-04-03T10:30:00Z",
        xrplTxHash: "ABC123...XYZ789",
        product: "Premium Plan",
        description: "Monthly subscription",
      },
    ];

    return mockTransactions.find((tx) => tx.id === id);
  }
}

export default new TransactionsApi();
