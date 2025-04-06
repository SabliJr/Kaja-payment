import { API_BASE_URL } from "./config";

class DashboardApi {
  async getDashboardStats() {
    const response = await fetch(`${API_BASE_URL}/dashboard/stats`);
    if (!response.ok) {
      throw new Error("Failed to fetch dashboard stats");
    }
    return response.json();
  }
}

export default new DashboardApi();
