import { Client, Wallet, Payment, xrpToDrops } from "xrpl";
class XrplService {
  private client: Client;
  constructor() {
    this.client = new Client("wss://s.altnet.rippletest.net:51233/");
  }

  async connect() {
    await this.client.connect();
  }

  async disconnect() {
    await this.client.disconnect();
  }

  async createWallet() {
    const { wallet, balance } = await this.client.fundWallet();
    console.log("===========WALLET BEGIN===========");
    console.log(wallet, balance);
    console.log("===========WALLET END===========");
    return { wallet, balance };
  }

  async sendRLUSDPayment(
    senderSeed: string,
    destinationAddress: string,
    amount: string
  ) {
    console.log("===========SEND RLUSD PAYMENT BEGIN===========");
    console.log(senderSeed, destinationAddress, amount);
    console.log("===========SEND RLUSD PAYMENT END===========");
    try {
      const RLUSD_ISSUER = "rQhWct2fv4Vc4KRjRgMrxa8xPN9Zx9iLKV";

      // Create wallet from seed
      const wallet = Wallet.fromSeed(senderSeed);

      const paths = await this.client.request({
        command: "path_find",
        subcommand: "create",
        source_account: wallet.classicAddress,
        destination_account: destinationAddress,
        send_max: amount,
        destination_amount: {
          currency: "524C555344000000000000000000000000000000",
          value: "-1",
          issuer: RLUSD_ISSUER,
        },
      });
      console.log("Available Paths:", paths.result);
      return paths.result;
    } catch (error) {
      console.error("Error during RLUSD payment:", error);
      throw error;
    }
  }

  async sendXRPayment(senderSeed: string, destinationAddress: string, amount: string) {

    const wallet = Wallet.fromSeed(senderSeed);
    const tx: Payment = {
      TransactionType: "Payment",
      Amount: xrpToDrops(amount),
      Destination: destinationAddress,
      Account: wallet.classicAddress,
    }  
    console.log("===========SEND XR PAYMENT BEGIN===========");
    const result = await this.client.submitAndWait(tx, {
      autofill: true,
      wallet: wallet,
    });
    console.log(result);
    console.log("===========SEND XR PAYMENT END===========");
    console.log("===========WALLET Balance===========");
    const balance = await this.getBalance(wallet.classicAddress);
    console.log("Initial Balance:", balance);
    const destinationBalance = await this.getBalance(destinationAddress);
    console.log("Destination Balance:", destinationBalance);
    console.log("===========WALLET Balance END===========");
    return result;
  }

  

  async getBalance(address: string) {
    try {
      // Get XRP balance
      const accountInfo = await this.client.request({
        command: "account_info",
        account: address,
        ledger_index: "validated",
      });

      // Get RLUSD balance
      const accountLines = await this.client.request({
        command: "account_lines",
        account: address,
        ledger_index: "validated",
      });

      const xrpBalance = accountInfo.result.account_data.Balance;
      const rlusdBalance =
        accountLines.result.lines.find((line: any) => line.currency === "RLUSD")
          ?.balance || "0";

      return {
        balances: [
          {
            currency: "XRP",
            amount: parseFloat(xrpBalance) / 1000000, // Convert from drops to XRP
            issuer: null,
            type: "native",
          },
          {
            currency: "RLUSD",
            amount: parseFloat(rlusdBalance),
            issuer: "rXRPWallet123...", // Replace with actual issuer
            type: "stablecoin",
          },
        ],
        totalValue: {
          xrp: parseFloat(xrpBalance) / 1000000,
          rlusd: parseFloat(rlusdBalance),
        },
      };
    } catch (error) {
      console.error("Error fetching balance:", error);
      throw error;
    }
  }
}

const xrplService = new XrplService();
await xrplService.connect();

export default xrplService;
