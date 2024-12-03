import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private token: string | null = null;

  constructor() {}

  async fetchToken(): Promise<string> {
    if (this.token) {
      return this.token;
    }

    const response = await fetch(
      `${process.env.FETCH_USERS}/child/get/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: process.env.AUTH_USERNAME,
          password: process.env.AUTH_PASSWORD,
        }),
      },
    );
    const data = await response.json();
    this.token = data.token;
    return this.token;
  }
}
