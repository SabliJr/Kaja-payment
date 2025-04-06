class SettingsApi {
  async getAccountSettings() {
    return {
      profile: {
        email: "merchant@example.com",
        name: "Merchant Name",
        company: "Merchant Company",
        website: "https://example.com",
        timezone: "UTC",
        language: "en",
      },
      security: {
        twoFactorEnabled: true,
        lastPasswordChange: "2024-03-01T00:00:00Z",
        lastLogin: "2024-04-03T10:30:00Z",
        loginHistory: [
          {
            date: "2024-04-03T10:30:00Z",
            ip: "192.168.1.1",
            location: "New York, USA",
            device: "Chrome on MacOS",
          },
        ],
      },
      notifications: {
        email: {
          paymentReceived: true,
          withdrawalCompleted: true,
          securityAlerts: true,
        },
        push: {
          paymentReceived: true,
          withdrawalCompleted: false,
          securityAlerts: true,
        },
      },
      api: {
        apiKey: "sk_test_1234567890",
        webhookUrl: "https://example.com/webhook",
        webhookSecret: "whsec_1234567890",
      },
    };
  }

  async updateProfile(data: {
    name?: string;
    company?: string;
    website?: string;
    timezone?: string;
    language?: string;
  }) {
    return {
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }

  async updateSecurity(data: {
    currentPassword: string;
    newPassword?: string;
    twoFactorEnabled?: boolean;
  }) {
    return {
      twoFactorEnabled: data.twoFactorEnabled ?? true,
      lastPasswordChange: new Date().toISOString(),
    };
  }

  async updateNotifications(data: {
    email?: {
      paymentReceived?: boolean;
      withdrawalCompleted?: boolean;
      securityAlerts?: boolean;
    };
    push?: {
      paymentReceived?: boolean;
      withdrawalCompleted?: boolean;
      securityAlerts?: boolean;
    };
  }) {
    return {
      ...data,
      updatedAt: new Date().toISOString(),
    };
  }

  async rotateApiKey() {
    return {
      apiKey: `sk_test_${Date.now()}`,
      rotatedAt: new Date().toISOString(),
    };
  }
}

export default new SettingsApi();
