const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

class ApiService {
  constructor() {
    this.baseURL = API_BASE_URL;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    return {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    };
  }

  // Helper method to handle responses
  async handleResponse(response) {
    if (!response.ok) {
      const error = await response.json().catch(() => ({ message: 'Network error' }));
      throw new Error(error.message || 'Request failed');
    }
    return response.json();
  }

  // Authentication endpoints
  async signIn(email, password) {
    const response = await fetch(`${this.baseURL}/auth/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    });
    return this.handleResponse(response);
  }

  async signUp(email, password, firstName, lastName) {
    const response = await fetch(`${this.baseURL}/auth/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, firstName, lastName })
    });
    return this.handleResponse(response);
  }

  async verifyEmail(email, code) {
    const response = await fetch(`${this.baseURL}/auth/verify-email`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code })
    });
    return this.handleResponse(response);
  }

  async resendVerification(email) {
    const response = await fetch(`${this.baseURL}/auth/resend-verification`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    return this.handleResponse(response);
  }

  async refreshToken() {
    const response = await fetch(`${this.baseURL}/auth/refresh`, {
      method: 'POST',
      credentials: 'include'
    });
    return this.handleResponse(response);
  }

  async logout() {
    const response = await fetch(`${this.baseURL}/auth/logout`, {
      method: 'POST',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // Campaigns endpoints (user-specific)
  async getCampaigns() {
    const response = await fetch(`${this.baseURL}/campaigns`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async createCampaign(payload) {
    const response = await fetch(`${this.baseURL}/campaigns`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async updateCampaign(id, payload) {
    const response = await fetch(`${this.baseURL}/campaigns/${id}`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async deleteCampaign(id) {
    const response = await fetch(`${this.baseURL}/campaigns/${id}`, {
      method: 'DELETE',
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  // User endpoints
  async getUserProfile() {
    const response = await fetch(`${this.baseURL}/user/profile`, {
      headers: this.getAuthHeaders()
    });
    return this.handleResponse(response);
  }

  async updateUserProfile(profileData) {
    const response = await fetch(`${this.baseURL}/user/profile`, {
      method: 'PUT',
      headers: this.getAuthHeaders(),
      body: JSON.stringify(profileData)
    });
    return this.handleResponse(response);
  }

  async changePassword(currentPassword, newPassword) {
    const response = await fetch(`${this.baseURL}/user/change-password`, {
      method: 'POST',
      headers: this.getAuthHeaders(),
      body: JSON.stringify({ currentPassword, newPassword })
    });
    return this.handleResponse(response);
  }

  async forgotPassword(email) {
    const response = await fetch(`${this.baseURL}/user/forgot-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email })
    });
    return this.handleResponse(response);
  }

  async resetPassword(email, code, newPassword) {
    const response = await fetch(`${this.baseURL}/user/reset-password`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, code, newPassword })
    });
    return this.handleResponse(response);
  }

  // Social login URLs
  getGoogleLoginUrl() {
    return `${this.baseURL}/auth/google`;
  }

  getDiscordLoginUrl() {
    return `${this.baseURL}/auth/discord`;
  }

  // Health check
  async healthCheck() {
    const response = await fetch(`${this.baseURL}/health`);
    return this.handleResponse(response);
  }
}

export default new ApiService();

